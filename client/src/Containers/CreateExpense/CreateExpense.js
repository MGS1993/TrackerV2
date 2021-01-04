import React, { Component } from 'react';
import styles from './CreateExpense.module.css';
import Nav from '../../Components/ui/Nav/Nav';
class CreateExpense extends Component {
  state= {
    expenseName: "",
    expensePrice: "",
    currentUserId: "",
    usersList: "",
    category: "Electronics"
    
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

    // try {
    //   const response = await fetch('/api/test');
    //   const data = await response.json();
    //   console.log('these are the expenses created by manuel', data)
    // } catch(error) {
    //   console.log(error)
    // }
  }

  handleSubmit = e => {
    e.preventDefault();
    let dataBody = {
      expenseName: this.state.expenseName,
      expensePrice: this.state.expensePrice,
      user: this.state.currentUserId,
      category: this.state.category
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
  render() {


    return(
      <div className={styles.CEWrapper}>
        <Nav />
        <h2>Add an expense</h2>
        <div className={styles.CEFormWrapper}>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <div className={styles.labelWrapper}>
              <label>
                <div>
                Expense Name
                </div>

                <input 
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
                value={this.state.expensePrice}
                onChange={this.handleExpensePriceChange} />
              </label>
            </div>
            <div className={styles.labelWrapper}>
              <label>
                <div>
                  category
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
            <input
             type="submit" 
             value="Submit Expense"
             className={styles.submitBtn} />
          </form>
        </div>
      </div>
    )
  }
}


export default CreateExpense