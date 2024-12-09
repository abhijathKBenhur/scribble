import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'
import Footer from './Commons/Footer/Footer'
import Header from './Commons/Header/Header'
import Content from './Views/Content'
import './App.css';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Grid fluid>
        <Row >
          <Header></Header>
        </Row>
        <Row className="contentHolder">
            <Content></Content>
        </Row>
        <Row >
            <Footer></Footer>
        </Row>
        </Grid>
    </BrowserRouter>
  );
}

export default App;
