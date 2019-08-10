import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Grid, Card, CardContent, CardActions, Typography, Button, Paper, withStyles } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import WebMain from './components/WebMain.component';
import WebServer from './components/WebServer.component';

import Main from './components/Main.component';

import WebClient from './components/webClient/WebClient.component';
import ClientTest from './components/webClient/ClientTest.component';
import ClientTest2 from './components/webClient/ClientTest2.component';
import WebClientResult from './components/webClient/WebClientResult.component';
import ClientUnit from './components/webClient/ClientUnit.component';
import ClientUnitResult from './components/webClient/ClientUnitResult.component';

import CoapMain from './components/CoapMain.component';

import UnitUserInfo from './components/coapUnit/UnitUserInfo.component';
import UnitPhase from './components/coapUnit/UnitPhase.component';
import UnitResult from './components/coapUnit/UnitResult.component';

import UserInfo from './components/coapClient/UserInfo.component';
import ConnectTest from './components/coapClient/ConnectTest.component';
import ObserverTest from './components/coapClient/ObserverTest.component';
import Result from './components/coapClient/Result.component';

class App extends Component {

  constructor(props){
    super(props);

    localStorage.setItem('serverURL', 'http://192.168.0.5:8080')

    this.state = {
      answer : ""
    }
    // this.getTest = this.getTest.bind(this);
  }

  // getTest(){
  //   axios.get('http://172.30.118.150:8080/testStart')
  //     .then(res => {
  //       this.setState({ answer : res.data })
  //       console.log(res)
        
  //     }).catch(function(err){
  //       console.log(err);
  //     })
  // }

  render() {

    var to;

    return (
      <Router>
      <div className="App" style={{margin: 'auto'}}>
        <Route path="/" exact component={Main} />
        <Route path="/webMain" component={WebMain} />
        <Route path="/webServer" component={WebServer} />
        <Route path="/webClient" exact component={WebClient} />
        <Route path="/webClient/test_1" component={ClientTest} />
        <Route path="/webClient/test_2" component={ClientTest2} />
        <Route path="/webClient/result" component={WebClientResult} />
        <Route path="/webClient/unit" component={ClientUnit}/>
        <Route path="/webClient/unitResult" component={ClientUnitResult}/>
        <Route path="/coapMain" component={CoapMain} />
        <Route path="/unitTest" exact component={UnitUserInfo} />
        <Route path="/unitTest/unitPhase" component={UnitPhase} />
        <Route path="/unitTest/unitResult" component={UnitResult} />
        <Route path="/coapClient" exact component={UserInfo} />
        <Route path="/coapClient/connect" component={ConnectTest} />
        <Route path="/coapClient/observer" component={ObserverTest} />
        <Route path="/coapClient/result" component={Result} />
      </div>
      </Router>
    );
  }

}



export default App;
