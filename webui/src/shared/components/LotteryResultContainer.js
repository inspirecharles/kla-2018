import React, { Component } from "react";
import ComingSoon from "./ComingSoonContainer"
import News from "./home/NewsSliderComponent"

class LotteryResultContainer extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
			<div id="lottery-result" className="comingSoon-container">
	    	 	<section className="results background-blue space-top">
	    	 		<div className="container">
	    	 			<ComingSoon/>
	    	 		</div>
	    	 	</section>
	    	 	<section className="news">
	    	 		<div className="container">
						<div className="uk-lotto-news-wrapper">
							<h2 className="my-4 text-center uk-lotto-news-title celias">Latest UK Lotto News</h2>
							<News/>
						    <div className="row view-more-news">
								<button className="btn btn-primary bg-blue">View More...</button>
							</div>
						</div>
					</div>
	    	 	</section>
	    	 	<section>
	    	 		<div className="subscribe-wrapper">
						<div className="container">
							<div className="subscribe-container">
								<div className="row">
									<div className="media-body subscribe-body col-lg-6 col-md-12">
										<h3 className="media-heading subscribe-heading celias text-white">Lottery Results in Your Inbox</h3>
										<p className="subscribe-content text-white">
											Get the latest UK lottery results direct to your email and never miss your lucky numbers!
										</p>
									</div>
									<div className="media-body subscribe-body right col-lg-6 col-md-12 subscribe">
										<div className="single">
											<div className="input-group">
									         <input type="email" className="form-control" placeholder="youremail@email.com" />
										        <span className="input-group-btn">
										        	<button className="btn btn-theme btn-subscribe" type="submit">Subscribe</button>
									         	</span>
									        </div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
	    	 	</section>
      		</div>
	    );
	}
	
}

export default LotteryResultContainer;
