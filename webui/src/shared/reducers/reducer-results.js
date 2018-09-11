const initialResults = [];

export default function reducer(state = initialResults, action) {
  	switch (action.type) {
    	case "FETCH_RESULT_SUCCESS":
      		return action.payload ;
     	default:
      		return state;
  	}
}