import React, { Component } from 'react';
import EnhancedTable from './EnhancedTable'

class App extends Component {
  render() {

    console.log(process.env)
    return (
      <div className="App container">
        <header className="App-header">
          <h3 className="App-title">Welcome To React Tables</h3>
        </header>
        <EnhancedTable />
      </div>
    );
  }
}

export default App;
