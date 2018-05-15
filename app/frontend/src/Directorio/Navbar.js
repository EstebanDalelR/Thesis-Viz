import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class Navbar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Grid container>
                        <Grid item xs={3} md={4}>
                            <NavLink to="/">
                                <Button color="inherit">
                                    <Typography variant="button" gutterBottom color="secondary">
                                        Home
                                    </Typography>
                                </Button>
                            </NavLink>
                        </Grid>
                        <Grid item xs={5} md={4}>
                            <NavLink to="/secretarios">
                                <Button color="inherit">
                                    <Typography variant="button" gutterBottom color="secondary">
                                        Secretarios
                                    </Typography>
                                </Button>
                            </NavLink>
                        </Grid>
                        <Grid item xs={4} md={4}>
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