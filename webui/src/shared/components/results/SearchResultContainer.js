import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";

import {renderDividends, formatMoney, createGameUrlSlug} from "../../helper";
import UKResult from "../variants/uk/ResultComponent";
import NewsSliderComponent from "../home/NewsSliderComponent";
import SubscriptionComponent from "../subscribe/SubscriptionComponent";
import StatComponent from "./StatComponent";

import {fetchResultByGameAndDrawId, fetchResultByGame, emptyResultDetail, searchResult} from "../../actions/action-result-detail";

class SearchResultContainer extends Component {
	constructor(props, context) {
	    super(props, context);

    	this.renderResult = this.renderResult.bind(this);

    	this.getStat = this.getStat.bind(this);

    	this.state = {
    		search_number: '',
    		search_date: '',
    	}

    	this.handleChange = this.handleChange.bind(this);
    	this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
	}

	static initialAction(game_slug = null, draw_id = null ) {
		if( draw_id )
    		return fetchResultByGameAndDrawId(game_slug, draw_id);
    	else
    		return fetchResultByGame(game_slug);
  	}

	componentWillMount(){
      	this.props.dispatch(SearchResultContainer.initialAction( this.props.match.params.game_slug.replace("-", "_"), (this.props.match.params.draw_id && this.props.match.params.draw_id.replace("draw-", "")) || null ));
	}

	componentDidMount() {
	 	window.scrollTo(0, 0)
	}

	componentWillUnmount(){
		this.props.dispatch(emptyResultDetail());
	}

	componentDidUpdate (nextProps){
		if( nextProps.location.pathname != this.props.location.pathname )
			this.props.dispatch(SearchResultContainer.initialAction( this.props.match.params.game_slug.replace("-", "_"), (this.props.match.params.draw_id && this.props.match.params.draw_id.replace("draw-", "")) || null ));
	}

	renderResult(){
		if( this.props.result_detail.variant == "uk" )
			return <UKResult game={this.props.result_detail} hideViewPrizes={true} />
	}

	getStat(){
		return JSON.parse(this.props.result_detail && this.props.result_detail.results.length && this.props.result_detail.results[0].stats);
	}

	handleChange(event) {
	    this.setState({...this.state, [event.target.name]:event.target.value})
	}

	handleSearchSubmit(event){
		event.preventDefault();
		var self = this;
		//this.props.dispatch(searchResult(this.props.result_detail.slug, this.state))
		fetch(this.props.env.API_URL+"/results/search?game_slug="+this.props.result_detail.slug+"&search_data="+JSON.stringify(this.state))
	    .then(response => response.json())
	    .then(result => {
	    	if( !result.type ){
	    		console.log(result);
	    		self.props.history.push('/'+createGameUrlSlug(this.props.result_detail.slug)+'/results/draw-'+result.results[0].draw_id);
	    		//window.location = '/'+this.props.result_detail.slug+'/results/draw-'+result.results[0].draw_id
	    	}else
	    		alert('no result found.')
	    })
	    .catch(err => {
	    	console.log(err);
	    });
	}

	render() {
	    return (
			<div id="result-detail">
	    		<section className={"detail game_result "+" "+this.props.result_detail.slug+" "+(this.props.result_detail.slug && this.props.result_detail.slug.includes('postcode')?'postcode':'')}>
	    			<div className="container">
			    	 	<div className="row">
				    		<div className="result-title">
				    			<h1 className="display-5 text-left text-white latest-title">Past Lottery Results</h1>
				    		</div>
				    	</div>
			    		<div className="detail-content col-lg-12 mt-3">
			    			<div className="row">
			    				<div className="lotto-game-logo">
				    				<img className={"img-fluid game-logo "+this.props.result_detail.variant+"-logo-lotto game-"+this.props.result_detail.slug} src={"/img/variants/"+this.props.result_detail.variant+"/"+this.props.result_detail.slug+".png"} />
			    				</div>
			    				<div className="change-lottery">
									<Link to={"/results"}><button className="btn btn-primary blueBtn change-btn">CHANGE LOTTERY</button></Link>
								</div>
			    				<div className="game-prize-date">
			    					<div className="game-prize-wrap">
			    						<span className="current-jackpot">{this.props.result_detail.results && this.props.result_detail.results.length && "£ " + formatMoney(this.props.result_detail.results[0].current_jackpot)}</span><br/>
				    				<span>{this.props.result_detail.results && this.props.result_detail.results.length && "Draw "+this.props.result_detail.results[0].draw_id+" - "+moment(this.props.result_detail.results[0].draw_date).format('ddd DD MMMM YYYY')}</span>
			    					</div>

				    				<div className="arrows">
				    					<div className="arrow-prev">
				    						{this.props.result_detail && this.props.result_detail.prev_draw > 0 &&
						    					<Link rel="next" to={'/'+createGameUrlSlug(this.props.result_detail.slug)+'/results/draw-'+this.props.result_detail.prev_draw}><span className="arrow-prev"><i class="fa fa-angle-double-left"></i>Prev</span></Link>
						    				}
				    					</div>
					    				<div className="arrow-next">
					    					{this.props.result_detail && this.props.result_detail.next_draw > 0 &&
					    					<Link rel="prev" to={'/'+createGameUrlSlug(this.props.result_detail.slug)+'/results/draw-'+this.props.result_detail.next_draw}><span className="arrow-next">Next<i class="fa fa-angle-double-right"></i></span></Link>
					    				}
					    				</div>
				    				</div>
			    				</div>
			    			</div>
			    			<div className="row mt-3">
				    			<div className="col-lg-5">
				    				{ this.props.result_detail && this.props.result_detail.results && this.props.result_detail.results.length && this.renderResult() }
				    				<div className="next-draw">
				    					<h3>Step2 - Select A Draw</h3>
				    					<form onSubmit={this.handleSearchSubmit}>
					    					<input type="text" className="form-control" placeholder="Draw Number" name="search_number" onChange={this.handleChange} value={this.state.search_number} />
					    					<span>or</span>
					    					<input type="date" className="form-control" placeholder="Draw Date" name="search_date" onChange={this.handleChange} value={this.state.search_date} />
				    						<button type="submit" className="btn btn-primary blueBtn find-result">FIND RESULTS</button>
				    					</form>
				    				</div>
				    			</div>
				    			<div className="col-lg-7">
				    				{ this.props.result_detail.results && this.props.result_detail.results.length && renderDividends(this.props.result_detail.results[0].dividends, this.props.result_detail.slug == "49lottery"?'chance_to_win':'lotto_dividends') }
				    			</div>
			    			</div>
			    		</div>
		    		</div>
	      		</section>
	      		<StatComponent/>
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
    	result_detail: state.result_detail,
    	env: state.env
  	}
}

export default withRouter(connect(mapStateToProps)(SearchResultContainer));
