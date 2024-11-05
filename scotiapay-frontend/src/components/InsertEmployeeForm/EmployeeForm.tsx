import React, { useState, useEffect } from 'react';
import { EmployeeDetail, EmployeeUpdate } from '../../types/employeeInterfaces';
import { location } from '../../types/locationInterfaces';
import styles from './EmployeeForm.module.css';
import { createEmployee, updateEmployee } from '../../services/EmployeeService';
import { getCities, getCountries, getRegions } from '../../services/LocationService';
import { convertEmployeeUpdateToDetail } from '../../utils/mapper';

interface EmployeeFormProps {
  employee?: EmployeeDetail;
  onClose: () => void;
  onEmployeeSaved: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onClose, onEmployeeSaved }) => {
  const [countriesData, setCountriesData] = useState<location[]>([]);
  const [regionsData, setRegionsData] = useState<location[]>([]);
  const [citiesData, setCitiesData] = useState<location[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('');

  const [formData, setFormData] = useState<EmployeeUpdate>({
    id: employee?.id,
    name: employee?.name || '',
    middle_name: employee?.middle_name || '',
    last_name: employee?.last_name || '',
    title: employee?.position?.position_title || '',
    date_arrival: employee?.date_arrival || '',
    status: employee?.status || '',
    location_city: employee?.location_city || '',
    address: employee?.address || '',
    date_birth: employee?.date_birth || '',
    telephone: employee?.telephone || '',
    hire_date: employee?.position?.hire_date || '',
    email: employee?.position?.email || '',
    salary: employee?.position?.salary || 0,
    position_id: employee?.position?.id || '',
    time_position: employee?.position?.time_position || 0,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountriesData(response.data); // Adjust based on your API response structure
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    
    fetchCountries();

    if (employee) {
      setFormData({
        ...formData,
        name: employee.name,
        middle_name: employee.middle_name || '',
        last_name: employee.last_name,
        title: employee.position.position_title,
        date_arrival: employee.date_arrival,
        status: employee.status,
        location_city: employee.location_city || '',
        address: employee.address,
        date_birth: employee.date_birth,
        telephone: employee.telephone || '',
        hire_date: employee.position.hire_date || '',
        email: employee.position.email || '',
        salary: employee.position.salary || 0,
        position_id: employee?.position?.id || '',
        time_position: employee?.position?.time_position || 0,
      });
    }
  }, [employee]);

  useEffect(() => {
    const fetchRegions = async () => {
      if (selectedCountryId) {
        try {
          const response = await getRegions(selectedCountryId);
          setRegionsData(response.data); // Adjust based on your API response structure
        } catch (error) {
          console.error('Error fetching regions:', error);
        }
      } else {
        setRegionsData([]);
        setCitiesData([]);
        setSelectedRegionId('');
      }
    };

    fetchRegions();
  }, [selectedCountryId]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedRegionId) {
        try {
          const response = await getCities(selectedCountryId, selectedRegionId);
          setCitiesData(response.data); // Adjust based on your API response structure
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      } else {
        setCitiesData([]);
      }
    };

    fetchCities();
  }, [selectedRegionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    const telephoneRegex = /^\+?[1-9]\d{1,14}$/;
    const addressRegex = /^[\w\s.,'#-]{5,}$/;
    const textRegex = /^[^<>{}[\]()'"`\\;:]*$/;

    if (formData.date_birth) {
      const birthDate = new Date(formData.date_birth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isUnderage = today < new Date(birthDate.setFullYear(today.getFullYear()));
  
      if (age < 18 || (age === 18 && isUnderage)) {
        alert("The user must be at least 18 years old.");
        return;
      }
    }

    for (const field of ['name', 'middle_name', 'last_name', 'title'] as (keyof EmployeeUpdate)[]) {
      const value = formData[field];
      if (typeof value === 'string' && !textRegex.test(value)) {
        errors[field] = `Please enter a valid ${field} without special characters.`;
      }
    }

    if (!telephoneRegex.test(formData.telephone)) {
      alert("Please enter a valid international phone number.");
      return;
    }

    if (!addressRegex.test(formData.address)) {
      alert("Please enter a valid address.");
      return;
    }

    if (isNaN(formData.salary) || formData.salary <= 1360000) {
      alert('Salary must be greater than 1,360,000$ COP');
      return;
    }

    try {
      if (employee) {
        await updateEmployee(formData.id!, { ...convertEmployeeUpdateToDetail(formData), location_city: formData.location_city }); // Save only the selected city ID
        alert("User updated")
      } else {
        await createEmployee({ ...convertEmployeeUpdateToDetail(formData), location_city: formData.location_city }); // Save only the selected city ID
        alert("User created")
      }
      onEmployeeSaved();
      onClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={employee ? styles.modalUpdate : styles.modal}>
        <h2 className={styles.titles}>{employee ? 'Update Employee' : 'Insert Employee'}</h2>
        <form onSubmit={handleSubmit} className={styles.employeeForm}>
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>First Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Middle Name</label>
              <input
                type="text"
                value={formData.middle_name}
                onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                required
              />
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>Position Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Date of Arrival</label>
              <input
                type="date"
                value={formData.date_arrival}
                onChange={(e) => setFormData({ ...formData, date_arrival: e.target.value })}
                required
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} required>
                <option value="">Select Status</option>
                <option value="ACTIVE">Active</option>
                <option value="BLOCKED">blocked</option>
              </select>
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>Location Country</label>
              <select
                value={selectedCountryId}
                onChange={(e) => {
                  setSelectedCountryId(e.target.value);
                  setRegionsData([]); // Clear regions and cities when country changes
                  setCitiesData([]);
                  setSelectedRegionId('');
                }}
                required
              >
                <option value="">Select Country</option>
                {countriesData.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.inputLabelSection}>
              <label>Location Region</label>
              <select
                value={selectedRegionId}
                onChange={(e) => {
                  setSelectedRegionId(e.target.value);
                  setCitiesData([]); // Clear cities when region changes
                }}
                required
              >
                <option value="">Select Region</option>
                {regionsData.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.inputLabelSection}>
              <label>Location City</label>
              <select
                value={formData.location_city}
                onChange={(e) => setFormData({ ...formData, location_city: e.target.value })}
                required
              >
                <option value="">Select City</option>
                {citiesData.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Date of Birth</label>
              <input
                type="date"
                value={formData.date_birth}
                onChange={(e) => setFormData({ ...formData, date_birth: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>Telephone</label>
              <input
                type="tel"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Hire Date</label>
              <input
                type="date"
                value={formData.hire_date}
                onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>Salary</label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) })}
                required
              />
            </div>
          </div>
          <button type="submit">{employee ? 'Update' : 'Insert'}</button>
          <button className={styles.buttons} type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
