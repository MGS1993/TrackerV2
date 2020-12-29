import React from 'react';
import styles from './TotalExpenditures.module.css';

const TotalExpenditures = props => (
  <div className={styles.TEWrapper}>
    <div className={styles.TEHeader}>
      <div><p>Last Month:{props.lastMonthTotal}</p></div>
      <div><p>This Month:{props.currentMonthTotal}</p></div>
    </div>

      <div><p>Total Spent:{props.totalSpent}</p></div>
    
  </div>
)

export default TotalExpenditures