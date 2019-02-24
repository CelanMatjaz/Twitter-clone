import React, { Component } from 'react';

//Components
import Tweet from './Tweet';

//CSS
import '../css/tweet.css';

class Feed extends Component {
	state = {
		tweets: [],
		error: ''
	}

	componentDidMount(){
		fetch('http://127.0.0.1:2000/tweets')
			.then(res => res.json())
			.then(tweets => {
				this.setState({tweets});
			})
			.catch(error => {
				console.log(error)
				this.setState({error: 'Could not get tweets'});
			})
	}

	render(){
		const { error } = this.state;
		const tweets = this.state.tweets.map(tweet => <Tweet key={tweet.id} info={tweet}/>);
		return (
			<div className="tweets">
				{error !== '' ? error : (this.state.tweets.length > 0 ? tweets : 'No tweets to display')}
			</div>
		);
	}
};

export default Feed;