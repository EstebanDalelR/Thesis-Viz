import React, { Component } from 'react';

import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import purple from 'material-ui/colors/purple';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import './bogota.json';
import * as d3 from "d3";

class Concejal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "concejal": this.props.info,
            "citaciones": this.props.citaciones,
            "tweets": [],
            "asuntos":[]
        }
    }

    drawCitaciones() {
        var lasCitaciones = this.state.citaciones.filter(citacion => {
            return citacion.citador === this.state.concejal.nombre ? true : false;
        })
        if (lasCitaciones.length > 0) {
            var retorn;
            (lasCitaciones.map(citacion => {
                retorn = Object.entries(citacion).map(entry => {
                    return <Typography>{entry[0] + ": " + entry[1]}</Typography>
                })
            }));
            return retorn;
        }
    }

    otrosPartido() {
        const otros = this.props.concejales.filter(concejal => {
            return concejal.partido === this.state.concejal.partido;
        })
        if (otros.length > 0) {
            return otros.map(otro => {
                return <Typography>{otro.nombre}</Typography>
            })
        }
        else {
            return (
                "No hay nadie de este partido"
            )
        }
    }

    otrosComision() {
        const otros = this.props.concejales.filter(concejal => {
            return concejal.comision === this.state.concejal.comision;
        })
        if (otros.length > 0) {
            return otros.map(otro => {
                return <Typography>{otro.nombre}</Typography>
            })
        }
        else {
            return (
                "No hay nadie de esta comisión"
            )
        }
    }

    drawSection(title) {
        return (
            <div>
                <Typography variant="subheading">{title}</Typography>
                <hr />
            </div>
        )
    }

    componentWillMount() {
        fetch('http://165.227.187.208:3000/twitsfromamount/' + this.state.concejal.twitter + '/3',
            {
                method: 'GET',
                headers: { accept: 'application/json' },
            })
            .then((res) => {
                if (res.ok)
                    return res.json();
            })
            .then((tweets) => {
                this.setState({
                    tweets: tweets
                });
            });
        fetch('http://165.227.187.208:3000/asuntos',
            {
                method: 'GET',
                headers: { accept: 'application/json' },
            })
            .then((res) => {
                if (res.ok)
                    return res.json();
            })
            .then((asuntos) => {
                this.setState({
                    asuntos: asuntos
                });
            });
    }

    drawTweets() {
        if (this.state.tweets.length > 0) {
            return this.state.tweets.map(tweet => {
                return (<div>
                    <Typography>{tweet[0]}</Typography>
                    <hr />
                </div>
                )
            })
        }
        else {
            return <CircularProgress style={{ color: purple[500] }} thickness={7} />
        }
    }
    
    drawMap() {

    }

    drawAsuntos(){
        if (this.state.asuntos.length > 0) {
            var losAsuntos = this.state.asuntos.filter(asunto => {
                return asunto.autor === this.state.concejal.nombre ? true : false;
            })
            return losAsuntos.map(asunto => {
                return (
                <div>
                    <Typography>{asunto[0].antecedente}</Typography>
                    <hr />
                </div>
                )
            })
        }
        else {
            return <CircularProgress style={{ color: purple[500] }} thickness={7} />
        }
    }

    render() {
        document.title = this.state.concejal.nombre;
        return (
            <div>
                <Grid container>
                    <Grid item xs={10}>
                        <Paper style={{ margin: "3px" }}>
                            <Grid container>
                                <Grid item xs={3}>
                                    <img
                                        className="fotoPersona"
                                        src={this.state.concejal.foto}
                                        alt={"Foto de " + this.state.concejal.nombre} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="display2">
                                        {this.state.concejal.nombre}
                                    </Typography>
                                    <div className="periodosAnteriores">
                                        <p>Comision {this.state.concejal.comision}</p>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="votaciones">
                                {this.drawSection("Votaciones")}
                                <img alt="mapa de Bogota" src='http://cdn.radiosantafe.com//wp-content/uploads/2016/01/BOGOTA-MAPA.jpg' />
                            </div>
                            <div className="hojaDeVida">
                                {this.drawSection("Perfil")}
                                {this.state.concejal.perfil}
                                <h6>Tomado de Concejo Como Vamos</h6>
                            </div>
                            <div className="proyectosAcuerdo">
                                {this.drawSection("Proyectos de Acuerdo")}
                                {this.drawAsuntos()}
                            </div>
                            <div className="mesasTrabajo">
                                {this.drawSection("Mesas de Trabajo")}
                            </div>
                            <div className="asistencia">
                                {this.drawSection("Asistencia y Participación")}
                            </div>
                            <div className="controlPolitico">
                                {this.drawSection("Citaciones a Control Político")}
                                {this.drawCitaciones()}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            <Card style={{ margin: "9px" }}>
                                <img
                                    className="logoPartido"
                                    src={this.state.concejal.fotoPartido}
                                    alt={"logo de " + this.state.concejal.partido} />
                                <Typography variant="subheading">Otros de {this.state.concejal.partido}</Typography>
                                <hr />
                                {this.otrosPartido()}
                            </Card>

                            <Card style={{ margin: "9px" }}>
                                <Typography variant="subheading">Otros de {this.state.concejal.comision}</Typography>
                                <hr />
                                {this.otrosComision()}
                            </Card>
                            <Card style={{ margin: "9px" }}>
                                <Typography variant="subheading">Tweets de {this.state.concejal.twitter}</Typography>
                                <hr />
                                {this.drawTweets()}
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Concejal;