import React, { useState, useEffect } from 'react';
import { EmployeeUpdate } from '../../types/employeeInterfaces';
import styles from './EmployeeForm.module.css';
import { createEmployee, updateEmployee } from '../../services/EmployeeService';

interface EmployeeFormProps {
  employee?: EmployeeUpdate;
  onClose: () => void;
  onEmployeeSaved: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onClose, onEmployeeSaved }) => {
  const [firstName, setFirstName] = useState(employee?.firstName || '');
  const [middleName, setMiddleName] = useState(employee?.middleName || '');
  const [lastName, setLastName] = useState(employee?.lastName || '');
  const [positionTitle, setPositionTitle] = useState(employee?.position?.title || '');
  const [dateArrival, setDateArrival] = useState(employee?.dateArrival || '');
  const [status, setStatus] = useState(employee?.status || '');
  const [locationCity, setLocationCity] = useState(employee?.locationCity || '');
  const [address, setAddress] = useState(employee?.address || '');
  const [dateBirth, setDateBirth] = useState(employee?.dateBirth || '');
  const [telephone, setTelephone] = useState(employee?.telephone || '');
  const [hireDate, setHireDate] = useState(employee?.position?.hireDate || '');
  const [email, setEmail] = useState(employee?.position?.email || '');
  const [salary, setSalary] = useState(employee?.position?.salary || 0);

  useEffect(() => {
    if (employee) {
      setFirstName(employee.firstName);
      setMiddleName(employee.middleName || '');
      setLastName(employee.lastName);
      setPositionTitle(employee.position.title);
      setDateArrival(employee.dateArrival);
      setStatus(employee.status);
      setLocationCity(employee.locationCity || '');
      setAddress(employee.address || '');
      setDateBirth(employee.dateBirth || '');
      setTelephone(employee.telephone || '');
      setHireDate(employee.position.hireDate || '');
      setEmail(employee.position.email || '');
      setSalary(employee.position.salary || 0);
    }
  }, [employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const telephoneRegex = /^\+?[1-9]\d{1,14}$/;
    const addressRegex = /^[\w\s.,'-]{5,}$/;

    if (!telephoneRegex.test(telephone)) {
      alert("Please enter a valid international phone number.");
      return;
    }

    if (!addressRegex.test(address)) {
      alert("Please enter a valid address.");
      return;
    }

    try {
      if (employee) {
        await updateEmployee(employee.id!, {
          firstName,
          middleName,
          lastName,
          positionTitle,
          dateArrival,
          status,
          locationCity,
          address,
          dateBirth,
          telephone,
          hireDate,
          email,
          salary,
        });
      } else {
        await createEmployee({
          firstName,
          middleName,
          lastName,
          positionTitle,
          dateArrival,
          status,
          locationCity,
          address,
          dateBirth,
          telephone,
          hireDate,
          email,
          salary,
        });
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Middle Name</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>Position Title</label>
              <input
                type="text"
                value={positionTitle}
                onChange={(e) => setPositionTitle(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Date of Arrival</label>
              <input
                type="date"
                value={dateArrival}
                onChange={(e) => setDateArrival(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} required>
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
                value={locationCity}
                onChange={(e) => setLocationCity(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Date of Birth</label>
              <input
                type="date"
                value={dateBirth}
                onChange={(e) => setDateBirth(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>Telephone</label>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
            <div className={styles.inputLabelSection}>
              <label>Hire Date</label>
              <input
                type="date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
              />
            </div>
            <div  className={styles.inputLabelSection}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formSection}>
            <div className={styles.inputLabelSection}>
              <label>Salary</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(parseFloat(e.target.value))}
                required
              />
            </div>
          </div>
          <button className={styles.buttons} type="submit">{employee ? 'Update' : 'Insert'}</button>
          <button className={styles.buttons} type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
