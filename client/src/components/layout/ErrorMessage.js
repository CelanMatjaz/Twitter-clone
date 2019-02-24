import React from 'react';

//CSS
import '../css/error.css';

const ErrorMessage = props => {
	return (
		<div className="error-message">
			{props.error}
		</div>
	);
};

export default ErrorMessage;