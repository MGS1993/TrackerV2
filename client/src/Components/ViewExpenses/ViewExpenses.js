import React, {Component} from 'react';
import styles from './ViewExpenses.module.css';
import Nav from '../ui/Nav/Nav';
import ExpenseTable from '../../Components/ui/Table/ExpenseTable';
import EditModal from '../ui/Modal/EditModal/EditModal';

class ViewExpenses extends Component {

  state = {
    expenses: [],
    delBtnToggled: false,
    show: false,
    modalId: ''
  }

  
  fetchData = async() => {
    try {
      const response = await fetch('/api/expenses')
      const data = await response.json()
      this.setState({expenses: data})
      // console.log(data)
    }catch(err) {
      console.log(err)
    }
  }

  deleteItemHandler = (e) => {
    let selected = e.target.parentElement.id
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
      // console.log(e.target.parentElement.firstChild.innerText)
    }
  }
  toggleDelete = e => {
    this.setState(prevState => 
      ({delBtnToggled: !prevState.delBtnToggled}))
    console.log(e.target)
  }
  toggleEdit = e => {
    this.setState({show: !this.state.show, modalId: e.target.parentElement.id})
  }

  render() {
    let updatedData = this.state.expenses

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
      <React.Fragment>
      <div className={styles.viewExpensesWrapper}>
        <Nav />
        <div className={styles.viewHeader}>
          <h2>Current expenses</h2>
          {btn}
          
        </div>
        <ExpenseTable
        clicked={this.deleteItemHandler}
        updatedData={updatedData}
        clickToUpdate={this.toggleEdit} />
        
      </div>
      <EditModal
       show={this.state.show}
       selected={this.state.modalId} />
      </React.Fragment>
    )
  }
}

export default ViewExpenses