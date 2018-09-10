import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";

import {fetchResultByGameAndDrawId} from "../actions/action-results";

class ResultContainer extends Component {
	constructor() {
	    super();
	}

	static initialAction(game_slug = null, draw_id=null) {
    	return fetchResultByGameAndDrawId(game_slug, draw_id);
  	}

	componentWillMount(){
		if (!this.props.results || this.props.results.length == 0)
      		this.props.dispatch(ResultContainer.initialAction( this.props.match.params.game_slug, this.props.match.params.draw_id ));
	}

	render() {
	    return (
			<div className="result-container">
	    		<div className="container">
		    	 	<div className="row">
			    		<div className="col-lg-12">
			    			<h1 className="display-5 text-left text-white mt-4 latest-title">Latest {this.props.results && this.props.results.length && this.props.results[0].name} Results.</h1>
			    		</div>
			    	</div>
	      		</div>
      		</div>
	    );
	}
	
}


function mapStateToProps(state){
  	return {
    	results: state.results
  	}
}

export default withRouter(connect(mapStateToProps)(ResultContainer));
