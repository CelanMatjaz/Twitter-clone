import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks = props => {
	return (
		<div>
			<Link to="/register">Register</Link>			
			<Link to="/login">Login</Link>
		</div>
	);
};

export default SignedOutLinks;