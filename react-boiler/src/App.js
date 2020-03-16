import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/Layout/NavBar/NavBar';
import Landing from './components/Layout/Landing/Landing';
import Routes from './routes/Routes';

function App() {
  return (
    <Router>
      <Fragment>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
