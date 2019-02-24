import React, { Component } from 'react';

//CSS
import '../css/tweet.css';

class TweetProfile extends Component {
	render() {
		const { id } = this.props.info;
		return (
			<div className="tweet">
				<div className="tweet-header">{this.props.info.title}</div>
				<div className="tweet-text">{this.props.info.body}</div> <hr/>
				<div className="tweet-details">
					<button className="remove-btn" onClick={() => this.props.deleteTweet(id)}>Delete tweet</button>
					{this.props.info.author}, {this.props.info.date}
				</div>
			</div>
		);
	}
}

export default TweetProfile;