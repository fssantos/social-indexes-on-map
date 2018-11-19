import React, { PureComponent } from 'react';
import { scaleLinear } from 'd3-scale';

import { Circle } from './styles';

const ICON = `
M 100, 100
m -75, 0
a 75,75 0 1,0 150,0
a 75,75 0 1,0 -150,0
`;

const pinStyle = {
    fill: '#d00',
    stroke: 'none'

};



export default class Pin extends PureComponent {

    calculateColor = (totalN, n) => {

        console.log(totalN);

        const color = scaleLinear()
            .domain([0, totalN / 2, totalN])
            .range(["#51bbd6", "#f1f075", "#f28cb1"]);

        return color(n);
    }

    calculateRadius = (totalN, n) => {

        console.log(totalN);

        const radius = scaleLinear()
            .domain([0, totalN / 2, totalN])
            .range(['50px', '75px', '100px']);

        return radius(n);
    }

    render() {
        const color = this.calculateColor(this.props.totalN, this.props.cluster.properties.point_count);
        const size = this.calculateRadius(this.props.totalN, this.props.cluster.properties.point_count);

        return (
            <Circle style={{ width: size, height: size, backgroundColor: color }}>

                <p style={{ color: 'white' }}>{this.props.cluster.properties.point_count}</p>
            </Circle>
        );
    }
}