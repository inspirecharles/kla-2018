import React, { Component } from "react"; 
import {bindActionCreators} from "redux";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import HomeCardComponent from "./home/HomeCardComponent"


import {updateGames} from "../actions/action-games";


class HomeContainer extends Component { 
	constructor() { 
		super();
	}

	componentWillMount(){
	    this.props.updateGames();
	}

	render() {
		return (
			<div>
				<div className="result-container">
				    <div className="container">
				    	<div className="row">
				    		<div className="col-lg-12">
				    			<h3 className="display-5 text-left text-white mt-4 latest-title">Latest UK Lottery Results.</h3>
				    		</div>
				    	</div>
				        <div className="row">
						    {[...Array(6)].map((x, i) =>  {
						    		var show = (i == 0 || i == 1)?true:false;
							    	return <HomeCardComponent key={i} show={show} name={"card"+i}/>
						    	}
						  	)}
				        </div>
				    </div>
				</div>

				<div className="container">
					<div className="media-1">
						<div className="row my-4">
							<div className="col-lg-6">
								<h4 className="media-heading">The UK&#39;s Home of Lottery Results Online</h4>
								<p className="media-content">
									Lotto Results UK is the only place to get up to date results for all your 
									favourite UK lotteries, raffles and draws. With our simple design and clear 
									lotto results, you can easily check your lottery numbers, tickets and even the prize winnings. 
									Look back at past lottery draw results or check your ticket to see if you could be a winner.
								</p>
								<p className="media-content">
									We bring you the latest on the UKs biggest lotteries from the National Lottery and more – 
									including Lotto, Lotto Hotpicks, Euro Millions, Thunderball, People’s Postcode Lottery and the 
									Health Lottery! 
								</p>
								<p className="media-content">
									We have regular Lottery News updates to give you the inside scoop on the games and winners. 
									Discover the upcoming jackpot amounts, special promotions, and lottery winner’s stories. 
									Could you be the next big winner? Find out now with the latest results at Lottery Results UK.  

								</p>
					        </div>
							<div className="col-lg-6">
					        	<img className="img-fluid media-img hidden-md" src="../../img/girl_laptop.jpg" />
					        </div>
					        
						</div>
					</div>	
				</div>

				<div className="notification-wrapper">
					<div className="container">
						<div className="media getNotified-container">
							<div className="row">
							
								<div className="media-body col-lg-8">
									<h4 className="media-heading notif-heading text-white">Draw Results Direct to Your Phone.</h4>
									<p className="notif-content text-white">
										Never miss the winning numbers! Get push notification over time UK lotto results are available for all your favorite lotteries.
									</p>
								</div>
								<div className="media-right notif-button col-lg-4">
									<button type="button" className="btn btn-light">Get Notified</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="uk-lotto-news-wrapper">
						<h1 className="my-4 text-center">Latest UK Lotto News
					    </h1>

					    <div className="row">
							<div className="col-lg-4 col-sm-6 portfolio-item">
								<div className="card h-100">
									<a href="#"><img className="card-img-top" src="../../img/girl_laptop.jpg" /></a>

									<div className="card-body">
										<h4 className="card-title">
											<a href="#">Wow... What a Blog Title!</a>
										</h4>
										<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-sm-6 portfolio-item">
								<div className="card h-100">
									<a href="#"><img className="card-img-top" src="../../img/girl_laptop.jpg" /></a>

									<div className="card-body">
										<h4 className="card-title">
											<a href="#">Wow... What a Blog Title!</a>
										</h4>
										<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
									</div>
								</div>
							</div>

							<div className="col-lg-4 col-sm-6 portfolio-item">
								<div className="card h-100">
									<a href="#"><img className="card-img-top" src="../../img/girl_laptop.jpg" /></a>

									<div className="card-body">
										<h4 className="card-title">
											<a href="#">Wow... What a Blog Title!</a>
										</h4>
										<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
									</div>
								</div>
							</div>
					    </div>

					    <div className="row view-more-news">
							<button className="btn btn-primary">View More...</button>
						</div>
					</div>
				</div>

				<div className="subscribe-wrapper">
					<div className="container">
						<div className="subscribe-container">
							<div className="row">
							
								<div className="media-body subscribe-body col-lg-6">
									<h4 className="media-heading subscribe-heading text-white">Lottery Results in Your Inbox</h4>
									<p className="subscribe-content text-white">
										Get the latest UK lottery results direct to your email and never miss your lucky numbers!
									</p>
								</div>
								<div className="media-body subscribe-body right col-lg-6 subscribe">
									<div className="single">
										<div className="input-group">
								         <input type="email" className="form-control" placeholder="youremail@email.com" />
									        <span className="input-group-btn">
									        	<button className="btn btn-theme" type="submit">Subscribe</button>
								         	</span>
								        </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>

		); 
	} 

}


function mapStateToProps(state){
  	return {
    	games: state.games
  	}
}

function matchDispatchToProps(dispatch){
  	return bindActionCreators({
    	updateGames: updateGames
  	}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(HomeContainer));