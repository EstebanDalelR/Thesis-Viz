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
    componentDidMount(){
        var margin = { top: 20, bottom: 20, right: 20, left: 20 };
        var width = "800";
        var height = "800";
        var svg = d3.select("svg");
        var color = d3.scaleThreshold()
            .domain(d3.range(0, 100000))
            .range(d3.schemeBlues[9]);

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
                    let value;
                    votLoc.forEach(element => {
                        if (element[0] === nomLoc) {
                            if (parseInt(element[1],10) === 0) {
                                value = "rgb(255,255,255)";
                            } else if (parseInt(element[1],10) <= 500) {
                                value = "rgb(209, 226, 255)";
                            } else if (parseInt(element[1],10) <= 1000) {
                                value = "rgb(155, 192, 255)";
                            } else if (parseInt(element[1],10) <= 1500) {
                                value = "rgb(107, 161, 255)";
                            } else if (parseInt(element[1],10) <= 2000) {
                                value = "rgb(63, 133, 255))";
                            } else if (parseInt(element[1],10) <= 3000) {
                                value = "rgb(53, 103, 255))";
                            } else if (parseInt(element[1],10) <= 5000) {
                                value = "rgb(33, 93, 255))";
                            } else if (parseInt(element[1],10) <= 8000) {
                                value = "rgb(23, 73, 255))";
                            } else if (parseInt(element[1],10) <= 10000) {
                                value = "rgb(13, 53, 255))";
                            } else if (parseInt(element[1],10) <= 20000) {
                                value = "rgb(13, 33, 255))";
                            }
                            else {
                                value = "rgb(0, 0, 255))";
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
                            text = nomLoc + ":" + element[1]
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