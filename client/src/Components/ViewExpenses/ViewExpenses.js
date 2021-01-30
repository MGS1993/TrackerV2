import React, { Component } from "react";
import styles from "./ViewExpenses.module.css";
import Nav from "../ui/Nav/Nav";
import DropDown from "../ui/DropDown/DropDown";
import BarGraph from '../ui/Graphs/BarGraph/BarGraph';
import ExpenseTable from "../../Components/ui/Table/ExpenseTable";
import EditModal from "../ui/Modal/EditModal/EditModal";

class ViewExpenses extends Component {
  state = {
    expenses: [],
    delBtnToggled: false,
    show: false,
    modalId: "",
    appliedModule: 'Table'
  };

   componentDidMount() {
   this.fetchData();
  }
  
  fetchData = async () => {
    try {
      const loggedInUserID = localStorage.getItem('userID');
      const response = await fetch(`/api/userExpenses/${loggedInUserID}`);
      const data = await response.json();
      this.setState({ expenses: data })
    } catch(err) {
      console.log(err)
    }
 
  };
  deleteItemHandler = (e) => {
    let selected = e.target.parentElement.id;
    if (this.state.delBtnToggled === true) {
      fetch(`api/expenses/${selected}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.fetchData();
    } else {
      console.log("delete button not toggled");
    }
  };
  toggleDelete = (e) => {
    this.setState((prevState) => ({ delBtnToggled: !prevState.delBtnToggled }));
  };
  toggleEdit = (e) => {
    e.preventDefault();
    this.setState({
      show: !this.state.show,
      modalId: e.target.parentElement.id,
    });
    this.fetchData();
  };
  handleClick = e => {
    this.setState({appliedModule: e.target.innerText})
  }
  
  render() {
    let updatedData = this.state.expenses;
    let rendered = null
    let btn = null;
    if (this.state.delBtnToggled && this.state.appliedModule === 'Table') {
      btn = (
        <button
          onClick={this.toggleDelete}
          className={styles.deleteButtonWrapper}
        >
          ToggleDelete
        </button>
      );
    } else {
      btn = (
        <button onClick={this.toggleDelete} className={styles.buttonWrapper}>
          ToggleDelete
        </button>
      );
    }

    if(this.state.appliedModule === 'Table' ) {
       rendered = (
          <ExpenseTable
            clicked={this.deleteItemHandler}
            updatedData={updatedData}
            clickToUpdate={this.toggleEdit}
          />
      )
    } else if (this.state.appliedModule === 'Bar') {
       rendered = (
        <BarGraph />
      )
    }
    return (
      <React.Fragment>
        <div className={styles.viewExpensesWrapper}>
          <Nav />
          <h2>Current expenses</h2>
          <div className={styles.viewHeader}>
            <div className={styles.mainHeader}>
              <div>{btn}</div>
            </div>
            <div className={styles.dropDownWrapper}>
              <DropDown
              clickedTable={this.handleClick}
              clickedBar={this.handleClick} />
            </div>
          </div>
          {rendered}
        </div>
        <EditModal
          cancel={this.toggleEdit}
          style={{
            transform: this.state.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.state.show ? "1" : "0",
          }}
          show={this.state.show}
          selected={this.state.modalId}
          toggleEdit={this.toggleEdit}
        />
      </React.Fragment>
    );
  }
}

export default ViewExpenses;
