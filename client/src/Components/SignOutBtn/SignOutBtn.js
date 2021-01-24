import React from 'react';
import styles from './SignOutBtn.module.css';


const SignOut = props => {


  return(
    <div className={styles.signOutDivWrapper}>
      <p 
      className={styles.signOutText}
      onClick={props.logoutHandler}>
        Sign Out</p>
    </div>
  )
}


export default SignOut