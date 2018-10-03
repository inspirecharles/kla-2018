const initialGames = [];

export default function (state = initialGames, action) {
  	switch (action.type) {
    	case "FETCH_GAMES_SUCCESS":
      		return action.payload ;
    	case "EMPTY_GAMES":
    		console.log('EMPTY_GAMES');
      		return [] ;
     	default:
      		return state;
  	}
}