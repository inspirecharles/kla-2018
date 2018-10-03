import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";

import {renderDividends, formatMoney, createGameUrlSlug, buyNowUrl} from "../helper";
import UKResult from "./variants/uk/ResultComponent";
import NewsSliderComponent from "./home/NewsSliderComponent"
import SubscriptionComponent from "./subscribe/SubscriptionComponent"
import ExportComponent from "./utilities/ExportComponent";
import PrintComponent from "./utilities/PrintComponent";

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
		let current_jackpot = '';
		let next_jackpot = '';

		if(this.props.result_detail.results && this.props.result_detail.results.length){
			/*
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
			}*/
				
			switch(this.props.result_detail.slug) {
		    case '49lottery':
			   		firstStat = 'Avg. prize Won';
					secondStat='Above avg. wins';
					thirdStat ='Largest prize Won';
					firstValue = "£ " +formatMoney(this.getStat().AveragePrizeWon);
					secondValue = this.getStat().AboveAverageWins+" %";
					thirdValue = "£ " +formatMoney(this.getStat().LargestPrizeWon);
					current_jackpot =  "Min £25,000 or 10% of sales";
					next_jackpot = "Min £25,000 or 10% of sales";
			        break;
		    case 'postcode_daily':		   		
		    case 'postcode_weekly':		   		
		    case 'postcode_monthly' :
		   			firstStat = 'Amount Raised for Charity so far';
					secondStat='Number of Players';
					thirdStat ='% of Sub given to charity';
					firstValue = '$255M';
					secondValue = '2.4M';
					thirdValue = '31%';
					current_jackpot =  "£ " + formatMoney(this.props.result_detail.results[0].current_jackpot);
					next_jackpot = "£ " + formatMoney(this.props.result_detail.results[0].next_jackpot);
		        break;
		    case 'health_lottery':
		   			firstStat = "£\'s RAISED";
					secondStat= "£\'s WON";
					thirdStat ='WINNERS';
					firstValue = '58 MILLION';
					secondValue = '87 MILLION';
					thirdValue = '3 MILLION';
					current_jackpot =  "Min £25,000 or 10% of sales";
					next_jackpot = "Min £25,000 or 10% of sales";	
		        break;
		    default:
		    		firstStat = 'Avg. prize Won';
					secondStat='Above avg. wins';
					thirdStat ='Largest prize Won';
					firstValue = "£ " +formatMoney(this.getStat().AveragePrizeWon);
					secondValue = this.getStat().AboveAverageWins+" %";
					thirdValue = "£ " +formatMoney(this.getStat().LargestPrizeWon);
					current_jackpot =  "£ " + formatMoney(this.props.result_detail.results[0].current_jackpot);
					next_jackpot = "£ " + formatMoney(this.props.result_detail.results[0].next_jackpot);
		         break;
			} 
		}

		


	    return (
			<div id="result-detail">
	    		<section id={this.props.result_detail.slug+"-container"} className={"detail game_result "+" "+this.props.result_detail.slug+" "+(this.props.result_detail.slug && this.props.result_detail.slug.includes('postcode')?'postcode':'')}>
	    			<div className="container">
			    	 	<div className="row">
				    		<div className="col-lg-12">
				    			<h1 className="display-5 text-left text-white mt-4 latest-title">Latest {this.props.result_detail && this.props.result_detail.name} Results - Draw {this.props.result_detail.results && this.props.result_detail.results.length && this.props.result_detail.results[0].draw_id}</h1>
				    		</div>
				    	</div>
			    		<div id="detail-content" className="detail-content col-lg-12 mt-3">
			    			<div className="row">
			    				<div className="lotto-game-logo">
				    				<img className={"img-fluid game-logo "+this.props.result_detail.variant+"-logo-lotto game-"+this.props.result_detail.slug} src={"/img/variants/"+this.props.result_detail.variant+"/"+this.props.result_detail.slug+".png"} />
			    				</div>
			    				<div className="game-prize-date text-right">
			    					<div className="supp-link-icons">
					    				<PrintComponent elem={this.props.result_detail.slug+"-container"} />
		                            	<ExportComponent game={this.props.result_detail.slug} draw_id={this.props.result_detail.results && this.props.result_detail.results[0] && this.props.result_detail.results[0].draw_id} />
	                            	</div>
			    					<span className="current-jackpot">{current_jackpot}</span><br/>
				    				<span>{this.props.result_detail.results && this.props.result_detail.results.length && "Draw "+this.props.result_detail.results[0].draw_id+" - "+moment(this.props.result_detail.results[0].draw_date).format('dddd DD MMMM YYYY')}</span>
			    				</div>
			    			</div>
			    			<div className="row mt-3">
				    			<div className="col-lg-5">
				    				{ this.props.result_detail && this.props.result_detail.results && this.props.result_detail.results.length && this.renderResult() }
				    				<div className="next-draw">
				    					<div>Next Draw</div>
				    					<div>{next_jackpot}</div>
				    					<div className="text-center mt-3">
				    						<a href={buyNowUrl(this.props.result_detail && this.props.result_detail.slug)} target="_blank"><button className="btn">Buy Now</button></a>
				    					</div>
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
	      				<Link to={"/"+(this.props.result_detail && this.props.result_detail.slug && createGameUrlSlug(this.props.result_detail.slug))+"/results"}><button className="btn ml-5">Past Draws</button></Link>
	      			</div>
	      		</section>
	      		<section className="result-video">
	      			<div className="container">
	      				<div className="row">
	      					<div className="col-lg-6" dangerouslySetInnerHTML={{ __html: this.props.result_detail && this.props.result_detail.description }}>
	      						
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
