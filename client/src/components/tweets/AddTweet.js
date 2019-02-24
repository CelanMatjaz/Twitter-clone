import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//CSS
import '../css/addTweet.css';

//Components
import ErrorMessage from '../layout/ErrorMessage';

class AddTweet extends Component {

	constructor(){
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	state = {
		title: '',
		body: '',
		error: ''
	}

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		fetch('http://127.0.0.1:2000/add-tweet', {
			method: 'POST',
			headers: {
				authorization: 'Bearer ' + token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title: this.state.title.trim(),
				body: this.state.body.trim()
			})
		})
			.then(res => res.json())
			.then(data => {
				if(!data.error){
					this.setState({
						title: '',
						body: '',
						error: ''
					});
					this.props.history.push('/profile/' + this.props.auth.authData.id)
				}
				else{
					this.setState({
						error: data.error
					})
				}
			})
			.catch(error => {
				console.log(error)
				this.setState({
					error: 'No response from server'
				});
			});

		
	}	

	render() {
		if(this.props.auth.isEmpty) return <Redirect to="/"/>

		return (
			<form className="add-tweet" onSubmit={this.handleSubmit}>
				{this.state.error !== '' ? <ErrorMessage error={this.state.error}/> : ''}
				<label htmlFor="title">Tweet title</label>
				<input type="text" value={this.state.title} id="title" onChange={this.handleChange} autoComplete="no"/>
				
				<textarea value={this.state.body} id="body" onChange={this.handleChange}/>

				<button>Upload tweet</button>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(AddTweet);