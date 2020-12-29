import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = props => (
  <nav className={styles.navWrapper}>
    <div><Link to="/charts"><p>Charts</p></Link></div>
    <div><Link to="/create-expense"><p>Log Expense</p></Link></div>
    <div><Link to="/view-history"><p>View History</p></Link></div>
    <div><Link to="/create-user"><p>Add New User</p></Link></div>
  </nav>
)

export default Nav;