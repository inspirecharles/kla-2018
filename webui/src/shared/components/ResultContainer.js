import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";

import {renderDividends, formatMoney, createGameUrlSlug} from "../helper";
import UKResult from "./variants/uk/ResultComponent";
import NewsSliderComponent from "./home/NewsSliderComponent"
import StatComponent from "./results/StatComponent"
import SubscriptionComponent from "./subscribe/SubscriptionComponent"
import ExportComponent from "./utilities/ExportComponent";
import PrintComponent from "./utilities/PrintComponent";

import {fetchResultByGame, emptyResultDetail} from "../actions/action-result-detail";

class ResultContainer extends Component {
	constructor(props) {
	    super(props);

    	this.renderResult = this.renderResult.bind(this);

    	this.getStat = this.getStat.bind(this);
	}

	static initialAction(game_slug = null) {
					
    	return fetchResultByGame(game_slug);
  	}

	componentWillMount(){
      	this.props.dispatch(ResultContainer.initialAction( this.props.match.params.game_slug.replace("-", "_") ));
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
			    					<span className="current-jackpot">{this.props.result_detail.results && this.props.result_detail.results.length && this.props.result_detail.results[0].current_jackpot}</span><br/>
				    				<span>{this.props.result_detail.results && this.props.result_detail.results.length && "Draw "+this.props.result_detail.results[0].draw_id+" - "+moment(this.props.result_detail.results[0].draw_date).format('ddd DD MMMM YYYY')}</span>
			    				</div>
			    			</div>
			    			<div className="row mt-3">
				    			<div className="col-lg-5">
				    				{ this.props.result_detail && this.props.result_detail.results && this.props.result_detail.results.length && this.renderResult() }

			    					<div className="supp-link-icons">
					    				<PrintComponent elem={this.props.result_detail.slug+"-container"} />
		                            	<ExportComponent game={this.props.result_detail.slug} draw_id={this.props.result_detail.results && this.props.result_detail.results[0] && this.props.result_detail.results[0].draw_id} />
	                            	</div>
				    				<div className="next-draw">
				    					<div>Next Draw</div>
				    					<div>{this.props.result_detail.results && this.props.result_detail.results.length && this.props.result_detail.results[0].current_jackpot}</div>
				    					<div className="text-center mt-3">
				    						<a href={this.props.result_detail && this.props.result_detail.buy_url} target="_blank"><button className="btn">Buy Now</button></a>
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
	      		<StatComponent />
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
