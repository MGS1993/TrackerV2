import React, { Component } from 'react';
import styles from './HomePage.module.css';
import Nav from '../../Components/ui/Nav/Nav';
import TotalExpenditures from '../../Components/ui/CoalescedData/TotalExpenditure/TotalExpenditures';
import {  isThisMonth, parseISO, differenceInCalendarMonths } from 'date-fns';

class HomePage extends Component {

  state = {
    totalExpenses: [],
    thisMonthExpenses: 0,
    lastMonthExpenses: 0
  }
  
  async componentDidMount() {
    try {
      const response = await fetch('/api/expenses')
      const data = await response.json()
      this.setState({totalExpenses: data})
      this.homePageExpenses()
      this.homePageThisMonth()
      this.homePageLastMonth()
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
    })})
  }

  homePageThisMonth = () => {
    let thisMonthExpenses = []
    this.state.totalExpenses.forEach(el => {
      if(isThisMonth(parseISO(el.date)) === true) {
        thisMonthExpenses.push(el.expensePrice)
      }
    })
    this.setState({thisMonthExpenses: thisMonthExpenses.reduce((acc, curr) => {
      return acc + curr
    })})
  }

  homePageLastMonth = () => {
    let lastMonthExpenses = [];
    this.state.totalExpenses.forEach(el => {
      if(differenceInCalendarMonths(Date.now(), parseISO(el.date)) === 1) {
        lastMonthExpenses.push(el.expensePrice);
      } 
    })
    this.setState({lastMonthExpenses: lastMonthExpenses.reduce((acc, curr) => {
      return acc + curr
    })})
  }

  render() {
    
    return (
      <div className={styles.homePageWrapper}>
        <Nav />
        <h1>This is the Home Page!</h1>
        <TotalExpenditures 
        totalSpent={this.state.homePageExpenses}
        currentMonthTotal={this.state.thisMonthExpenses}
        lastMonthTotal={this.state.lastMonthExpenses}/>
        
      </div>
    )
  }
}

export default HomePage