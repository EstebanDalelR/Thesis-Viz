import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class Navbar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Grid container>
                        <Grid item xs>
                            <NavLink to="/">
                                <Button color="inherit">
                                    <Typography variant="button" gutterBottom color="secondary">
                                        Home
                                    </Typography>
                                </Button>
                            </NavLink>
                        </Grid>
                        <Grid item xs>
                            <NavLink to="/secretarios">
                                <Button color="inherit">
                                    <Typography variant="button" gutterBottom color="secondary">
                                        Secretarios
                                    </Typography>
                                </Button>
                            </NavLink>
                        </Grid>
                        <Grid item xs>
                            <NavLink to="/concejales">
                                <Button color="inherit">
                                    <Typography variant="button" gutterBottom color="secondary">
                                        Concejales
                                    </Typography>
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
        )

    }
}

export default Navbar;