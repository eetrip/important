import React, { Component } from 'react';
import Header from './Components/Header';
import Main from './Components/Main';
//import ListNote from './Components/ListNote';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
        {/* <ListNote /> */}
      </div>
    );
  }
}

export default App;
