import React from 'react';

//CSS
import '../css/tweet.css';

const Tweet = props => (
	<div className="tweet">
		<div className="tweet-header">{props.info.title}</div>
		<div className="tweet-text">{props.info.body}</div> <hr/>
		<div className="tweet-details">{props.info.author}, {props.info.date}</div>
	</div>
);

export default Tweet;