import React, { useState } from 'react';
import { EmployeeDetail as EmployeeDetailType } from '../../types/employeeInterfaces';
import styles from './EmployeeDetail.module.css';
import InsertEmployeeForm from '../../components/InsertEmployeeForm/EmployeeForm';


interface EmployeeDetailProps {
  employee: EmployeeDetailType;
  onClose: () => void;
  fetchEmployeeList: () => void;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onClose, fetchEmployeeList }) => {

  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  return (
    <div className={styles.detailContainer}>
      <div>
        <h2 className={styles.mainTitle}>Employee Details</h2>
        <div className={styles.buttonsContainer}>
          <div>
            <button className={styles.closeButton} onClick={onClose}>Close</button>
          </div>
          <div>
            <button onClick={() => setUpdateFormVisible(true)}>
              Update Employee
            </button>
          </div>
        </div>
      </div>
      <div className={styles.employeeDataContainer}>
        <div>
          <h3 className={styles.sectionTitle}>Employee Information</h3>
          <p>First Name: {employee.name}</p>
          <p>Middle Name: {employee.middle_name}</p>
          <p>Last Name: {employee.last_name}</p>
          <p>City: {employee.location_city}</p>
          <p>Address: {employee.address}</p>
          <p>Date of Birth: {employee.date_birth}</p>
          <p>Telephone: {employee.telephone}</p>
        </div>
        <div>
          <h3 className={styles.sectionTitle}>Position Information</h3>
          <p>Position Title: {employee.position.position_title}</p>
          <p>Hire Date: {employee.position.hire_date}</p>
          <p>Email: {employee.position.email}</p>
          <p>Salary: ${employee.position.salary}</p>
          <p>Time in Position: {employee.position.time_position}</p>
        </div>
      </div>
      <div className={styles.updateForm}>
        {isUpdateFormVisible &&  (
          <InsertEmployeeForm
            employee={employee}
            onClose={() => setUpdateFormVisible(false)}
            onEmployeeSaved={fetchEmployeeList}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;
