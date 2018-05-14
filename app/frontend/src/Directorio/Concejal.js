import React, { PureComponent } from 'react';

import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import purple from 'material-ui/colors/purple';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import { LinearProgress } from 'material-ui/Progress';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Divider from 'material-ui/Divider';

import { Link, withRouter } from 'react-router-dom';

import Mapa from './Mapa.js';

class Concejal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            "concejal": this.props.info,
            "citaciones": this.props.citaciones,
            "tweets": [],
            "asuntos": []
        }
    }

    drawCitaciones() {
        let lasCitaciones = this.state.citaciones.filter(citacion => {
            return citacion.citador === this.state.concejal.nombre ? true : false;
        })
        if (lasCitaciones.length > 0) {
            let retorn;
            (lasCitaciones.map((citacion, index) => {
                return retorn = Object.entries(citacion).map((entry, i) => {
                    return (<Typography>{entry[0] + ": " + entry[1]}</Typography>)
                })
            }));
            return retorn;
        }
    }

    otrosPartido() {
        const otros = this.props.concejales.filter((concejal, index) => {
            return concejal.partido === this.state.concejal.partido;
        })
        if (otros.length > 0) {
            return otros.map((otro, index) => {
                return (
                    <Link to={"/concejales/" + index}>
                        <Typography>{otro.nombre}</Typography>
                    </Link>
                )
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
            return otros.map((otro, index) => {
                return (
                    <Link to={"/concejales/" + index}>
                        <Typography>{otro.nombre}</Typography>
                    </Link>
                )
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
                <Typography variant="headline">{title}</Typography>
                <Divider />
            </div>
        )
    }

    componentWillMount() {
        fetch('http://165.227.187.208:3000/twitsfromamount/' + this.state.concejal.twitter + '/6',
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
            return this.state.tweets.map(
                (tweet, index) => {
                    return (
                        <div>
                            <Typography variant="body1">{tweet[0]}</Typography>
                            <Typography variant="caption">{tweet[1]}</Typography>
                            <br />
                        </div>
                    )
                })
        }
        else {
            return <CircularProgress style={{ color: purple[500] }} thickness={7} />
        }
    }

    drawAsuntos() {
        if (this.state.asuntos.length > 0) {
            let losAsuntos = this.state.asuntos.filter(asunto => {
                return asunto.autor === this.state.concejal.nombre ? true : false;
            })
            return losAsuntos.map((asunto, index) => {
                return (
                    <div>
                        <Typography>{asunto[0].antecedente}</Typography>
                        <Divider />
                    </div>
                )
            })
        }
        else {
            return <CircularProgress style={{ color: purple[500] }} thickness={7} />
        }
    }

    drawAsistencia() {
        let asistencia =Math.random()*100;
        return (
            <div>
                <Typography>Asistencia</Typography>
                <LinearProgress variant="determinate" value={asistencia} />
                <br />
                <Typography>Participación</Typography>
                <LinearProgress variant="determinate" value={asistencia-12} color="primary" />
            </div>
        )
    }

    drawTable() {
        let votaciones = this.state.concejal.votaciones;
        let votLoc = [];
        votaciones.forEach(element => {
            votLoc.push(
                [
                    ...Object.keys(element),
                    ...Object.values(element)
                ]
            );
        });
        votLoc.sort((a, b) => {
            return b[1] - a[1];
        })
        return (
            <TableBody>
                <TableRow>
                    <TableCell>{votLoc[1][0]}</TableCell>
                    <TableCell numeric>{votLoc[1][1]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{votLoc[2][0]}</TableCell>
                    <TableCell numeric>{votLoc[2][1]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{votLoc[3][0]}</TableCell>
                    <TableCell numeric>{votLoc[3][1]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell numeric>{votaciones[0].total}</TableCell>
                </TableRow>
            </TableBody>
        )
    }

    render() {
        document.title = this.state.concejal.nombre;
        return (
            <Grid container>
                <Grid item md={10} xs={12}>
                    <div style={{ margin: "9px", "padding": "9px" }}>
                        <Grid container>
                            <Grid item md={3} xs={12}>
                                <img
                                    style={{ "height": "125px", "margin": "3px" }}
                                    src={this.state.concejal.foto}
                                    alt={"Foto de " + this.state.concejal.nombre} />
                            </Grid>
                            <Grid item md={9} xs={12}>
                                <Typography variant="display2">
                                    {this.state.concejal.nombre}
                                </Typography>
                                <div>
                                    <p>Comision {this.state.concejal.comision}</p>
                                </div>
                            </Grid>
                        </Grid>
                        <div>
                            {this.drawSection("Votaciones")}
                            <Grid container>
                                <Grid item xs={12} md={9}>
                                    <Mapa votaciones={this.state.concejal.votaciones} />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <Table >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Localidad</TableCell>
                                                <TableCell >Votos</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        {this.drawTable()}

                                    </Table>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            {this.drawSection("Perfil")}
                            {this.state.concejal.perfil}
                            <h6>Tomado de Concejo Como Vamos</h6>
                        </div>
                        <div >
                            {this.drawSection("Proyectos de Acuerdo")}
                            {this.drawAsuntos()}
                        </div>
                        <div>
                            {this.drawSection("Mesas de Trabajo")}
                        </div>
                        <div>
                            {this.drawSection("Asistencia y Participación")}
                            {this.drawAsistencia()}
                        </div>
                        <div>
                            {this.drawSection("Citaciones a Control Político")}
                            {this.drawCitaciones()}
                        </div>
                    </div>
                </Grid>
                <Grid item md={2} xs={12}>
                    <div>
                        <Card style={{ margin: "18px", "padding": "9px" }}>
                            <img
                                style={{ "height": "45px" }}
                                src={this.state.concejal.fotoPartido}
                                alt={"logo de " + this.state.concejal.partido} />
                            <Typography variant="subheading">Otros de {this.state.concejal.partido}</Typography>
                            <Divider />
                            {this.otrosPartido()}
                        </Card>

                        <Card style={{ margin: "18px", "padding": "9px" }}>
                            <Typography variant="subheading">Otros de {this.state.concejal.comision}</Typography>
                            <Divider />
                            {this.otrosComision()}
                        </Card>
                        <Card style={{ margin: "18px", "padding": "9px" }}>
                            <Typography variant="subheading">Tweets de {this.state.concejal.twitter}</Typography>
                            <Divider />
                            {this.drawTweets()}
                        </Card>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(Concejal);