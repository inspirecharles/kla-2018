import React, { Component } from "react";
import News from "./home/NewsSliderComponent";
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
	    	 	<section className="lotteries background-blue space-top">
	    	 		<div className="container">
	    	 			<div className="row">
				    		<div className="col-lg-12">
				    			<h1 className="display-5 text-left text-white mt-4 latest-title">Past Lottery Result</h1>
				    		</div>
				    	</div>
				        <div className="row mt-3">
				        	<div className="col-lg-12 lottery-container">
				        		<h3>Step 1 - Select a Lottery</h3>
							    {this.props.games_only.length && this.props.games_only.map((game, i) =>  {
							    		return (
							    			<Link to={"/"+createGameUrlSlug(game.slug)+"/results"} key={i}>
							    				<div className="lottery">
							    					<img className={"img-fluid "+game.variant+"-logo-lotto game-"+game.slug} src={"/img/variants/"+game.variant+"/"+game.slug+".png"} />
							    				</div>
							    			</Link>
							    		);
							    	}
							  	)}
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