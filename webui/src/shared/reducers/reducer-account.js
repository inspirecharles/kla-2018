const initialAccounts = [];

export default function(state = initialAccounts, action) {
	switch(action.type){
		case "UPDATE_ACCOUNTS":
			return action.payload;
			break;
	}
	return state;
}