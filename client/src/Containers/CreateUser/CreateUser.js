import React, { Component } from "react";
import styles from "./CreateUser.module.css";
class CreateUser extends Component {

  state = {
    userName: ""
  }

  handleSubmit = e => {
    e.preventDefault();
    let dataBody = {
      userName: this.state.userName
    }
    fetch('api/create-user', {
      method: 'POST',
      body: JSON.stringify(dataBody),
      headers: {
        'Content-Type': 'application/json'
      },

    })
    
  }

  handleUserNameChange = e => {
    this.setState({userName: e.target.value})
  }

  render() {
    return (
      <div className={styles.CUWrapper}>
        
        <div className={styles.CUForm}>
          <form onSubmit={this.handleSubmit}>
            <label>
              New User Name
              <input
                type="text"
                name="userName"
                value={this.state.userName}
                onChange={this.handleUserNameChange}
              />
            </label>

            <input type="submit" value="Add New User" />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateUser;
