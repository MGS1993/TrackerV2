import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = props => (
  <nav className={styles.navWrapper}>
    <div><Link to="/view-expenses"><p>View Expenses</p></Link></div>
    <div><Link to="/"><p>Home</p></Link></div>
    <div><Link to="/create-expense"><p>Log Expense</p></Link></div>
  </nav>
)

export default Nav;