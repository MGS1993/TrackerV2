import React, {Component} from 'react';
import styles from './ViewExpenses.module.css';
import Nav from '../ui/Nav/Nav';
class ViewExpenses extends Component {

  state = {
    expenses: [],
    delBtnToggled: false
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async() => {
    console.log('fetchData ran...')
    try {
      const response = await fetch('/api/expenses')
      const data = await response.json()
      this.setState({expenses: data})
      console.log(data)
    }catch(err) {
      console.log(err)
    }
  }

  deleteItemHandler = (e) => {
    let selected = e.target.id
    if(this.state.delBtnToggled === true) {
      fetch(`api/expenses/${selected}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      this.fetchData()
    } else {
      console.log('delete button not toggled')
    }
  }
  toggleDelete = e => {
    this.setState(prevState => 
      ({delBtnToggled: !prevState.delBtnToggled}))
    console.log(e.target)
  }
  render() {
    let btn = null
    if (this.state.delBtnToggled) {
      btn = (
        <button 
        onClick={this.toggleDelete}
        className={styles.deleteToggleWrapper}
        >ToggleDelete</button>
      )
    } else {
      btn = (
        <button 
        onClick={this.toggleDelete}
        className={styles.buttonWrapper}
        >ToggleDelete</button>
      )
    }


    return(
      <div className={styles.viewExpensesWrapper}>
        <Nav />
        <div className={styles.viewHeader}>
          <h2>Current expenses</h2>
          {btn}
          
        </div>
        <ul>
          {this.state.expenses.map(item => 
            <li 
            onClick={this.deleteItemHandler}
            key={item._id}
            id={item._id}
            className={styles.liLinks}>
            {item.expenseName} 
            {' ' +  'price:'}  {item.expensePrice}  
            </li>)}
        </ul>
      </div>
    )
  }
  
}

export default ViewExpenses