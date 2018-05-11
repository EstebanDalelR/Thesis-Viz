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
    render() {
            var margin = { top: 20, bottom:20, right: 20, left: 20};
            var width = "800";
            var height = "800";
            var svg = d3.select("svg");
            var path = d3.geoPath()
                .projection(
                    d3.geoTransverseMercator()
                    .fitExtent([[margin.left, margin.top], [width-margin.right, height-margin.bottom]], localidades)
                ); 

            svg.selectAll("path")
                .data(localidades.features)
                .enter().append("path")
                .attr("class", "tract") 
                .attr("d", path)
                .append("title")
                .text(function (d) { return d.properties.name; });  
                
            svg.selectAll(".tract-border")
                .data(localidades.features)
                .enter()
                .append("path")
                  .attr("class", "tract-border")
                  .attr("d", path);
        return (
            <svg viewBox="0 0 800 800" width="100%" height="100%">
                
            </svg>
        )
    }
}

export default Mapa;