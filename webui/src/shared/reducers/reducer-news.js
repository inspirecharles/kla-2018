const initialNews = [];

export default function (state = initialNews, action) {
  	switch (action.type) {
    	case "FETCH_NEWS_SUCCESS":
      		return action.payload ;
     	default:
      		return state;
  	}
}