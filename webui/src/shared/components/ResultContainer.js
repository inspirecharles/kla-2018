import React, { Component } from "react";

class ResultContainer extends Component {
	constructor() {
	    super();
	}

	componentWillMount(){
		console.log(this.props.match.params.game_slug,this.props.match.params.draw_id);
		//console.log(this.props.routeParams.game_slug, this.props.routeParams.draw_id)
	}

	render() {
	    return (
			<div className="result-container">
	    		<div className="container">
		    	 	ResultContainer content here
	      		</div>
      		</div>
	    );
	}
	
}

export default ResultContainer;
