import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Actions
import { logout } from '../../store/actions/authActions';

class SignedInLinks extends Component{
	handleLogout = e => {
		e.preventDefault();
		this.props.logout();
	}

	render(){
		const profileLink = '/profile/' + this.props.auth.authData.id;
		return (
			<div>
				<Link to="/add-tweet">Add a tweet</Link>
				<Link to={profileLink}>Profile</Link>
				<a href="/" onClick={this.handleLogout}>Logout</a>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(SignedInLinks);