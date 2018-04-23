import React, { Component } from 'react';
import { Route, Switch } from 'react-router'
import purple from 'material-ui/colors/purple';
import { createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
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
    citaciones:[],
  }
  
  componentWillMount() {
    /*     fetch('http://165.227.187.208:3000/camara',
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

    fetch('http://165.227.187.208:3000/concejales',
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

    fetch('http://165.227.187.208:3000/secretarios',
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
      fetch('http://165.227.187.208:3000/citaciones',
      {
        method: 'GET',
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        if (res.ok)
        return res.json();
      })
      .then((citaciones) => {
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
          light: '#ff7961',
          main: '#fff',
          dark: '#fff',
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
              path="/concejales/:number"
              render={props => (
                <Concejal 
                info={concejales[props.match.params.number]}
                concejales={this.state.concejales} 
                citaciones={this.state.citaciones} />
                )}
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
