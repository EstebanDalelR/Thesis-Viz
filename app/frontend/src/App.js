import React, { Component } from 'react';
import { Route, Switch } from 'react-router'
import { MuiThemeProvider } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

import Navbar from './Directorio/Navbar.js';
import Concejal from './Directorio/Concejal.js';
import Concejales from './Directorio/Concejales.js';
import Secretarios from './Directorio/Secretarios';
import ProyectoAcuerdo from './Directorio/ProyectoAcuerdo';
import ProyectosAcuerdo from './Directorio/ProyectosAcuerdo';

class App extends Component {
  state = {
    camara: [],
    concejales: [],
    secretarios: [],
  }

  componentWillMount() {
/*     fetch('http://localhost:3000/camara',
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
      }); */

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

    fetch('http://localhost:3000/secretarios',
      {
        method: 'GET',
        headers: { accept: 'application/json' }
      })
      .then((res) => {
        if (res.ok)
          return res.json();
      })
      .then((secretarios) => {
        this.setState({
          secretarios: secretarios
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
          <MuiThemeProvider>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/concejales"
              render={props => (<Concejales concejales={this.state.concejales} />)}
            />
            <Route
              path="/concejales/:number"
              render={props => (<Concejal info={concejales[props.match.params.number]} />)}
            />
            <Route path="/proyectosAcuerdo" render={props => (<ProyectosAcuerdo proyectosAcuerdo={[]} />)} />
            <Route path="/secretarios" render={props => (<Secretarios secretarios={this.state.secretarios} />)} />
          </Switch>
          {/*{<ProyectoAcuerdo concejal={concejales[4]}/>} */}
          </MuiThemeProvider>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          Cargando
          <CircularProgress style={{ color: purple[500] }} thickness={7} />
        </div>
      );
    }
  }
}

export default App;
