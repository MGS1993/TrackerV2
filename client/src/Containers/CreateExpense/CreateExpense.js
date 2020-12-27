import React, { Component } from 'react';
import styles from './CreateExpense.module.css';

class CreateExpense extends Component {
  state= {
    expenseName: "",
    expensePrice: ""
  }


  async componentDidMount() {
    try {
      const response = await fetch('/api/expenses')
      const data = await response.json()
      console.log('expenses fetched...', data)
    } catch(error) {
      console.log(error)
    }
  }


  render() {


    return(
      <div className={styles.CEWrapper}>
        <div className={styles.CEForm}>
          <form onSubmit={this.handleSubmit}>

            <label>
              Expense Name
              <input 
              type="text" name="expenseName" 
              value={this.expenseName}
              onChange={this.handleExpenseNameChange} />
            </label>

            <label>
              Expense Price
              <input type="text" name="expensePrice"
              value={this.expensePrice}
              onChange={this.handleExpensePriceChange} />
            </label>

            <input type="submit" value="Submit Expense" />
          </form>
        </div>
      </div>
    )
  }
}


export default CreateExpense