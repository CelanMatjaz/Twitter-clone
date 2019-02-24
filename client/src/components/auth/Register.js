import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import ErrorMessage from '../layout/ErrorMessage';

//CSS
import '../css/authForm.css';

//Actions
import { register } from '../../store/actions/authActions';

export class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
			password: '',
			passwordRepeat: '',
            email: '',
            registerErrors: []
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
        fetch('http://127.0.0.1:2000/register', {
			method: 'POST',
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                passwordRepeat: this.state.passwordRepeat,
                email: this.state.email,
            })
		})
			.then(res => res.json())
			.then(data => {
				if(data.errors.length === 0){    
                    this.props.history.push('/');              
				}
				else{
					this.setState({
                        registerErrors: data.errors
                    });
				}
			})
			.catch(error => {
				console.log(error)
            });
    }


    render() {
        if(!this.props.auth.isEmpty) return <Redirect/>;

        let { registerErrors } = this.state; 
		
        return (
            <div className="container authForm">
                <form onSubmit={this.handleSubmit}>                   

					<h1>Register</h1>
					<label htmlFor="email">Email</label> <br/>
                    <input type="email" id="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" required/><br/>

					<label htmlFor="username">Username</label> <br/>
                    <input type="text" id="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" required/><br/>
					
					<label htmlFor="password">Password</label> <br/>
                    <input type="password" id="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" required/><br/>

					<label htmlFor="passwordRepeat">Repeat password</label> <br/>
                    <input type="password" id="passwordRepeat" value={this.state.passwordRepeat} onChange={this.handleChange} placeholder="Repeat password" required/><br/>

                    <button>Register</button>

                    {(registerErrors.length !== 0) ? registerErrors.map((error, index) => <ErrorMessage key={index} error={error.error}/>) : ''}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
