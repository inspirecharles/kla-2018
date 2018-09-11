const initialResultDetail = {};

export default function (state = initialResultDetail, action) {
  	switch (action.type) {
    	case "FETCH_RESULT_DETAIL_SUCCESS":
      		return action.payload ;
     	default:
      		return state;
  	}
}