const initialEnvs = [];

export default function (state = initialEnvs, action) {
  	switch (action.type) {
    	case "SET_ENV_SUCCESS":
      		return action.payload ;
     	default:
      		return state;
  	}
}