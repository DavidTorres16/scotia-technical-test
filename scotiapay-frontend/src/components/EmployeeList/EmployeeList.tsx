import React from 'react';
import { Employee } from '../../types/employeeInterfaces';
import styles from './EmployeeList.module.css';

interface EmployeeListProps {
  employees: Employee[];
  onViewDetails: (employee: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onViewDetails }) => {

  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id} className={styles.employeeItem}>
          <div>
            <p className={styles.employeeName}>{employee.name} {employee.last_name} </p> 
            <p className={styles.employeePosition}> {employee.position_title}</p>
            <p className={styles.employeeStatus}>{employee.status}</p>
            <p className={styles.employeeStatus}>hired: {employee.date_arrival}</p>
          </div>
          <button className={styles.viewDetailsButton} onClick={() => onViewDetails(employee.id)}>
            View Details
          </button>
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
