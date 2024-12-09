import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Tab, Tabs, AppBar } from '@material-ui/core'
export default function Header() {
    const routes = ["/checklist","/notes"]
    return (
        <div className="topBar">
            <Route render={(history) => (
                <AppBar>
                    <Tabs  initialSelectedIndex={routes[0]} variant="fullWidth" value={history.location.pathname !== '/' ? history.location.pathname : false}>
                        <Tab label="notes" value={routes[1]} component={Link} to={routes[1]} ></Tab>
                        <Tab label="checklist" value={routes[0]} component={Link} to={routes[0]}></Tab>
                    </Tabs>
                </AppBar>
            )}
                path="/">
            </Route>
        </div>
    )
}
