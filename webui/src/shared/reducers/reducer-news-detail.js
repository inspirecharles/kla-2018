const initialNewsDetail = {};

export default function (state = initialNewsDetail, action) {
  	switch (action.type) {
      	case "FETCH_NEWS_REQUEST":
      		return {} ;
    	case "FETCH_NEWS_DETAIL_SUCCESS":
          //console.log('---------------------------------------------------\nnews detail reducer success\n', action.payload);
      		return { ...action.payload};
      	case "EMPTY_NEWS_DETAIL":
      		return {} ;
     	default:
      		return state;
  	}
}