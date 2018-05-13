import React, { Component } from 'react';
import * as d3 from "d3";

import localidades from './localidades_bogota.json';

import '../CSS/Mapa.css';

class Mapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "",
        }
    }

    matcher() {
        let votLoc = [];
        this.props.votaciones.forEach(element => {
            votLoc.push(
                [
                    ...Object.keys(element),
                    ...Object.values(element)
                ]
            );
        });
        return votLoc;
    }

    componentDidMount() {
        var margin = { top: 20, bottom: 20, right: 20, left: 20 };
        var width = "800";
        var height = "800";
        var svg = d3.select("svg");

        let votLoc = this.matcher();

        var path = d3.geoPath()
            .projection(
                d3.geoTransverseMercator()
                    .fitExtent(
                        [
                            [margin.left, margin.top],
                            [width - margin.right, height - margin.bottom]
                        ],
                        localidades
                    )
            );

        svg.selectAll("path")
            .data(localidades.features)
            .enter().append("path")
            .style(
                "fill",
                (d) => {
                    let nomLoc = d.properties.name;
                    let value = "rgb(255,255,255)";
                    votLoc.forEach(element => {
                        if (element[0] === nomLoc) {
                            if (parseInt(element[1], 10) === 0) {
                                return value;
                            } else if (parseInt(element[1], 10) <= 25) {
                                return value = 'rgb(244, 244, 255)';
                            } else if (parseInt(element[1], 10) <= 50) {
                                return value = 'rgb(233, 233, 254)';
                            } else if (parseInt(element[1], 10) <= 75) {
                                return value = 'rgb(222, 222, 254)';
                            } else if (parseInt(element[1], 10) <= 100) {
                                return value = 'rgb(211, 211, 253)';
                            } else if (parseInt(element[1], 10) <= 200) {
                                return value = 'rgb(200,200,253)';
                            } else if (parseInt(element[1], 10) <= 300) {
                                return value = 'rgb(189,189,252)';
                            } else if (parseInt(element[1], 10) <= 400) {
                                return value = 'rgb(178,178,252)';
                            } else if (parseInt(element[1], 10) <= 500) {
                                return value = 'rgb(167,167,251)';
                            } else if (parseInt(element[1], 10) <= 600) {
                                return value = 'rgb(156,156,251)';
                            } else if (parseInt(element[1], 10) <= 700) {
                                return value = 'rgb(145,145,250)';
                            } else if (parseInt(element[1], 10) <= 800) {
                                return value = 'rgb(134,134,250)';
                            } else if (parseInt(element[1], 10) <= 900) {
                                return value = 'rgb(123,123,249)';
                            } else if (parseInt(element[1], 10) <= 1000) {
                                return value = 'rgb(112,112,249)';
                            } else if (parseInt(element[1], 10) <= 2000) {
                                return value = 'rgb(101,101,248)';
                            } else if (parseInt(element[1], 10) <= 3000) {
                                return value = 'rgb(90,90,248)';
                            } else if (parseInt(element[1], 10) <= 4000) {
                                return value = 'rgb(79,79,247)';
                            } else if (parseInt(element[1], 10) <= 5000) {
                                return value = 'rgb(68,68,247)';
                            } else if (parseInt(element[1], 10) <= 6000) {
                                return value = 'rgb(39,39,246)';
                            } else if (parseInt(element[1], 10) <= 7000) {
                                return value = 'rgb(57,57,246)';
                            } else if (parseInt(element[1], 10) <= 8000) {
                                return value = 'rgb(51,51,246)';
                            } else if (parseInt(element[1], 10) <= 9000) {
                                return value = 'rgb(49,49,246)';
                            } else if (parseInt(element[1], 10) <= 10000) {
                                return value = 'rgb(46,46,246)';
                            } else if (parseInt(element[1], 10) <= 15000) {
                                return value = 'rgb(39,39,246)';
                            } else if (parseInt(element[1], 10) <= 20000) {
                                return value = 'rgb(35,35,246)';
                            } else if (parseInt(element[1], 10) <= 25000) {
                                return value = 'rgb(29,29,246)';
                            } else if (parseInt(element[1], 10) <= 30000) {
                                return value = 'rgb(24,24,246)';
                            } else if (parseInt(element[1], 10) <= 35000) {
                                return value = 'rgb(19,19,246)';
                            } else if (parseInt(element[1], 10) <= 40000) {
                                return value = 'rgb(13,13,246)';
                            } else if (parseInt(element[1], 10) <= 50000) {
                                return value = 'rgb(2,2,246)';
                            }
                        }
                    })
                    return value
                }
            )
            .attr("class", "tract")
            .attr("d", path)
            .append("title")
            .text(
                (d) => {
                    let text;
                    let nomLoc = d.properties.name;
                    votLoc.forEach(element => {
                        if (element[0] === nomLoc) {
                            text = nomLoc + ": " + element[1]
                        }
                    })
                    return text;
                }
            );

        svg.selectAll(".tract-border")
            .data(localidades.features)
            .enter()
            .append("path")
            .attr("class", "tract-border")
            .attr("d", path);
    }
    render() {

        return (
            <svg viewBox="0 0 800 800" width="100%" height="100%">

            </svg>
        )
    }
}

export default Mapa;