import { makeStyles } from '@mui/styles'
import React from 'react'
import {
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Avatar
} from '@mui/material'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import {format} from 'date-fns'

const drawerWidth = 240;
const useStyles = makeStyles((theme)=>{
    return {
        page: {
            backgroundColor: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        linked: {
            textDecoration: 'none'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: 16
        },
        appbar: {
            maxWidth: `calc(100% - ${drawerWidth}px)`,
            padding: 10
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
});
export default function Layout({children}) {
    const classes = useStyles();
    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined color='secondary'/>,
            path: "/"
        },
        {
            text: "Create Notes",
            icon: <AddCircleOutlineOutlined color='secondary'/>,
            path: "/create"
        }
    ];
    const location = useLocation()
  return (
    <div className={classes.root}>
        <AppBar
        className={classes.appbar}
        >
            <Toolbar
            disableGutters>
                <Typography 
                color='textSecondary' 
                variant='h6' 
                backgroundColor='primary'
                className={classes.date}
                >Today date is {format(new Date(), "do MMMM y")}</Typography>
                <Typography>Dexter</Typography>
                <Avatar src='/download.jpeg' className={classes.avatar}/>
            </Toolbar>
        </AppBar>
        <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left' 
        classes={{paper: classes.drawerPaper}}  
        >
            <div>
                <Typography variant='h5' className={classes.title} color='textSecondary'>React Notes App</Typography>
            </div>
            <List>
               {menuItems.map((el, idx)=>{
                return (
                <Link to={el.path} className={classes.linked}>
                    <ListItem 
                    key= {el.text}
                    className={location.pathname===el.path ? classes.active : null}
                    >
                        <ListItemIcon>{el.icon}</ListItemIcon>
                        <ListItemText primary={el.text}/>
                    </ListItem>
                </Link>
                )
               })}
            </List>
        </Drawer>
        <div className={classes.page}>
            <div className={classes.toolbar}></div>
            {children}</div>
    </div>
  )
}
