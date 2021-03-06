import React, { Component } from 'react';
import Card from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

class Secretarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secretarios: this.props.secretarios,
            selected: "nombre",
        }
        document.title = "Secretarios";
    }
    losProps = this.props.secretarios;

    search(input) {
        var currentSecretarios = this.state.secretarios;
        var found = currentSecretarios.filter(
            buscado => {
                return buscado.nombre.toLowerCase().includes(input.toLowerCase());
            }
        )
        this.setState(
            {
                secretarios: found,
            }
        )
        if (input === "") this.setState({ secretarios: this.losProps, })
    }

    sortBy(sorting) {
        var currentSecretarios = this.state.secretarios;
        var sortedSecretarios;
        switch (sorting) {
            case "secretaria":
                sortedSecretarios = currentSecretarios.sort(
                    (secretario1, secretario2) => {
                        if (secretario1.secretaria < secretario2.secretaria) return -1;
                        if (secretario1.secretaria > secretario2.secretaria) return 1;
                        return 0;
                    })
                break;
            case "nombre":
                sortedSecretarios = currentSecretarios.sort(
                    (secretario1, secretario2) => {
                        if (secretario1.nombre < secretario2.nombre) return -1;
                        if (secretario1.nombre > secretario2.nombre) return 1;
                        return 0;
                    })
                break;
            default:
                break;
        }
        this.setState(
            {
                secretarios: sortedSecretarios,
                selected: sorting,
            }
        )
    }

    renderSecretarios() {
        return this.state.secretarios.map((secretario, index) => {
            return (
                <Card style={{ marginTop: "6px" }}>
                    <Grid container>
                        <Grid item sm={4} xs={6}>
                            <img
                                src={secretario.foto}
                                alt={"foto de " + secretario.nombre}
                                style={{ "height": "65px" }}></img>
                        </Grid>
                        <Grid item sm={4} xs={6}>
                            <Typography variant="title"> {secretario.nombre}</Typography>
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Typography variant="subheading">Secretaría de {secretario.secretaria}</Typography>
                        </Grid>
                    </Grid>
                </Card>
            )
        })
    }
    render() {
        document.title = "Secretarios";
        return (
            <div style={{ "padding": "18px" }}>
                <div className="pantallaDirectorio">
                    <div className="tituloBusqueda">
                        <Typography variant="headline" >
                            Secretarios de Bogotá Mejor para Todos 2014 - 2018
                    </Typography>
                    </div>
                    <Grid container>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                id="search"
                                label="Buscar"
                                type="search"
                                margin="normal"
                                onChange={e => this.search(document.getElementById("search").value)}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Typography variant="subheading">
                                Ordenar por:
                                    </Typography>
                            <Button
                                onClick={e => this.sortBy("nombre")}
                                disabled={this.state.selected === "nombre"}
                            > Nombre </Button>
                            <Button
                                onClick={e => this.sortBy("secretaria")}
                                disabled={this.state.selected === "secretaria"}
                            > Secretaria </Button>
                        </Grid>
                    </Grid>
                    <div className="listaSecretarios">
                        {this.renderSecretarios()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Secretarios;