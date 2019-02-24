const initState = {
	isEmpty: true,
	authData: {},
	loginError: null,
	connError: null,
	registerErrors: []
}

const authReducer = (state = initState, action) => {
	switch(action.type){
		case 'LOGIN_SUCCESS':
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				isEmpty: false,
				authData: action.payload,
				loginError: null
			}

		case 'LOGIN_ERROR':
			return {
				...state,
				loginError: action.error
			}

		case 'LOGIN_ERROR_REQUEST': 
			return {
				...state,
				connError: action.error
			}

		case 'LOGOUT_SUCCESS':
		localStorage.removeItem('token');
			return {
				...state,
				authData: null,
				isEmpty: true
			}

		case 'CHECK_LOGIN_SUCCESS':
			return {
				...state,
				isEmpty: false,
				authData: action.payload				
			}

		case 'CHECK_LOGIN_ERROR':
			return {
				...state,
				isEmpty: true
			}
		
		default: 
			return state;
	}
}

export default authReducer;