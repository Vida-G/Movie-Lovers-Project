import {
    Drawer as MUIDrawer,
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
    Theme,
    useTheme,
    makeStyles,
    createStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';


import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { useState } from 'react';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router';
import { DataTable, MovieForm, Suggestion } from '../../components';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const drawerwidth = 240; // width for sideNav drawer 

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            // backgroundColor: 'black'
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen

            }),
            backgroundColor: 'black'
        },
        appBarShift: {
            width: `calc(100% - ${drawerwidth}px)`,
            marginLeft: drawerwidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
            
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerwidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerwidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // required for content to display below the AppBar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
            // backgroundColor: 'black',
        
            
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen

            }),
            marginLeft: -drawerwidth
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0
        },
        toolbar: {
            display: 'flex',
            color: 'white'
        },
        toolbarButton: {
            marginLeft: 'auto',
            color: 'white'
        }
    })
)

interface DashProps {
    history: RouteComponentProps["history"];
    location: RouteComponentProps["location"];
    match: RouteComponentProps["match"];
}



export const Dashboard = withRouter((props: DashProps) => {
    console.log(props)
    const { history } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true)
    };
    const handleDrawerClose = () => {
        setOpen(false)
    };

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClickClose = () => {
        setDialogOpen(false);
    }

    const itemsList = [
        {
            text: 'Home',
            onClick: () => history.push('/')
        },
        {
            text: 'Sign Out',
            onClick: () => history.push('/signin')
        }
    ];

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position='fixed'
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label='open drawer'
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' noWrap>
                            My Movies 
                        </Typography>
                        <Button className={classes.toolbarButton} onClick={handleDialogClickOpen}>Create New Movie</Button>
                        {/*Dialog Pop Up begin */}
                        <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Add New Movie</DialogTitle>
                            <DialogContent>
                                <DialogContentText>Add A New Movie</DialogContentText>
                                <MovieForm />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClickClose} color="primary">Cancel</Button>
                                <Button onClick={handleDialogClickClose} color="primary">Done</Button>
                            </DialogActions>
                        </Dialog>
                    </Toolbar>
                </AppBar>
                <MUIDrawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {itemsList.map((item) => {
                            const { text, onClick } = item;
                            return (
                                <ListItem button key={text} onClick={onClick}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            );
                        })}
                    </List>
                </MUIDrawer>
                <main className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
                    <div className={classes.drawerHeader} />
                    <Suggestion />
                    <DataTable />
                </main>
            </div>
        </ThemeProvider>
    )
})





