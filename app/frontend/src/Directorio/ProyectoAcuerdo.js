import React, { Component } from 'react';
class ProyectoAcuerdo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            codigo: '',
            comision: '',
            concejal:{

            },
            estado: '',
            fecha: '',
            periodo: '2016 - 2019',
            tema: '',
            tags: [
                'algo',
                'otro',
            ],
        };
    }
    render() {
        return ( 
            <div>

            </div>
         )
    }
}

export default ProyectoAcuerdo;