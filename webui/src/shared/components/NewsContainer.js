import React, { Component } from "react";

class NewsContainer extends Component {
	constructor() {
	    super();
	}
	
	componentDidMount() {
	 	window.scrollTo(0, 0)
	}

	render() {
	    return (
			<div className="result-container">
	    		<div className="container">
		    	 	News here
	      		</div>
      		</div>
	    );
	}
	
}

export default NewsContainer;
