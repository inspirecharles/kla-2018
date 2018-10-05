import React, { Component } from "react";
import NewsSliderComponent from "./home/NewsSliderComponent";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";

import {fetchGames} from "../actions/action-games"
import {createGameUrlSlug} from "../helper"

class LotteryResultContainer extends Component {
	constructor() {
	    super();
	}

	static initialAction() {
    	return fetchGames();
  	}

   	componentWillMount() {
    	if (!this.props.games_only || this.props.games_only.length == 0)
      		this.props.dispatch(LotteryResultContainer.initialAction());
  	}
	
	componentDidMount() {
	 	window.scrollTo(0, 0)
	}

	render() {
	    return (
			<div id="lottery-result">
	    	 	<section className="background-blue space-top">
	    	 		<div className="container">
	    	 			<div className="row">
				    		<div className="col-lg-12">
				    			<h1 className="text-left text-white latest-title margin-bottom">Past Lottery Results</h1>
				    		</div>
				    	</div>
	    	 		</div>
	    	 	</section>
	    	 	<section className="all-news">
	    	 		<div className="container">
	    	 			<h3 className="step-textTitle">Step 1 - Select a Lottery</h3>
	    	 			<div className="row">

	    	 				{this.props.games_only.length && this.props.games_only.map((game, i) =>  {
						    		return (
						    			<div className="col-xs-6 lottery-container">
					    					<Link to={"/"+createGameUrlSlug(game.slug)+"/results"} key={i}>
											    <div className="lottery">
											    	<img className={"img-responsive sluggame-logo "+game.variant+"-logo-lotto game-"+game.slug} src={"/img/variants/"+game.variant+"/"+game.slug+".png"} />
											    </div>
											</Link>
										</div>
						    		);
						    	}
						  	)}
						</div>
	    	 		</div>
	    	 	</section>

	    	 	<section className="articles-section">
					<div className="container">
						<div className="uk-lotto-news-wrapper">
							<h2 className="text-center uk-lotto-news-title celias">Latest UK Lotto News</h2>
							<NewsSliderComponent/>
						    <div className="row view-more-news">
								<Link to={"/news"}><button className="btn btn-primary blueBtn">View More...</button></Link>
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
    	games_only: state.games_only
  	}
}

export default withRouter(connect(mapStateToProps)(LotteryResultContainer));