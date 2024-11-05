import React from 'react';
import { Employee } from '../../types/employeeInterfaces';
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
          <div>
            <p className={styles.employeeName}>{employee.firstName} {employee.lastName} </p> 
            <p className={styles.employeePosition}> {employee.position.title}</p>
            <p className={styles.employeeStatus}>{employee.status}</p>
            <p className={styles.employeeStatus}>hired: {employee.position.hireDate}</p>
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
