import React, { useState, useEffect } from 'react';
import {EmployeeUpdate} from '../../types/index'
import styles from './EmployeeForm.module.css'
import {
    createEmployee,
    updateEmployee,
} from '../../services/EmployeeService';



interface EmployeeFormProps {
  employee?: EmployeeUpdate;
  onClose: () => void;
  onEmployeeSaved: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onClose, onEmployeeSaved }) => {
  const [firstName, setFirstName] = useState(employee?.firstName || '');
  const [lastName, setLastName] = useState(employee?.lastName || '');
  const [positionTitle, setPositionTitle] = useState(employee?.positionTitle || '');
  const [dateArrival, setDateArrival] = useState(employee?.dateArrival || '');
  const [status, setStatus] = useState(employee?.status || '');

  useEffect(() => {
    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setPositionTitle(employee.positionTitle);
      setDateArrival(employee.dateArrival);
      setStatus(employee.status);
    }
  }, [employee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if (employee) {
            await updateEmployee(employee.id!, {
              firstName,
              lastName,
              positionTitle,
              dateArrival,
              status,
            });
          } else {
            await createEmployee({
              firstName,
              lastName,
              positionTitle,
              dateArrival,
              status,
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
      <div  className={styles.modal}>
        <h2>{employee ? 'Update Employee' : 'Insert Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Position Title"
            value={positionTitle}
            onChange={(e) => setPositionTitle(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Date of Arrival"
            value={dateArrival}
            onChange={(e) => setDateArrival(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit">{employee ? 'Update' : 'Insert'}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
