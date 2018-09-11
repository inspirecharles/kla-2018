import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";

import {fetchResultByGameAndDrawId} from "../actions/action-result-detail";

class ResultContainer extends Component {
	constructor() {
	    super();
	}

	static initialAction(game_slug = null, draw_id=null) {
    	return fetchResultByGameAndDrawId(game_slug, draw_id);
  	}

	componentWillMount(){
      	this.props.dispatch(ResultContainer.initialAction( this.props.match.params.game_slug, this.props.match.params.draw_id ));
	}

	render() {
	    return (
			<div id="result-detail" className="result-container">
	    		<section className="detail container ">
		    	 	<div className="row">
			    		<div className="col-lg-12">
			    			<h1 className="display-5 text-left text-white mt-4 latest-title">Latest {this.props.result_detail && this.props.result_detail.name} Results - Draw {this.props.result_detail.results && this.props.result_detail.results.length && this.props.result_detail.results[0].draw_id}</h1>
			    		</div>
			    		<div className="col-lg-12">
			    			
			    		</div>
			    	</div>
	      		</section>
      		</div>
	    );
	}
	
}


function mapStateToProps(state){
  	return {
    	result_detail: state.result_detail
  	}
}

export default withRouter(connect(mapStateToProps)(ResultContainer));
