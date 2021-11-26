import React, { Suspense } from "react";
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import movie_image from '../../assets/images/movie_home.jpg';
import { Link } from 'react-router-dom';
import { AuthCheck } from 'reactfire';

interface Props {
    title: string;
}

const useStyles = makeStyles({
    root: {
        padding: '0',
        margin: '0'
    },
    navbar_container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logo: {
        margin: '0 0 0 0.45rem'
    },
    logo_a: {
        color: 'rgb(28,24,22)'
    },
    logo_navigation: {
        textTransform: 'uppercase',
        textDecoration: 'none'
    },
    nav_a: {
        display: 'block',
        padding: '1em',
        color: 'black'
    },
    navigation: {
        display: 'flex',
        listStyle: 'none'
    },
    main: {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${movie_image})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'absolute'
    },
    main_text: {
        textAlign: 'center',
        position: 'relative',
        top: '45%',
        color: 'white'
    }

});


export const Home = (props: Props) => {
    // Creating/ instantiating styles by calling useStyles()
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <nav>
                <div className={classes.navbar_container}>
                    <h1 className={classes.logo}>
                        <a href="" className={`${classes.logo_a} ${classes.logo_navigation}`}>Brand</a>
                    </h1>
                    <ul className={`${classes.navigation} ${classes.logo_navigation}`}>
                        <li>
                            <Link to='/' className={classes.nav_a}>Home</Link>
                        </li>
                        <Suspense fallback={'loading...'}>
                            <AuthCheck fallback={
                                <li>
                                    <Link to="/signin" className={classes.nav_a}>Sign In</Link>
                                </li>
                            }>

                                <li>
                                    <Link to="/dashboard" className={classes.nav_a}>Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/signin" className={classes.nav_a}>Sign Out</Link>
                                </li>
                            </AuthCheck>
                        </Suspense>
                    </ul>
                </div>
            </nav>
            <main className={classes.main}>
                <div className={classes.main_text}>
                    <h1>{props.title}</h1>
                    <Button color='primary' variant="contained">Click Here!</Button>
                </div>
            </main>
        </div>
    )
}