import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ListCustomers from './components/ListCustomers';
import ListTrainings from './components/ListTrainings';
import TrainingCalendar from './components/TrainingCalendar';

import './App.css';

import 'react-big-calendar/lib/css/react-big-calendar.css'


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
            <Link to="/calendar">Calendar</Link>{' '}

            <Switch>
              <Route path="/customers" component={ListCustomers} />
              <Route path="/trainings" component={ListTrainings} />
              <Route path="/calendar" component={TrainingCalendar} />

              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </Router>

      </div>
    );
}

export default App;
