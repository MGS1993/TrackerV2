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
    }catch(error) {
      console.log(error)
    }

    try {
      this.addExpenses()
    } catch(error) {
      console.log(error)
    }
  }

  addExpenses = () => {
    this.state.totalExpenses.forEach(el => {
      console.log(el.expensePrice)
    })
  }


  


  render() {
    
    return (
      <div className={styles.homePageWrapper}>
        <Nav />
        <h1>This is the Home Page!</h1>
        <TotalExpenditures />
        
      </div>
    )
  }
}

export default HomePage