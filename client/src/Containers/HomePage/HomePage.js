import React, { Component } from 'react';
import styles from './HomePage.module.css';
import Nav from '../../Components/ui/Nav/Nav';
import TotalExpenditures from '../../Components/ui/CoalescedData/TotalExpenditure/TotalExpenditures';
class HomePage extends Component {

  state = {
    totalExpenses: []
  }
  
  async componentDidMount() {
    try {
      const response = await fetch('/api/expenses')
      const data = await response.json()
      this.setState({totalExpenses: data})
      this.homePageExpenses()
    }catch(error) {
      console.log(error)
    }
  }

  homePageExpenses = () => {
    let totalExpensesArr = []
    this.state.totalExpenses.forEach(el => {
      totalExpensesArr.push(el.expensePrice)
    })
     
    this.setState({homePageExpenses: totalExpensesArr.reduce((acc, cur) => {
      return acc + cur
    }) })
  }

  render() {
    
    return (
      <div className={styles.homePageWrapper}>
        <Nav />
        <h1>This is the Home Page!</h1>
        <TotalExpenditures 
        totalSpent={this.state.homePageExpenses}/>
        
      </div>
    )
  }
}

export default HomePage