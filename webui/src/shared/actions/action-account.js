import "isomorphic-fetch";

const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS';

export const updateAccounts = (data) => {
	const request = axios.get('/api/get-accounts');
	
	return (dispatch) => {
		request.then((data) => {
			dispatch({
				type: UPDATE_ACCOUNTS,
				payload: data.data
			})
		});
	}
}