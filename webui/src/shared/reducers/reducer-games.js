const initialGames = [];

export default function(state = initialGames, action) {
	switch(action.type){
		case "UPDATE_GAMES":
			return action.payload;
			break;
	}
	return state;
}