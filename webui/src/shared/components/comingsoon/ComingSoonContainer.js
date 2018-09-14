import React, { Component } from "react";
import News from "../home/NewsSliderComponent";


class ComingSoonContainer extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
			<div id="coming-soon" className="coming-soon">
				<section className="background-blue space-top coming-soon-content">
	    	 		<div className="container">
			    	 	<div className="row">
			    	 		<div className="col-lg-12">
			    	 			<h2 className="launchingSoon-text text-center text-white">LAUNCHING SOON</h2>
			    	 			<p className="comingSoon-text text-center text-white">
			    	 				This awesome feature is coming soon. <br />
			    	 				Please check back with us shortly. <br />
			    	 				Thank you for your patience.
			    	 			</p>
			    	 		</div>
			    	 	</div>
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

export default ComingSoonContainer;
