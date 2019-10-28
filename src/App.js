import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { UserInfo, ConnectTest, ObserverTest, Result,
  WebServerResult, HeaderLineTest, StatusCodeTest,
  WebClient, ClientTest, ClientTest2, WebClientResult,
  UnitUserInfo, UnitPhase, UnitResult,
  CoapMain, WebMain, WebServer, Main, GetTest, PostTest, DeleteTest, PutTest } from './components';

class App extends Component {         

  constructor(props){
    super(props);
	localStorage.setItem('serverURL', 'http://testingweb.ap-northeast-2.elasticbeanstalk.com')
    this.state = {
    	answer : ""
    }
  }

  render() {   
    return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
		<Switch>
			<div className="App" style={{margin: 'auto'}}>
				<Route path="/" exact component={Main} />
				<Route path="/web" exact component={WebMain} />
				<Route path="/web/webClient" exact component={WebClient} />
				<Route path="/web/webClient/get" exact component={ClientTest} />
				<Route path="/web/webClient/get/post" exact component={ClientTest2} />
				<Route path="/web/webClient/get/post/result" component={WebClientResult} />
				<Route path="/web/webClient/getUnitTest" component={GetTest}/>
				<Route path="/web/webClient/postUnitTest" component={PostTest}/>
				<Route path="/web/webClient/putUnitTest" component={PutTest}/>
				<Route path="/web/webClient/deleteUnitTest" component={DeleteTest}/>
				<Route path="/web/webServer" exact component={WebServer}/>
				<Route path="/web/webServer/result" component={WebServerResult} />
				<Route path="/web/webServer/statusCodeResult" component={StatusCodeTest} />
				<Route path="/web/webServer/headerLineResult" component={HeaderLineTest} />
				<Route path="/coap" exact component={CoapMain} />
				<Route path="/coap/unitTest" exact component={UnitUserInfo} />
				<Route path="/coap/unitTest/unitPhase" exact component={UnitPhase} />
				<Route path="/coap/unitTest/unitPhase/unitResult" component={UnitResult} />
				<Route path="/coap/coapClient" exact component={UserInfo} />
				<Route path="/coap/coapClient/connect" exact component={ConnectTest} />
				<Route path="/coap/coapClient/connect/observer" exact component={ObserverTest} />
				<Route path="/coap/coapClient/connect/observer/result" component={Result} />
			</div>
		</Switch>
		</BrowserRouter>
		);
	}
}
export default App;