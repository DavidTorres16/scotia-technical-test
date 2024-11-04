import React from 'react';
import { Employee } from '../../types';
import styles from './EmployeeList.module.css';

interface EmployeeListProps {
  employees: Employee[];
  onViewDetails: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onViewDetails }) => {
  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id} className={styles.employeeItem}>
          <div className={styles.employeeTitle}>
            <p>{employee.firstName} {employee.lastName} - {employee.positionTitle}</p>
          </div>
          <button className={styles.viewDetailsButton} onClick={() => onViewDetails(employee)}>
            View Details
          </button>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
