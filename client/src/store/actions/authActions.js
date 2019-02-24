export const register = (creds) => {
	return dispatch => {
		fetch('http://127.0.0.1:2000/register', {
			method: 'POST',
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(creds)
		})
			.then(res => res.json())
			.then(data => {
				if(!data){
					dispatch({ type: 'REGISTER_SUCCESS'});
				}
				else{
					dispatch({ type: 'REGISTER_ERROR', payload: data });
				}
			})
			.catch(error => {
				dispatch({ type: 'REGISTER_ERROR_REQUEST', error});
			});
	}	
}

export const login = creds => {
	return dispatch => {
		fetch('http://127.0.0.1:2000/login', {
			method: "post",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(creds)
		})
			.then(res => res.json())
			.then(data => {
				if(!data.error) dispatch({ type: 'LOGIN_SUCCESS', payload: data });
				else dispatch({ type: 'LOGIN_ERROR', error: data.error });
			})
			.catch(error => {
				dispatch({ type: 'LOGIN_ERROR_REQUEST', error: error });
			});
	}
}

export const logout = () => {
	return dispatch => {
		dispatch({ type: 'LOGOUT_SUCCESS'});
	}
}

export const checkIfLoggedIn = () => {
	return dispatch => {
		const token = localStorage.getItem('token')
		fetch('http://127.0.0.1:2000/check-login', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + token
			} 
		})
			.then(res => res.json())
			.then(data => {
				if(!data.error){
					dispatch({ type: 'CHECK_LOGIN_SUCCESS', payload: data });
				}
				else{
					dispatch({ type: 'CHECK_LOGIN_ERROR', payload: data });
				}
			})
			.catch(error => {
				dispatch({ type: 'CHECK_LOGIN_ERROR'});
			});
	}	
}


