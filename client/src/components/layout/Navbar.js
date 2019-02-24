import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
 
//Components
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

//CSS
import '../css/navbar.css';

const Navbar = props => {
	return (
		<div className="navbar">
			<div className="left">
				<Link to="/">Twitter clone</Link>
			</div>
			<div className="right">
				{props.auth.isEmpty ? <SignedOutLinks/> : <SignedInLinks/>}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Navbar);