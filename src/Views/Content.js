import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Route, Switch } from 'react-router-dom'
import Checklist from './Checklist/Checklist'
import Notes from './Notes/Notes'
import { Grid, Row, Col } from 'react-flexbox-grid'
import './Content.css'
import { ProSidebar, SidebarContent, SidebarHeader, SidebarFooter, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function Content() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
            <Switch>
                <Route path="/notes" component={Notes}></Route>
                <Route path="/checklist" component={Checklist}></Route>
            </Switch>
        
    )
    
}

export default Content