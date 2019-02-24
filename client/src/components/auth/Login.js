import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../store/actions/authActions'

//CSS
import '../css/authForm.css';

//Components
import ErrorMessage from '../layout/ErrorMessage';

export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state)
	}	
																																														
    render() {
        const { isEmpty, authError } = this.props.auth;
        
		if(!isEmpty && !authError){
            const profileLink = '/profile/' + this.props.auth.authData.username;
            return <Redirect to={profileLink}/>;
        } 
		
        return (
            <div className="container authForm">
                <form onSubmit={this.handleSubmit}>                            
                    <h1>Login</h1>
                    <label htmlFor="username">Username</label> <br/>
					<input 
						type="text" 
						id="username" 
						value={this.state.username} 
						onChange={this.handleChange} 
						placeholder="Username" 
						required 
						autoComplete="on"
					/>
                    <br/>
                    <label htmlFor="password">Password</label> <br/>
                    <input 
                    	type="password" 
						id="password" 
						value={this.state.password} 
						onChange={this.handleChange} 
						placeholder="Password" 
						required 
						autoComplete="on"
					/>
                    <br/>
                    <button>Login</button> <br/> <br/>  
					<Link to="/register">Or register</Link>
                    {this.props.auth.loginError ? <ErrorMessage error={this.props.auth.loginError}/> : ''}          
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);
