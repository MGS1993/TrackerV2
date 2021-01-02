import React from 'react';
import {  BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../Containers/HomePage/HomePage';
import CreateExpense from '../Containers/CreateExpense/CreateExpense';
import CreateUser from '../Containers/CreateUser/CreateUser';
import ViewExpenses from '../Components/ViewExpenses/ViewExpenses';
const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/create-expense' component={CreateExpense} />
        <Route exact path='/create-user' component={CreateUser} />
        <Route exact path='/view-expenses' component={ViewExpenses} />
      </Switch>
    
    </BrowserRouter>
  )
}


export default Routes