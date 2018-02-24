import React, { Component } from 'react';
import './App.css';
import ObservaCamara from './ObservaCamara.js';
import Concejal from './Directorio/Concejal.js';

class App extends Component {
  state = {
    camareros:[],
  }

  componentDidMount() {
    fetch('http://localhost:3000/camara',
      {
        method: 'GET',
        headers: { accept: 'application/json' }
      })
      .then((res) => {
        if (res.ok)
          return res.json();
      })
      .then((camareros) => {
        this.setState({
          camareros: camareros
        });
      })
  }
  render() {
    var camara = this.state.camareros;
    return (
      <div className="App">
        <ObservaCamara info={camara} />
        <Concejal/>
      </div>
    );
  }
}

export default App;
