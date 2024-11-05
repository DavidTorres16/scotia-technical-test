import React, { useEffect, useState } from 'react';
import InsertEmployeeForm from '../../components/InsertEmployeeForm/EmployeeForm';
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { setEmployees, selectEmployee } from '../../slices/EmployeeSlice';
import { Employee } from '../../types/employeeInterfaces';
import EmployeeDetail from '../../components/EmployeeDetail/EmployeeDetail';
import { getEmployeeById, getEmployees } from '../../services/EmployeeService';

import styles from './HomePage.module.css';

interface HomePageProps {
  onInsertFormVisible: boolean;
  onCloseInsertForm: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onInsertFormVisible, onCloseInsertForm }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.employees);
  const selectedEmployee = useSelector((state: RootState) => state.employee.selectedEmployee);

  useEffect(() => {
    const fetchEmployeesList = async () => {
      try {
        const response = await getEmployees();
        dispatch(setEmployees(response.data.employee));
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployeesList();
  }, [dispatch]);

  const fetchEmployeesList = async () => {
    const response = await getEmployees();
    dispatch(setEmployees(response.data.employee));
  };

  const handleViewDetails = async (employeeId: number) => {
    const response = await getEmployeeById(employeeId);
    dispatch(selectEmployee(response.data.employee));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <h1>Employee Management</h1>
      </div>
      <div className={styles.listAndTitleContainer}>
        <div className={styles.employeeListContainer}>
          <EmployeeList employees={employees} onViewDetails={handleViewDetails} />
        </div>
        <div className={styles.employeeActionsContainer}>
          {onInsertFormVisible && (
            <InsertEmployeeForm
              employee={undefined}
              onClose={onCloseInsertForm}
              onEmployeeSaved={fetchEmployeesList}
            />
          )}
          {selectedEmployee && !onInsertFormVisible && (
            <EmployeeDetail employee={selectedEmployee} onClose={() => dispatch(selectEmployee(null))} fetchEmployeeList={fetchEmployeesList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
