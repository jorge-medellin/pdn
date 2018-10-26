import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { fillColor } from '../../Sancionados/Visualizaciones/utils';
import tooltip from './Tooltip';

export default class Bubbles_SPS extends React.Component {
    constructor(props) {
        super(props);
        const { forceStrength, center, group } = props;
        this.simulation = d3.forceSimulation()
            .velocityDecay(0.2)
            .force('x', d3.forceX().strength(forceStrength).x(center.x))
            .force('y', d3.forceY().strength(forceStrength).y(center.y))
            .force('charge', d3.forceManyBody().strength(this.charge.bind(this)))
            .on('tick', this.ticked.bind(this))
            .stop()
    }

    state = {
        g: null,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.renderBubbles(nextProps.data)
        }
        if (nextProps.group !== this.props.group) {
            this.regroupBubbles(nextProps.group)
        }

    }

    shouldComponentUpdate() {
        // we will handle moving the nodes on our own with d3.js
        // make React ignore this component
        return false
    };

    onRef = (ref) => {
        this.setState({ g: d3.select(ref) }, () => this.renderBubbles(this.props.data))
    };

    ticked() {
        this.state.g.selectAll('.bubble')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
    }

    charge(d) {
        return -this.props.forceStrength * (d.radius ** 2.0)
    }

    regroupBubbles = (group) => {
        const { forceStrength, yearCenters, center } = this.props;
        this.simulation.nodes(this.props.data)
            .alpha(1)
            .restart();
        if (group) {
           this.simulation.force('x', d3.forceX().strength(forceStrength).x(d => yearCenters[d.causa].x))
                .force('y', d3.forceY().strength(forceStrength).y(d => yearCenters[d.causa].y))

        } else {
            this.simulation.force('x', d3.forceX().strength(forceStrength).x(center.x))
                .force('y', d3.forceY().strength(forceStrength).y(center.y))
        }
        this.simulation.alpha(1).restart()
    };

    renderBubbles(data) {
        const bubbles = this.state.g.selectAll('.bubble').data(data, d => d.id);

        // Exit
        bubbles.exit().remove();

        // Enter
        const bubblesE = bubbles.enter().append('circle')
            .classed('bubble', true)
            .attr('r', 0)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('fill', d => fillColor(d.group))
            .attr('stroke', d => d3.rgb(fillColor(d.group)).darker())
            .attr('stroke-width', 2)
            .attr('opacity',0.8)
            .on('mouseover', showDetail)  // eslint-disable-line
            .on('mouseout', hideDetail); // eslint-disable-line

        bubblesE.transition().duration(2000).attr('r', d => d.radius).on('end', () => {
            this.simulation.nodes(data)
                .alpha(1)
                .restart()
        })
    }

    render() {
        return (
            <g ref={this.onRef} className="bubbles" />
        )
    }
}

Bubbles_SPS.propTypes = {
    center: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    forceStrength: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        radius: PropTypes.number.isRequired
    })),
};

function formatCurrency(n, currency) {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

/*
* Function called on mouseover to display the
* details of a bubble in the tooltip.
*/
export function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr('stroke', 'black');

    const content = `<span class="name">Dependencia: </span><span class="value">${
            d.dependencia
            }</span><br/>` +
        `<span class="name">Sanciones total: </span><span class="value">${
            d.sancionesTotal
            }</span>`;

    const contentGroup = `<span class="name">Causa: </span><span class="value">${
            d.causa
            }</span><br/>` +
        `<span class="name">Sanciones total: </span><span class="value">${
            d.sancionesTotal
            }</span>`;

    this.group ? tooltip.showTooltip(contentGroup, d3.event) : tooltip.showTooltip(content, d3.event);
}

/*
* Hides tooltip
*/
export function hideDetail(d) {
    // reset outline
    d3.select(this)
        .attr('stroke', d3.rgb(fillColor(d.group)).darker())

    tooltip.hideTooltip()
}