import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';

class Concejales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            concejales: this.props.concejales,
            selected: 'nombre'
        }
        this.sortBy = this.sortBy.bind(this);
        this.search = this.search.bind(this);
        document.title = "Concejales";
    }
    losProps = this.props.concejales;

    search(input) {
        var currentConcejales = this.state.concejales;
        var found = currentConcejales.filter(
            buscado => {
                return buscado.nombre.toLowerCase().includes(input.toLowerCase());
            }
        )
        this.setState(
            {
                concejales: found,
            }
        )
        if (input === "") this.setState({ concejales: this.losProps, })
    }

    sortBy(sorting) {
        var currentConcejales = this.state.concejales;
        var sortedConcejales;
        switch (sorting) {
            case "partido":
                sortedConcejales = currentConcejales.sort(
                    (concejal1, concejal2) => {
                        if (concejal1.partido < concejal2.partido) return -1;
                        if (concejal1.partido > concejal2.partido) return 1;
                        return 0;
                    })
                break;
            case "nombre":
                sortedConcejales = currentConcejales.sort(
                    (concejal1, concejal2) => {
                        if (concejal1.nombre < concejal2.nombre) return -1;
                        if (concejal1.nombre > concejal2.nombre) return 1;
                        return 0;
                    })
                break;
            case "comision":
                sortedConcejales = currentConcejales.sort(
                    (concejal1, concejal2) => {
                        if (concejal1.comision < concejal2.comision) return -1;
                        if (concejal1.comision > concejal2.comision) return 1;
                        return 0;
                    })
            default:
                break;
        }
        this.setState(
            {
                concejales: sortedConcejales,
                selected: sorting,
            }
        )
    }

    renderConcejales() {
        return this.state.concejales.map((concejal, index) => {
            return (
                <Link to={"/concejales/" + index}>
                    <Card style={{margin:"12px"}}>
                        <Grid container>
                            <Grid item xs>
                                <div className="bloqueFoto">
                                    <img
                                        src={concejal.foto}
                                        alt={"foto de " + concejal.nombre}
                                        style={{ "height": "65px" }}></img>
                                </div>
                            </Grid>
                            <Grid item xs>
                                <div className="bloqueNombre">
                                    <Typography variant="title"> {concejal.nombre}</Typography>
                                </div>
                            </Grid>

                            <Grid item xs>
                                <div className="bloqueComision">
                                    <Typography variant="subheading">Comisión {concejal.comision}</Typography>
                                </div>
                            </Grid>

                            <Grid item xs>
                                <div className="bloquePartido">
                                    <img
                                        src={concejal.fotoPartido}
                                        alt={"imagen de " + concejal.partido}
                                        style={{ "height": "45px" }}></img>
                                    <Typography variant="body2">{concejal.partido}</Typography>
                                </div>
                            </Grid>

                        </Grid>
                    </Card>
                </Link>
            )
        })
    }

    render() {
        return (

            <div className="pantallaDirectorio">
                
                <Card className="tituloBusqueda">
                    <Typography variant="headline" >
                        Concejo de Bogotá 2014 - 2018
                    </Typography>
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="barraBusqueda"
                        id="search"
                        onChange={e => this.search(document.getElementById("search").value)}
                    />
                </Card>
                <Card elevation={7} className="sorting">
                    <Typography variant="subheading" >
                        Ordenar por:
                    </Typography>
                    <Button
                        onClick={e => this.sortBy("nombre")}
                        disabled={this.state.selected === "nombre"}
                    >
                        Nombre
                        </Button>
                    <Button
                        onClick={e => this.sortBy("partido")}
                        disabled={this.state.selected === "partido"}
                    >
                        Partido
                        </Button>
                    <Button
                        onClick={e => this.sortBy("comision")}
                        disabled={this.state.selected === "comision"}
                    >
                        Comisión
                        </Button>
                </Card>
                <div className="listaConcejales">
                    {this.renderConcejales()}
                </div>
            </div>
        )
    }
}

export default Concejales;