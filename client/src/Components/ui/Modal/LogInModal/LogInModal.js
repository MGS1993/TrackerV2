import React, { useState } from 'react';
import styles from './LogInModal.module.css';

const LogInModal = props => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [applyRegister, setApplyRegister] = useState(false);
  const [registerUserName, setRegisterUserName] = useState('');
  const [registerPassWord1, setRegisterPassWord1] = useState('');
  const [registerPassWord2, setRegisterPassWord2] = useState('');

 
  const handleLogIn = async e => {
    try {
      e.preventDefault();
      let dataBody = {
        userName: userName,
        passWord: passWord,
      }
      const response = await fetch('api/login', {
        method: 'POST',
        body: JSON.stringify(dataBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if(response.status === 200) {
        localStorage.setItem('user', data.user.userName)
        localStorage.setItem('userID', data.user._id)
        props.loginHandler()
      } else {
        console.log('error in login field(s)')
      }
    }catch(err) {
      console.log(err)
    }
    
  }
  
  const handleRegister = e => {
    e.preventDefault();
    let dataBody = {
      userName: registerUserName,
      passWord: registerPassWord1,
      passWordCheck: registerPassWord2
    }
    fetch('api/create-user', {
      method: 'POST',
      body: JSON.stringify(dataBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setApplyRegister(false)
  }
  let rendered = null

  if(applyRegister === false) {
    rendered = (
      <React.Fragment>
      <h3>Please log in</h3>
          <form className={styles.form} onSubmit={handleLogIn}>
            <div className={styles.labelWrapper}>
              
              <label>
                <div>
                User Name
                </div>
  
                <input
                className={styles.input} 
                type="text" name="userName" 
                value={userName}
                onChange={e => setUserName(e.target.value)} 
                />
              </label>
            </div>
  
            <div className={styles.labelWrapper}>
              <label>
                <div> 
                  PassWord
                </div>
  
                <input type="password" name="passWord"
                className={styles.input} 
                value={passWord}
                onChange={e => setPassWord(e.target.value)} 
                />
              </label>
            </div>
            
            <input
             type="submit" 
             value="Log In"
             className={styles.submitBtn} />
             <div className={styles.labelWrapper}>
               <button 
               className={styles.submitBtn}
               onClick={e => setApplyRegister(true)}>
                 Register
                 </button>
             </div>
          </form>
          </React.Fragment>
    )

  } else {
    rendered = (
      <React.Fragment>
      <h3>Register</h3>
          <form className={styles.form} onSubmit={handleRegister}>
            <div className={styles.labelWrapper}>
              
              <label>
                <div>
                User Name
                </div>
  
                <input
                className={styles.input} 
                type="text" name="userName" 
                value={registerUserName}
                onChange={e => setRegisterUserName(e.target.value)} 
                />
              </label>
            </div>
  
            <div className={styles.labelWrapper}>
              <label>
                <div> 
                  PassWord
                </div>
  
                <input type="password" name="passWord"
                className={styles.input} 
                value={registerPassWord1}
                onChange={e => setRegisterPassWord1(e.target.value)} 
                />
              </label>
            </div>

            <div className={styles.labelWrapper}>
              <label>
                <div> 
                  re-enter password
                </div>
  
                <input type="password" name="passWord"
                className={styles.input} 
                value={registerPassWord2}
                onChange={e => setRegisterPassWord2(e.target.value)} 
                />
              </label>
            </div>
            
            <input
             type="submit" 
             value="Sign Up"
             className={styles.submitBtn} />
             <div className={styles.labelWrapper}>
               <button 
               className={styles.submitBtn}
               onClick={e => e.preventDefault() + setApplyRegister(false)}>
                 cancel
                 </button>
             </div>
          </form>
          </React.Fragment>
    )
  }
  
  return(
    <div className={styles.modalWrapper} style={props.style}>
      {rendered}
      </div>
  )
}


export default LogInModal

