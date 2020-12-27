import React, { Component } from 'react';
import styles from './HomePage.module.css';
import Nav from '../../Components/ui/Nav/Nav';
import TotalExpenditures from '../../Components/ui/CoalescedData/TotalExpenditure/TotalExpenditures';
class HomePage extends Component {
  render() {
    return (
      <div className={styles.homePageWrapper}>
        <Nav />
        <h1>This is the Home Page!</h1>
        <TotalExpenditures />
        
      </div>
    )
  }
}

export default HomePage