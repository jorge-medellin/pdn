import React from "react";
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";
import BubbleChart from '../Charts/bubbles/BubbleChart';
import Bubbles from '../Charts/bubbles/Bubbles';
import {createNodes} from './utils';
import rp from "request-promise";
import { width, height, center } from './bubbles_constants'
import TypePicker from "../Charts/bubbles/TypePicker";
import TablaDetalle from "../Sancionados/Visualizaciones/TablaDetalle";

// Styles
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop:'53px'
    },
    item: {
        maxWidth: '1024px'
    },
    title: {
        color: theme.palette.textPrincipal.color,
        fontSize: 20,
        textDecoration: 'underline',
        textDecorationColor: theme.palette.secondary.main,
        textUnderlinePosition: 'under'
    },
    font: {
        color : theme.palette.textPrincipal.color
    }
});

class BubbleHolder extends React.Component{
    state = {
        data : [],
        type : 'sanciones',
        originalData:[],
        institucion:null,

    };

    componentDidMount(){
        let options = {
            uri : 'https://plataformadigitalnacional.org/api/provinha_dependencia',
            json : true
        };

        rp(options)
            .then(data=>{
                let aux = JSON.parse(JSON.stringify(data));
                this.setState({
                    data: createNodes(aux,'sanciones'),
                    originalData : data,
                });
            })
            .catch(err=>{
               alert("_No se pudo obtener la información");
               console.log(err);
            });
    }

    onTypeChanged = (newType)=>{
        if(this.state.type !== newType){
            this.setState({
                data:createNodes(this.state.originalData,newType),
                type : newType,
                institucion : null
            });
        }
    };

    selectBubble = (bubble) => {
        this.setState({institucion: bubble.dependencia});
        window.location.href = "#tablaDetalle";
    };

    render(){
        const {classes} = this.props;
        const {data, type} = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs  = {12}>
                        <Typography variant={"display1"} className={classes.title}>
                            Total de {this.state.type} por institución
                        </Typography>
                        <br/>
                        <Typography variant={"subheading"} className={classes.font}>{'Muestra las instituciones organizadas por el total de sanciones a particulares o bien por el monto total que han acumulado por las sanciones impuestas'}</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <TypePicker onChanged={this.onTypeChanged} active={type}/>
                        <BubbleChart width={width} height={height}>
                            <Bubbles data={data} forceStrength={0.3} center={center} type={type} selectBubble={this.selectBubble}/>
                        </BubbleChart>
                    </Grid>
                    <Grid item xs={12} id="tablaDetalle">
                        {this.state.institucion &&
                            <TablaDetalle  institucion={this.state.institucion}/>
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(BubbleHolder);