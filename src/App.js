import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { UserInfo, ConnectTest, ObserverTest, Result,
  WebServerResult, HeaderLineTest, StatusCodeTest,
  WebClient, ClientTest, ClientTest2, WebClientResult,
  UnitUserInfo, UnitPhase, UnitResult,
  CoapMain, WebMain, WebServer, Main, GetTest, PostTest, DeleteTest, PutTest } from './components';

class App extends Component {         

  constructor(props){
    super(props);
    localStorage.setItem('serverURL', 'http://192.168.0.3:8080')
    this.state = {
    	answer : ""
    }
  }

  render() {   
    return (
		<Router>
			<div className="App" style={{margin: 'auto'}}>
				<Route path="/" exact component={Main} />
				<Route path="/webMain" exact component={WebMain} />
				<Route path="/webClient" exact component={WebClient} />
				<Route path="/webClient/get" component={ClientTest} />
				<Route path="/webClient/post" component={ClientTest2} />
				<Route path="/webClient/result" component={WebClientResult} />
				<Route path="/webClient/getUnitTest" component={GetTest}/>
				<Route path="/webClient/postUnitTest" component={PostTest}/>
				<Route path="/webClient/putUnitTest" component={PutTest}/>
				<Route path="/webClient/deleteUnitTest" component={DeleteTest}/>
				<Route path="/webServer" exact component={WebServer}/>
				<Route path="/webServer/result" component={WebServerResult} />
				<Route path="/webServer/statusCodeResult" component={StatusCodeTest} />
				<Route path="/webServer/headerLineResult" component={HeaderLineTest} />
				<Route path="/coapMain" exact component={CoapMain} />
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