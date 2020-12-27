import React from 'react';
import {  BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../Containers/HomePage/HomePage';
import CreateExpense from '../Containers/CreateExpense/CreateExpense';
const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/create-expense' component={CreateExpense} />
      </Switch>
    
    </BrowserRouter>
  )
}


export default Routes