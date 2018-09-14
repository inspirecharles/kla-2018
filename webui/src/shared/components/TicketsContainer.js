import React, { Component } from "react";

class TicketsContainer extends Component {
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
		    	 	Tickets here
	      		</div>
      		</div>
	    );
	}
	
}

export default TicketsContainer;
