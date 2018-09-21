const initialSiteMap = {};

export default function (state = initialSiteMap, action) {
  	switch (action.type) {
    	  case "FETCH_SITEMAP_SUCCESS":
      		return { ...action.payload};
      	case "EMPTY_SITEMAP_FAILURE":
      		return {type: 'fail', message: 'failed fetching sitemap', desc: {...action.payload}} ;
     	default:
      		return state;
  	}
}