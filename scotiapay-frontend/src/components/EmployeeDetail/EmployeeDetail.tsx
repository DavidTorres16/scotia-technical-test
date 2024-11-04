import React from 'react';
import { Employee } from '../../types';
import styles from './EmployeeDetail.module.css';

interface EmployeeDetailProps {
  employee: Employee;
  onClose: () => void;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onClose }) => {
  return (
    <div className={styles.detailContainer}>
      <div>
        <h2>Employee Details</h2>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
      <div className={styles.employeeDataContainer}>
        <div>
          <h3 className={styles.sectionTitle}>Employee Information</h3>
          <p>First Name: {employee.firstName}</p>
            <p>Middle Name: {employee.middleName}</p>
            <p>Last Name: {employee.lastName}</p>
            <p>City: {employee.locationCity}</p>
            <p>Address: {employee.address}</p>
            <p>Date of Birth: {employee.dateBirth}</p>
            <p>Telephone: {employee.telephone}</p>
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Position Information</h3>
            <p>Position Title: {employee.positionTitle}</p>
            <p>Hire Date: {employee.hireDate}</p>
            <p>Email: {employee.email}</p>
            <p>Salary: ${employee.salary}</p>
            <p>Time in Position: {employee.timeInPosition}</p>
          </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
