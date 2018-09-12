import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";

import {renderDividends} from "../helper"
import UKResult from "./variants/uk/ResultComponent";

import {fetchResultByGameAndDrawId} from "../actions/action-result-detail";

class ResultContainer extends Component {
	constructor() {
	    super();

    	this.renderResult = this.renderResult.bind(this);
	}

	static initialAction(game_slug = null, draw_id=null) {
    	return fetchResultByGameAndDrawId(game_slug, draw_id);
  	}

	componentWillMount(){
      	this.props.dispatch(ResultContainer.initialAction( this.props.match.params.game_slug.replace("-", "_"), this.props.match.params.draw_id.replace("draw-","") ));
	}

	renderResult(){
		if( this.props.result_detail.variant == "uk" )
			return <UKResult game={this.props.result_detail} hideViewPrizes={true} />
	}

	render() {
	    return (
			<div id="result-detail">
	    		<section className="detail">
	    			<div className="container">
			    	 	<div className="row">
				    		<div className="col-lg-12">
				    			<h1 className="display-5 text-left text-white mt-4 latest-title">Latest {this.props.result_detail && this.props.result_detail.name} Results - Draw {this.props.result_detail.results && this.props.result_detail.results.length && this.props.result_detail.results[0].draw_id}</h1>
				    		</div>
				    	</div>
			    		<div className="detail-content col-lg-12">
			    			<div className="row">
			    				<div className="col-lg-5">
				    				<img className={"img-fluid game-logo "+this.props.result_detail.variant+"-logo-lotto game-"+this.props.result_detail.slug} src={"/img/variants/"+this.props.result_detail.variant+"/"+this.props.result_detail.slug+".png"} />
			    				</div>
			    				<div className="col-lg-7 text-right">
			    					<span class="current-jackpot">{this.props.result_detail.results && this.props.result_detail.results.length && decodeURIComponent(JSON.parse(this.props.result_detail.results[0].current_jackpot))}</span><br/>
				    				<span>{this.props.result_detail.results && this.props.result_detail.results.length && moment(this.props.result_detail.results[0].draw_date).format('dddd DD MMMM YYYY')}</span>
			    				</div>
			    			</div>
			    			<div className="row mt-3">
				    			<div className="col-lg-5">
				    				{ this.renderResult() }
				    				<div className="next-draw">
				    					<div>Next Draw</div>
				    					<div>{this.props.result_detail.results && this.props.result_detail.results.length && decodeURIComponent(JSON.parse(this.props.result_detail.results[0].next_jackpot))}</div>
				    					<div>
				    						<button>Buy Now</button>
				    					</div>
				    				</div>
				    			</div>
				    			<div className="col-lg-7">
				    				{ this.props.result_detail.results && this.props.result_detail.results.length && renderDividends(this.props.result_detail.results[0].dividends, 'lotto_dividends') }
				    			</div>
			    			</div>
			    		</div>
		    		</div>
	      		</section>
	      		<section className="">
	      			
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
