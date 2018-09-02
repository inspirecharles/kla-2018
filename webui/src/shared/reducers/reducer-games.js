const initialGames = [];

export default function reducer(state = initialGames, action) {
  	switch (action.type) {
    	case "FETCH_GAMES_SUCCESS":
      		return action.payload ;
     	default:
      		return state;
  	}
}