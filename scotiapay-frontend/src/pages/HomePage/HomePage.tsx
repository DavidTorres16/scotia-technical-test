import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header/Header';
import InsertEmployeeForm from '../../components/InsertEmployeeForm/EmployeeForm';
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { setEmployees, selectEmployee } from '../../slices/EmployeeSlice';
import { Employee } from '../../types';
import EmployeeDetail from '../../components/EmployeeDetail/EmployeeDetail';
import {
  getEmployees,
} from '../../services/EmployeeService';

import styles from './HomePage.module.css'

const HomePage: React.FC = () => {
  const [isInsertFormVisible, setInsertFormVisible] = useState(false);
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.employees);
  const selectedEmployee = useSelector((state: RootState) => state.employee.selectedEmployee);

  // Load employees when the component mounts
  useEffect(() => {
    // fetchEmployeesList();
  }, []);


  const handleInsertClick = () => {
    setInsertFormVisible(true);
  };

  const fetchEmployeesList = async () => {
    const response = await getEmployees();
    dispatch(setEmployees(response.data));
  };

  const handleViewDetails = (employee: Employee) => {
    dispatch(selectEmployee(employee));
  };

  return (
    <div>
      <Header onInsertClick={handleInsertClick} />
      <div className={styles.mainContainer}>
        <div>
          <EmployeeList employees={employees} onViewDetails={handleViewDetails} />
        </div>
        <div className={styles.employeeActionsContainer}>
          {isInsertFormVisible && (
            <InsertEmployeeForm
              employee={undefined}
              onClose={() => setInsertFormVisible(false)}
              onEmployeeSaved={fetchEmployeesList}
            />
          )}
          {selectedEmployee && !isInsertFormVisible && (
            <EmployeeDetail employee={selectedEmployee} onClose={() => dispatch(selectEmployee(null))} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
