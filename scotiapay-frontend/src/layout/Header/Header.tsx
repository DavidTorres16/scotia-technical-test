import React from 'react';
import styles from './Header.module.css';
import LogoIcon from '../../assets/images/banner-brand-scotiabank.svg';
import { Link } from 'react-router-dom';



interface HeaderProps {
  onInsertClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onInsertClick }) => {
  return (
    <header>
      <div>
        <nav className={styles.navbar}>
          <div>
            <Link to="/" className={styles.navLink}>Home</Link>
          </div>
          <div>
            <Link to="/other" className={styles.navLink}>Coming soon...</Link>
          </div>
        </nav>
      </div>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={LogoIcon} alt="App Logo" className={styles.logoIcon} />
          <h1>Scotiapay</h1>
        </div>
        <button onClick={onInsertClick} className={styles.insertButton}>
          Insert Employee
        </button>
      </div>
    </header>
  );
};

export default Header;
