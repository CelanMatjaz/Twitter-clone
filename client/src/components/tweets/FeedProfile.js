import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//Components
import TweetProfile from './TweetProfile';

//CSS
import '../css/tweet.css';

class FeedProfile extends Component {
	state = {
		tweets: [],
		error: '',
		deleteError: ''
	}

	deleteTweet = id => {
		const token = localStorage.getItem('token');
		fetch('http://127.0.0.1:2000/delete-tweet/' + id, {
			method: 'POST',
			mode: 'cors',
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(res => res.json())
			.then(data => {
				if(!data.error) {
					this.setState({ deleteError: '' });
					this.getTweets();
				}
				else {
					this.setState({ deleteError: data.error });					
					this.getTweets();
				}
			})
			.catch(error => {
				this.getTweets();
				console.log(error)
				this.setState({ deleteError: 'Could not delete tweet' })
			})
	}

	componentDidMount(){
		this.getTweets();
	}

	getTweets = () => {
		const url = 'http://127.0.0.1:2000/tweets/' + this.props.match.params.id;
		fetch(url)			
			.then(res => res.json())
			.then(tweets => {
				this.setState({ tweets });
			})
			.catch(error => {
				console.log(error)
				this.setState({error: 'Could not get tweets'});
			});
	}

	render(){
		if(this.props.auth.isEmpty) return <Redirect to="/"/>
		const { error } = this.state;
		const tweets = this.state.tweets.map(tweet => <TweetProfile key={tweet.id} info={tweet} deleteTweet={this.deleteTweet}/>);
		
		return (
			<div className="tweets">
				{this.state.deleteError === '' ? this.state.deleteError : ''}
				{error !== '' ? error : (this.state.tweets.length > 0 ? tweets : "No tweets to display")}
			</div>
		);
	}
};

const mapStateToProps = state => ({auth: state.auth})

export default connect(mapStateToProps)(FeedProfile);