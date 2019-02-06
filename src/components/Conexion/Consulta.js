import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import TablaSolicitudes from "./TablaSolicitudes";
import Typography from "@material-ui/core/Typography/Typography";
import Modal from "@material-ui/core/Modal/Modal";
import "../../index.css";

const styles = theme => ({
   section: {
        maxWidth: '1200px'
    },
    contenedor: {
        padding: theme.spacing.unit * 5,
    },
    bgImg: {
        background: 'url(/FOTO_BANNER_3.JPG)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        paddingTop: 0,//'163px',
        paddingBottom: '140px',
    },
    titleLight: {
        color: theme.palette.titleBanner.color,
    },
    titleSub: {
        color: theme.palette.titleBanner.color,
        paddingTop: '10px',
    },
    bgContainer: {
        paddingTop: '102px',
        marginBottom: '266px'
    },
    titleError: {
        textAlign: 'center',
        color: theme.palette.red.color
    },
});

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class Conexion extends React.Component {
    state = {
        flag_error : false,
        oficio: null
    };

    constructor(props, context) {
        super(props, context);
    }

    handleCloseError = () => {
        this.setState({flag_error: false});
    };


    render() {
        const {classes} = this.props;
        return (
            <div>
                <div id={"imgBanner"} className={classes.bgImg}>
                    <Grid container justify={"center"} spacing={0}>
                        <Grid item xs={12} className={classes.section} style={{paddingTop: 150}}>
                            <Grid container spacing={24}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant={"h2"} className={classes.titleLight}>Consulta solicitudes</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" className={classes.titleSub}>
                                        Aquí puedes consultar las solicitudes de conexión a la PDN, visualizar y descargar los oficios de solicitud y permitir o denegar las conexiones
                                    </Typography>
                                    <br/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Modal
                        open={this.state.flag_error}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        onClose={this.handleCloseError}
                    >
                        <div style={getModalStyle()} className={classes.paperCaptcha}>
                            <Grid container justify={"center"}>
                                <Grid item xs={12}>
                                    <Typography variant={"h5"} className={classes.titleError}>Error</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant={"subtitle1"}>{this.state.mensajeError}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Modal>
                </div>
                <div className={classes.bgContainer}>
                    <Grid container justify={'center'} spacing={0}>
                        <Grid item xs={12} className={classes.section}>
                            <Paper className={classes.contenedor}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TablaSolicitudes/>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(Conexion);