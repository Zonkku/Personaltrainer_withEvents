import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import ListCustomers from './components/ListCustomers';
import ListTrainings from './components/ListTrainings';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import './App.css';

function App() {
  
return (
    <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                Personal Trainer
              </Typography>
            </Toolbar>
          </AppBar>

      <Router>
        <div>
          <Link to="/customers">Customers</Link>{' '}
          <Link to="/trainings">Trainings</Link>{' '}
          <Switch>
            <Route path="/customers" component={ListCustomers} />
            <Route path="/trainings" component={ListTrainings} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
