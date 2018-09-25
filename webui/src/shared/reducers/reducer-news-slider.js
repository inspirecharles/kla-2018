const initialNewsSlider = [];

export default function (state = initialNewsSlider, action) {
  	switch (action.type) {
    	case "FETCH_NEWS_SLIDER_SUCCESS":
      		return action.payload ;
     	default:
      		return state;
  	}
}