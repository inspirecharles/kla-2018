import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";

import {renderDividends, formatMoney} from "../helper";
import UKResult from "./variants/uk/ResultComponent";
import NewsSliderComponent from "./home/NewsSliderComponent"
import SubscriptionComponent from "./subscribe/SubscriptionComponent"
import {fetchResultByGameAndDrawId, emptyResultDetail} from "../actions/action-result-detail";

class ResultContainer extends Component {
	constructor(props) {
	    super(props);

    	this.renderResult = this.renderResult.bind(this);

    	this.getStat = this.getStat.bind(this);
	}

	static initialAction(game_slug = null, draw_id=null) {
					
    	return fetchResultByGameAndDrawId(game_slug, draw_id);
  	}

	componentWillMount(){
      	this.props.dispatch(ResultContainer.initialAction( this.props.match.params.game_slug.replace("-", "_"), this.props.match.params.draw_id.replace("draw-","") ));
	}

	componentDidMount() {
	 	window.scrollTo(0, 0)
	}

	componentWillUnmount(){
		this.props.dispatch(emptyResultDetail());
	}

	renderResult(){
		if( this.props.result_detail.variant == "uk" )
			return <UKResult game={this.props.result_detail} hideViewPrizes={true} />
	}

	getStat(){
		return JSON.parse(this.props.result_detail && this.props.result_detail.results.length && this.props.result_detail.results[0].stats);
	}

	render() {
		let firstStat='';
		let secondStat='';
		let thirdStat='';
		let firstValue = '';
		let secondValue = '';
		let thirdValue = '';
		if(this.props.result_detail.results && this.props.result_detail.results.length){
			if(this.props.result_detail && this.props.result_detail.slug == "health_lottery"){
					firstStat = "£\'s RAISED";
					secondStat= "£\'s WON";
					thirdStat ='WINNERS';
					firstValue = '58 MILLION';
					secondValue = '87 MILLION';
					thirdValue = '3 MILLION';
			}else if(this.props.result_detail && (this.props.result_detail.slug == "postcode_daily" ||this.props.result_detail.slug == "postcode_weekly" ||this.props.result_detail.slug == "postcode_monthly")){
					firstStat = 'Amount Raised for Charity so far';
					secondStat='Number of Players';
					thirdStat ='% of Sub given to charity';
					firstValue = '$255M';
					secondValue = '2.4M';
					thirdValue = '31%';
			}else{
					firstStat = 'Avg. prize Won';
					secondStat='Above avg. wins';
					thirdStat ='Largest prize Won';
					firstValue = "£ " +formatMoney(this.getStat().AveragePrizeWon);
					secondValue = this.getStat().AboveAverageWins+" %";
					thirdValue = "£ " +formatMoney(this.getStat().LargestPrizeWon);
			}
		}

	    return (
			<div id="result-detail">
	    		<section className={"detail game_result "+" "+this.props.result_detail.slug+" "+(this.props.result_detail.slug && this.props.result_detail.slug.includes('postcode')?'postcode':'')}>
	    			<div className="container">
			    	 	<div className="row">
				    		<div className="col-lg-12">
				    			<h1 className="display-5 text-left text-white mt-4 latest-title">Latest {this.props.result_detail && this.props.result_detail.name} Results - Draw {this.props.result_detail.results && this.props.result_detail.results.length && this.props.result_detail.results[0].draw_id}</h1>
				    		</div>
				    	</div>
			    		<div className="detail-content col-lg-12 mt-3">
			    			<div className="row">
			    				<div className="lotto-game-logo">
				    				<img className={"img-fluid game-logo "+this.props.result_detail.variant+"-logo-lotto game-"+this.props.result_detail.slug} src={"/img/variants/"+this.props.result_detail.variant+"/"+this.props.result_detail.slug+".png"} />
			    				</div>
			    				<div className="game-prize-date text-right">
			    					<span className="current-jackpot">{this.props.result_detail.results && this.props.result_detail.results.length && "£ " + formatMoney(this.props.result_detail.results[0].current_jackpot)}</span><br/>
				    				<span>{this.props.result_detail.results && this.props.result_detail.results.length && moment(this.props.result_detail.results[0].draw_date).format('dddd DD MMMM YYYY')}</span>
			    				</div>
			    			</div>
			    			<div className="row mt-3">
				    			<div className="col-lg-5">
				    				{ this.props.result_detail && this.props.result_detail.results && this.props.result_detail.results.length && this.renderResult() }
				    				<div className="next-draw">
				    					<div>Next Draw</div>
				    					<div>{this.props.result_detail.results && this.props.result_detail.results.length && "£ " + formatMoney(this.props.result_detail.results[0].next_jackpot)}</div>
				    					<div className="text-center mt-3">
				    						<Link to={"/buy-now"}><button className="btn">Buy Now</button></Link>				    					</div>
				    				</div>
				    			</div>
				    			<div className="col-lg-7">
				    				{ this.props.result_detail.results && this.props.result_detail.results.length && renderDividends(this.props.result_detail.results[0].dividends, this.props.result_detail.slug == "49lottery"?'chance_to_win':'lotto_dividends') }
				    			</div>
			    			</div>
			    		</div>
		    		</div>
	      		</section>
	      		<section className="view-past-result">
	      			<div className="container text-center pt-3 pb-3">
	      				<span>View Past {this.props.result_detail && this.props.result_detail.name} Draw Results</span>
	      				<Link to={"/results/"+(this.props.result_detail && this.props.result_detail.slug)}><button className="btn ml-5">Past Draws</button></Link>
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
	      					<div className="col-lg-6 video-container">
	      						<iframe 
	      							className="video" 
	      							src={ this.props.result_detail.results && this.props.result_detail.results[0].video_link+"?modestbranding=1&autohide=1&showinfo=0&controls=0"} 
	      							frameBorder="0" 
	      							allow="autoplay; encrypted-media" 
	      							allowFullScreen={false}>
	      						</iframe>
	      					</div>
	      				</div>
	      			</div>
	      		</section>
	      		<section className="draw-statistics">
	      			<div className="container">
	      				<div className="row">
	      					<div className="col-lg-12 text-center section-title margin-bottom">
	      						Draw {this.props.result_detail.results && this.props.result_detail.results.length && this.props.result_detail.results[0].draw_id} Statistics
	      					</div>
	      				</div>	      			
	      				<div className="row text-center">
	      					<div className="col-lg-4 margin-bottom">
	      						<label>{firstStat}</label><br/>
	      						<span className="value">{firstValue}</span>
	      					</div>
	      					<div className="col-lg-4 margin-bottom">
	      						<label>{secondStat}</label><br/>
	      						<span className="value">{secondValue}</span>
	      					</div>
	      					<div className="col-lg-4 margin-bottom">
	      						<label>{thirdStat}</label><br/>
	      						<span className="value">{thirdValue}</span>
	      					</div>
	      				</div>
	      			</div>
	      		</section>
	      		<section className="news">
	      			<div className="container">
	      				<h2 className="text-center uk-lotto-news-title celias section-title">Lotto Winner Stories</h2>
	      				<NewsSliderComponent/>
	      				<div className="row view-more-news text-center mt-5">
							<Link to={"/news"} className="ml-auto mr-auto"><button className="btn btn-primary blueBtn">View More...</button></Link>
						</div>
	      			</div>
	      		</section>

	      		<section>
					<div className="subscribe-wrapper">
						<div className="container">
							<div className="subscribe-container">
								<SubscriptionComponent/>							
							</div>
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
