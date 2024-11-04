import React from 'react';
import styles from './Header.module.css';


interface HeaderProps {
  onInsertClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onInsertClick }) => {
  return (
    <header className={styles.header}>
      <h1>Employee Management</h1>
      <button onClick={onInsertClick} className={styles.button}>
        Insert Employee
      </button>
    </header>
  );
};

export default Header;
