import React, { Component } from 'react';
import styles from './HomePage.module.css';
import Nav from '../../Components/ui/Nav/Nav';
import LogInModal from '../../Components/ui/Modal/LogInModal/LogInModal';
import TotalExpenditures from '../../Components/ui/CoalescedData/TotalExpenditure/TotalExpenditures';
import {  isThisMonth, parseISO, differenceInCalendarMonths } from 'date-fns';

class HomePage extends Component {

  state = {
    totalExpenses: [],
    thisMonthExpenses: 0,
    lastMonthExpenses: 0,
    loggedIn: false
  }
  
  componentWillMount() {
    this.loggedInChecker()
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
  loggedInChecker = () => {
    const loggedInUser = localStorage.getItem('user');
    const loggedInUserID = localStorage.getItem('userID');
    if (loggedInUser && this.state.loggedIn === false) {
      console.log('test')
      this.setState({
        loggedIn: true,
        currentUser: loggedInUser,
        currentUserID: loggedInUserID,
        
      })
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
  loginHandler = () => {
    this.setState({loggedIn: true})
  } 
  render() {
    
    let showHomePage = null
    let modalStyle = null
      if(this.state.loggedIn === false) {
        modalStyle = {
          opacity: '1',
          transform: "translateY(0) translateY(5vh)"
        }
      }
      showHomePage = {opacity: this.state.loggedIn ? "1":"0"}
    
    return (
      <React.Fragment>
      <div className={styles.homePageWrapper} 
      
      style={showHomePage}>
        <Nav />
        <h1>This is the Home Page!</h1>
        <TotalExpenditures 
        totalSpent={this.state.homePageExpenses}
        currentMonthTotal={this.state.thisMonthExpenses}
        lastMonthTotal={this.state.lastMonthExpenses}/>
      </div>
      {this.state.loggedIn ? null : <LogInModal 
      loginHandler = {this.loginHandler}
      style={modalStyle} />}
      </React.Fragment>
    )
  }
}

export default HomePage