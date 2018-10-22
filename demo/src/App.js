import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Demo from './demo';

class App extends Component {
  render() {
    const data = ['1', '2', 1, 2];
    const PropretyTypes = [
      { _id: 'Bed-Breakfast', name: 'Bed & Breakfast' },
      { _id: 'Guest-House', name: 'Guest House' },
      { _id: 'Hostel', name: 'Hostel' },
      { _id: 'Hotel', name: 'Hotel' },
      { _id: 'Motel', name: 'Motel' },
    ];
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Demo
            data={data}
            accounts={() => {}}
            showBalance={1}
            PropretyTypes={PropretyTypes}
            deposit={null}
            current={new Date()}
            boolean={true}
            empty=""
          />
        </header>
      </div>
    );
  }
}

export default App;
