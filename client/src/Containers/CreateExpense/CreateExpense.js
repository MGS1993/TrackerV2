import React, { Component } from 'react';
import styles from './CreateExpense.module.css';
import Nav from '../../Components/ui/Nav/Nav';
class CreateExpense extends Component {
  state= {
    expenseName: "",
    expensePrice: "",
    currentUserId: "",
    category: "Electronics",
    date: '',
    appliedModule: 'Add Expense',
    
  }
  async componentDidMount() {
    const loggedInUser = localStorage.getItem('user');
    const loggedInUserID = localStorage.getItem('userID');

    try{


      this.setState({
        currentUserId: loggedInUserID,
        currentUser: loggedInUser 
        })
    } catch(error) {
      console.log(error)
    }

  }

  handleSubmit = e => {
    e.preventDefault();
    let dataBody = {
      expenseName: this.state.expenseName,
      expensePrice: this.state.expensePrice,
      user: this.state.currentUserId,
      category: this.state.category,
      date: this.state.date.replace(/-/, '/').replace(/-/, '/')
    }
    
    fetch('api/add-expense', {
      method: 'POST',
      body: JSON.stringify(dataBody),
      headers: {
        'Content-Type': 'application/json'
      },
    })
 
    this.setState({expenseName: '', expensePrice: ''})
  }

  handleExpenseNameChange = e => {
    this.setState({expenseName: e.target.value})
  }
  handleExpensePriceChange = e => {
    this.setState({expensePrice: e.target.value})
  }
  handleDropDownChange = e => {
    this.setState({category: e.target.value})
  }
  handleDateChange = e => {
    this.setState({date: e.target.value})
  }
  handleActionNavBtn = e => {
    this.setState({appliedModule: e.target.innerText})
  }
  render() {
    let rendered = null;
    let currentUser = this.state.currentUserId;
    if(this.state.appliedModule === 'Add Expense') {
      rendered = (<div className={styles.CEFormWrapper}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.labelWrapper}>
            <label>
              <div>
              Expense Name
              </div>

              <input
              className={styles.input} 
              type="text" name="expenseName" 
              value={this.state.expenseName}
              onChange={this.handleExpenseNameChange} />
            </label>
          </div>

          <div className={styles.labelWrapper}>
            <label>
              <div> 
                Expense Price
              </div>

              <input type="text" name="expensePrice"
              className={styles.input} 
              value={this.state.expensePrice}
              onChange={this.handleExpensePriceChange} />
            </label>
          </div>
          <div className={styles.labelWrapper}>
            <label>
              <div>
                Category
              </div>

              <select className={styles.select} defaultValue={this.state.category} onChange={this.handleDropDownChange}>
                <option value="Electronics">Electronics</option>
                <option value="Groceries">Groceries</option>
                <option value="Utilities">Utilities</option>
                <option value="Rent">Rent</option>
                <option value="Travel">Travel</option>
              </select>
            </label>
          </div>
          <div className={styles.labelWrapper}>
            <label>
              <div> 
                Date
              </div>

              <input type="date" name="date"
              className={styles.inputDate} 
              value={this.state.date}
              onChange={this.handleDateChange} />
            </label>
          </div>
          <input
           type="submit" 
           value="Submit Expense"
           className={styles.submitBtn} />
        </form>
      </div>)
    } 

    return(
      <div className={styles.CEWrapper}>
        <Nav currentUser={currentUser}/>
        {/* <FcApproval /> maybe make it it's own component
        so that we can more easily animate it?*/}
        <div className={styles.actionNav}>
          <button onClick={this.handleActionNavBtn}>Add Expense</button>
          
        </div>
        {rendered}
      </div>
    )
  }
}


export default CreateExpense