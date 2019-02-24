import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route }  from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

//Components
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import FeedProfile from './components/tweets/FeedProfile';
import Feed from './components/tweets/Feed';
import AddTweet from './components/tweets/AddTweet';

//Actions
import { checkIfLoggedIn } from './store/actions/authActions';

class App extends Component {

	componentDidMount(){
		this.props.checkIfLoggedIn();
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Navbar/>
					<div className="container">
						<Switch>						
							<Route exact path="/" component={Feed}/>
							<Route exact path="/login" component={Login}/>
							<Route exact path="/register" component={Register}/>
							<Route exact path="/profile/:id" component={FeedProfile}/>
							<Route exact path="/add-tweet" component={AddTweet}/>
						</Switch>
					</div>
				</div>
			</Router>			
		);
	}
}

export default connect(null, { checkIfLoggedIn })(App);
