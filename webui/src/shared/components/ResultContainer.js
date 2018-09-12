import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";

import {renderDividends} from "../helper"
import UKResult from "./variants/uk/ResultComponent";
import NewsSliderComponent from "./home/NewsSliderComponent"

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
			    		<div className="detail-content col-lg-12 mt-3">
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
				    					<div className="text-center mt-3">
				    						<button className="btn">Buy Now</button>
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
	      		<section className="view-past-result">
	      			<div className="container text-center pt-3 pb-3">
	      				<span>View Past {this.props.result_detail && this.props.result_detail.name} Draw Results</span>
	      				<button className="btn ml-5">Past Draws</button>
	      			</div>
	      		</section>
	      		<section className="result-video">
	      			<div className="container">
	      				<div className="row">
	      					<div className="col-lg-6">
	      						<h2 className="section-title">An Awesome Title About the<br/> Lottery Goes Here</h2>
	      						<p>
	      							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc commodo pulvinar sapien ut hendrerit. Ut eros mi, tristique facilisis nibh quis, pretium laoreet velit. <br/><br/>Suspendisse potenti. Duis quis nibh ac ante aliquam varius. Nulla varius risus orci, in scelerisque odio aliquet eget. Nam consequat justo diam, id finibus nunc ullamcorper at. <br/><br/>Sed eu dictum risus, accumsan mollis felis. Phasellus et sapien eget orci elementum condimentum. Nulla tincidunt laoreet auctor. Cras et nulla velit. Donec eget sodales erat. Aliquam volutpat ante ante, nec rutrum odio placerat quis. Vivamus semper blandit ex quis lacinia. Vivamus non consectetur quam, id gravida mi. Sed in porta nisl.
	      						</p>
	      					</div>
	      					<div className="col-lg-6">
	      						<iframe class="video" src="https://www.youtube.com/embed/KGDrNTQmJ0I" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
	      					</div>
	      				</div>
	      			</div>
	      		</section>
	      		<section className="draw-statistics">
	      			<div className="container">
	      				<div className="row">
	      					<div className="col-lg-12 text-center section-title">
	      						Draw {this.props.result_detail.results && this.props.result_detail.results.length && this.props.result_detail.results[0].draw_id} Statistics
	      					</div>
	      				</div>
	      				<div className="row text-center">
	      					<div className="col-lg-4">
	      						<label>Avg. prize Won</label><br/>
	      						<span class="value">123,123.00</span>
	      					</div>
	      					<div className="col-lg-4">
	      						<label>Above avg. wins</label><br/>
	      						<span class="value">12.11%</span>
	      					</div>
	      					<div className="col-lg-4">
	      						<label>Largest prize Won</label><br/>
	      						<span class="value">123,123,123.00</span>
	      					</div>
	      				</div>
	      			</div>
	      		</section>
	      		<section className="news">
	      			<div class="container">
	      				<h2 className="my-4 text-center uk-lotto-news-title celias section-title">Lotto Winner Stories</h2>
	      				<NewsSliderComponent/>
	      				<div className="row view-more-news text-center mt-5">
							<button className="btn btn-primary bg-blue ml-auto mr-auto">View More...</button>
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
