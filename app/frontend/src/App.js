import React, { Component } from 'react';

import { Route, Switch } from 'react-router'

import purple from 'material-ui/colors/purple';
import { createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import Navbar from './Directorio/Navbar.js';
import Concejal from './Directorio/Concejal.js';
import Concejales from './Directorio/Concejales.js';
import Secretarios from './Directorio/Secretarios';/* 
import ProyectoAcuerdo from './Directorio/ProyectoAcuerdo';
import ProyectosAcuerdo from './Directorio/ProyectosAcuerdo'; */

import firebase from 'firebase';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyCj3UnXSPCpVQYz7txHe7ex2eJL0YBAgxM",
  authDomain: "concejales-c0nc3jo.firebaseapp.com",
  databaseURL: "https://concejales-c0nc3jo.firebaseio.com",
  projectId: "concejales-c0nc3jo",
  storageBucket: "concejales-c0nc3jo.appspot.com",
  messagingSenderId: "1006768630143"
};

class App extends Component {
  state = {
    camara: [],
    concejales: [],
    secretarios: [],
    citaciones: [],
  }

  componentWillMount() {
    firebase.initializeApp(config);

    firebase.database().ref('/concejales').once('value')
      .then(snapshot => {
        var concejales = snapshot.val();
        this.setState({
          concejales: concejales
        });
      });
    firebase.database().ref('/secretarios').once('value')
      .then(snapshot => {
        var secretarios = snapshot.val();
        this.setState({
          secretarios: secretarios
        });
      });
    firebase.database().ref('/citaciones').once('value')
      .then(snapshot => {
        var citaciones = snapshot.val();
        this.setState({
          citaciones: citaciones
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
    const theme = createMuiTheme({
      palette: {
        primary: {
          light: '#757ce8',
          main: '#3f50b5',
          dark: '#002884',
          contrastText: '#fff',
        },
        secondary: {
          light: '#CE93D8',
          main: '#fff',
          dark: '#6A1B9A',
          contrastText: '#fff',
        },
      },
    })
    if (concejales.length > 1) {
      return (
        <div className="App">
          <MuiThemeProvider theme={theme}>
            <Navbar />
            <Switch>
              <Route
                exact
                path="/concejales"
                render={props => (<Concejales concejales={this.state.concejales} />)}
              />
              <Route
                path="/concejales/:nombre"
                render={props => (
                  <Concejal
                    info={concejales[props.match.params.nombre]}
                    concejales={this.state.concejales}
                    citaciones={this.state.citaciones} />
                )}
              />
              {/* <Route path="/proyectosAcuerdo" render={props => (<ProyectosAcuerdo proyectosAcuerdo={[]} />)} /> */}
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
