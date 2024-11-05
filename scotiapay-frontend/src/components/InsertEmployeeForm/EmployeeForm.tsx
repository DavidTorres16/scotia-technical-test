import React, { useState, useEffect } from 'react';
import { EmployeeUpdate } from '../../types/employeeInterfaces';
import styles from './EmployeeForm.module.css';
import { createEmployee, updateEmployee } from '../../services/EmployeeService';

interface EmployeeFormProps {
  employee?: EmployeeUpdate;
  onClose: () => void;
  onEmployeeSaved: () => void;
}

// Define a type for the form data
type FormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  dateArrival: string;
  status: string;
  locationCity: string;
  address: string;
  dateBirth: string;
  telephone: string;
  hireDate: string;
  email: string;
  salary: number;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onClose, onEmployeeSaved }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: employee?.firstName || '',
    middleName: employee?.middleName || '',
    lastName: employee?.lastName || '',
    title: employee?.position?.title || '',
    dateArrival: employee?.dateArrival || '',
    status: employee?.status || '',
    locationCity: employee?.locationCity || '',
    address: employee?.address || '',
    dateBirth: employee?.dateBirth || '',
    telephone: employee?.telephone || '',
    hireDate: employee?.position?.hireDate || '',
    email: employee?.position?.email || '',
    salary: employee?.position?.salary || 0,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        middleName: employee.middleName || '',
        lastName: employee.lastName,
        title: employee.position.title,
        dateArrival: employee.dateArrival,
        status: employee.status,
        locationCity: employee.locationCity || '',
        address: employee.address || '',
        dateBirth: employee.dateBirth || '',
        telephone: employee.telephone || '',
        hireDate: employee.position.hireDate || '',
        email: employee.position.email || '',
        salary: employee.position.salary || 0,
      });
    }
  }, [employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    const telephoneRegex = /^\+?[1-9]\d{1,14}$/;
    const addressRegex = /^[\w\s.,'-]{5,}$/;
    const textRegext = /^[^<>{}[\]()'"`\\;:]*$/;

    for (const field of ['firstName', 'middleName', 'lastName', 'positionTitle'] as (keyof FormData)[]) {
      const value = formData[field];
      if (typeof value === 'string' && !textRegext.test(value)) {
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
        await updateEmployee(employee.id!, formData);
      } else {
        await createEmployee(formData);
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
          {/* Form fields with input binding to formData */}
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Middle Name</label>
              <input
                type="text"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                value={formData.dateArrival}
                onChange={(e) => setFormData({ ...formData, dateArrival: e.target.value })}
                required
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} required>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>Location City</label>
              <input
                type="text"
                value={formData.locationCity}
                onChange={(e) => setFormData({ ...formData, locationCity: e.target.value })}
                required
              />
            </div>
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
                value={formData.dateBirth}
                onChange={(e) => setFormData({ ...formData, dateBirth: e.target.value })}
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
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
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
