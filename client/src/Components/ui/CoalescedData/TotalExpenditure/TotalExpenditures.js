import React from 'react';
import styles from './TotalExpenditures.module.css';

const TotalExpenditures = props => (
  <div className={styles.TEWrapper}>
    <div className={styles.TEHeader}>
      <div><p>Last Month:</p></div>
      <div><p>This Month:</p></div>
    </div>

    <div> <p>Total Spent:</p></div>
    
  </div>
)

export default TotalExpenditures