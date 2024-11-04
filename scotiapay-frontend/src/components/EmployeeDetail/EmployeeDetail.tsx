import React, { useState } from 'react';
import { Employee } from '../../types/employeeInterfaces';
import styles from './EmployeeDetail.module.css';
import InsertEmployeeForm from '../../components/InsertEmployeeForm/EmployeeForm';


interface EmployeeDetailProps {
  employee: Employee;
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
            <button onClick={() => setUpdateFormVisible(true)} className={styles.button}>
              Update Employee
            </button>
          </div>
        </div>
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
          <p>Position Title: {employee.position.title}</p>
          <p>Hire Date: {employee.position.hireDate}</p>
          <p>Email: {employee.position.email}</p>
          <p>Salary: ${employee.position.salary}</p>
          <p>Time in Position: {employee.position.timeInPosition}</p>
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
