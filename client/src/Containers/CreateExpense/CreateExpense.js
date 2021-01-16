import React, { Component } from 'react';
import styles from './CreateExpense.module.css';
import Nav from '../../Components/ui/Nav/Nav';
import CreateUser from '../CreateUser/CreateUser';
class CreateExpense extends Component {
  state= {
    expenseName: "",
    expensePrice: "",
    currentUserId: "",
    usersList: "",
    category: "Electronics",
    date: '',
    appliedModule: 'Add Expense',
    
  }


  async componentDidMount() {
    try {
      const response = await fetch('/api/expenses')
      const data = await response.json()
      console.log('expenses fetched...', data)
    } catch(error) {
      console.log(error)
    }

    try{
      const response = await fetch('/api/display-users')
      const data = await response.json();
      console.log('users fetched...', data)
      console.log('current user is:', data[0]._id)
      this.setState({currentUserId: data[0]._id })
      this.setState({usersList: data})
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

              <select defaultValue={this.state.category} onChange={this.handleDropDownChange}>
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
              className={styles.input} 
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
    } else if( this.state.appliedModule === 'Add User') {
      rendered = (
        <CreateUser />
      )
    }

    return(
      <div className={styles.CEWrapper}>
        <Nav />
        <div className={styles.actionNav}>
          <button onClick={this.handleActionNavBtn}>Add Expense</button>
          <button onClick={this.handleActionNavBtn}>Add User</button>
        </div>
        {rendered}
      </div>
    )
  }
}


export default CreateExpense