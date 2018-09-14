const initialResultDetail = {};

export default function (state = initialResultDetail, action) {
  	switch (action.type) {
      	case "FETCH_RESULT_DETAIL_REQUEST":
      		return {} ;
    	case "FETCH_RESULT_DETAIL_SUCCESS":
      		return { ...action.payload};
      	case "EMPTY_RESULT_DETAIL_FAILURE":
      		return {} ;
     	default:
      		return state;
  	}
}