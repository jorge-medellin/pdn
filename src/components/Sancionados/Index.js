import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Footer from '../Home/Footer';
import Grid from "@material-ui/core/Grid/Grid";
import img1 from "../../assets/img/servidores_publicos_sancionados.svg";
import img2 from "../../assets/img/particulares_sancionados.svg";
import img3 from "../../assets/img/servidores_visualizaciones.svg";
import TablaServidoresSancionados from './Servidores/TablaServidoresSancionados';
import TablaParticularesSancionados from './Particulares/TablaParticularesSancionados';
import BubbleHolder from './Visualizaciones/BubbleHolder';
import './s3.css';
import Header from './Header/Header';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    whiteText: {
        color: '#fff'
    },
    textDark: {
        color: theme.palette.textNormal,
        textAlign: 'justify'
    },
    bgPanelTable: {
        backgroundColor: theme.palette.white.color,
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing.unit * 30,
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing.unit * 10,
        },
    },
    section: {
        maxWidth: '1200px',
    },
    sectionT: {
        maxWidth: '1200px',
        overflowX : 'auto'
    },
    image: {
        width: '60px'
    },
    bgContainer: {
        backgroundColor: '#34b3eb',//theme.palette.azul.color,
    },
    center: {
        textAlign: 'center'
    },
    links: {
        backgroundColor: theme.palette.grisTenue.color
    },
    card: {
        backgroundColor: '#34b3eb', //theme.palette.azul.color,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: 0,
    },
    cardSeleccionada: {
        backgroundColor: 'grey',//theme.palette.white.color,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margin: 0,
    },
    figure: {
        display: 'inline-block',
        float: 'left',
        margin: 0,
        padding: 0,
        paddingRight: '8px'
    }
});

class Index extends React.Component {
    state = {
        idContent: 1
    };
    changeContent = id => {
        this.setState({idContent: id});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Header/>
                <Grid container justify="center" className={classes.bgContainer}>
                    <Grid item xs={12} className={classes.section}>
                        <Grid container>
                            <Grid item md={4} xs={12} className={this.state.idContent !== 1 ? classes.card : classes.cardSeleccionada}
                                  onClick={() => this.changeContent(1)}>
                                <figure className={classes.figure}>
                                    <img src={img1} alt="Servidores públicos sancionados"
                                         className={classes.image}/>
                                </figure>
                                <Typography variant="subtitle1" style={{fontWeight: this.state.idContent === 1 ? 500 : 300}}
                                            className={classes.whiteText}>
                                    Servidores públicos sancionados
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={12}
                                  className={this.state.idContent !== 2 ? classes.card : classes.cardSeleccionada}
                                  onClick={() => this.changeContent(2)}>
                                <figure className={classes.figure}>
                                    <img src={img2} alt="Particulares sancionados"
                                         className={classes.image}/>
                                </figure>
                                <Typography variant="subtitle1"
                                            style={{fontWeight: this.state.idContent === 2 ? 500 : 300}}
                                            className={classes.whiteText}>
                                    Particulares sancionados
                                </Typography>

                            </Grid>
                            <Grid item md={4} xs={12}
                                  className={this.state.idContent !== 3 ? classes.card : classes.cardSeleccionada}
                                  onClick={() => this.changeContent(3)}>

                                <figure className={classes.figure}>
                                    <img src={img3} alt="Visualizaciones"
                                         className={classes.image}/>
                                </figure>

                                <Typography variant="subtitle1"
                                            style={{fontWeight: this.state.idContent === 3 ? 500 : 300}}
                                            className={classes.whiteText}>
                                    Visualizaciones
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid container justify='center' className={classes.bgPanelTable}>
                    <Grid item xs={12} className={classes.sectionT}>
                        {this.state.idContent === 1 &&
                        <TablaServidoresSancionados/>
                        }
                        {this.state.idContent === 2 &&
                        <TablaParticularesSancionados/>
                        }
                    </Grid>
                    <Grid item xs={12} className={classes.sectionT}>
                        {this.state.idContent === 3 &&
                        <BubbleHolder/>
                        }
                    </Grid>
                </Grid>
                < Footer/>
            </div>
        );
    }

}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);