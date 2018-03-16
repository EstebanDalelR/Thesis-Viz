import React, { Component } from 'react';
import './CSS/App.css';
import Homescreen from './UI/Homescreen.js'
import Table from './UI/Table.js';
import Concejal from './Directorio/Concejal.js';

class App extends Component {
  state = {
    camara: [],
    concejales: []
  }

  componentWillMount() {
    fetch('http://localhost:3000/camara',
      {
        method: 'GET',
        headers: { accept: 'application/json' }
      })
      .then((res) => {
        if (res.ok)
          return res.json();
      })
      .then((camara) => {
        this.setState({
          camara: camara
        });
      });

    fetch('http://localhost:3000/concejales',
      {
        method: 'GET',
        headers: { accept: 'application/json' }
      })
      .then((res) => {
        if (res.ok)
          return res.json();
      })
      .then((concejales) => {
        this.setState({
          concejales: concejales
        });
      });

  }

  mapChildren() {
    return this.state.concejales.map(
      (t, i) => {
        return <Concejal info={t} key={i} />;
      })
  }

  render() {
    /* var camara = this.state.camara; */
    var concejales = this.state.concejales;
    if (concejales.length > 1) {
      return (
        <div className="App">
          {/* <Table info={concejales} /> */}
          {/* {this.mapChildren()} */}
          {/* <Concejal info={concejales} /> */}
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Homescreen />
        </div>
      );
    }
  }
}

export default App;
