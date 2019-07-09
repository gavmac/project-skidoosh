import React from "react";

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

        ul: {
            margin: 0,
            padding: 0,
        },

        li: {
            listStyle: 'none',
        },
        link: {
            padding: '1rem',
        },
        toolbar: {
            flexWrap: 'wrap',
        },
        toolbarTitle: {
            flexGrow: 1,
        }
});

function Header () {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Project-Skidoosh
                    </Typography>
                    <nav>
                        <Link variant="button" color="textPrimary" href="/" className={classes.link}>
                            Home
                        </Link>
                        <Link variant="button" color="textPrimary" href="/login" className={classes.link}>
                            Login
                        </Link>
                        <Link variant="button" color="textPrimary" href="hiro" className={classes.link}>
                            Hiro
                        </Link>
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    )
}


export default Header