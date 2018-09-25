import React, { Component } from "react";

class NewsDetailContainer extends Component {
	constructor() {
	    super();
	}
	
	componentDidMount() {
	 	window.scrollTo(0, 0)
	}

	render() {
	    return (
			<div id="news-detail">
				<section className="news-section background-blue space-top">
		    		<div className="container">
			    	 	<div className="row">
			    	 		<div className="col-lg-12">
			    	 			<h1 className="display-5 text-left text-white blog-title">
			    	 				Wow... What a Blog Title 
			    	 			</h1>
			    	 		</div>
			    	 	</div>
		      		</div>
	      		</section>

	      		<section>
	      			<div className="row">
	      				<div className="col-lg-12">
	      					<div className="container">
					    	 	<div className="row">
					    	 		<div className="col-lg-12">
					    	 			<header className="bg-image-full">
									    	<a href="#"><img className="bg-image-full" src="/img/car-photo.png" /></a>
									    </header>
					    	 		</div>
					    	 	</div>
				      		</div>
	      				</div>
	      			</div>
	      		</section>

	      		<section>
	      			<div className="row">
	      				<div className="col-lg-12">
	      					<div className="container">
					    	 	<div className="row">
					    	 		<div className="col-lg-12">
					    	 			<section className="lottery-content">
											<div className="container">
												<div className="media-1">
													<div className="row">
														<div className="col-lg-12">
															<h2 className="media-heading celias">An Awesome Subtitle</h2>
															<p className="media-content">
																Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
																Proin erat risus, molestie ullamcorper ex at, porta sollicitudin nisl. 
																Proin varius maximus neque. Fusce sollicitudin placerat purus, 
																ut vestibulum magna ornare aliquam. Suspendisse placerat feugiat gravida. 
																Fusce eget venenatis urna. Class aptent taciti sociosqu ad litora 
																torquent per conubia nostra, per inceptos himenaeos. 
																Aenean sit amet mi ut lorem egestas volutpat at vel ante. 
																Pellentesque sit amet augue commodo, pulvinar odio eget, 
																condimentum nunc. Phasellus vestibulum arcu ac nisl semper, nec eleifend diam imperdiet.
															</p>
															<p className="media-content">
																Phasellus volutpat rhoncus enim, eleifend feugiat risus imperdiet sit amet. 
																Quisque odio tellus, consequat id ornare eu, congue et augue. 
																Duis blandit eget libero quis ultricies. Proin sodales, 
																neque sed varius bibendum, massa massa euismod magna, vitae aliquet
																turpis ipsum vel eros. Vestibulum semper, sapien aliquet volutpat ullamcorper, 
																diam massa mollis risus, et convallis tellus justo nec nunc. Sed pulvinar, massa sed 
																facilisis iaculis, massa lorem sagittis ipsum, id lobortis leo ligula ut nibh.
															</p>
															<p className="media-content">
																Mauris ornare sapien velit, nec varius felis placerat at. 
																Vestibulum quis felis pharetra, tempor sapien vel, venenatis dui. 
																Nullam nec dui et nisl tincidunt sollicitudin. Integer eros turpis, 
																posuere non fringilla non, gravida nec lacus. Pellentesque et felis mollis, 
																egestas neque eu, consectetur odio. In euismod non dui at feugiat.
															</p>

															<h2 className="media-heading celias">Whats this? Another Subtitle</h2>
															<p className="media-content">
																Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
																Proin erat risus, molestie ullamcorper ex at, porta sollicitudin nisl. 
																Proin varius maximus neque. Fusce sollicitudin placerat purus, 
																ut vestibulum magna ornare aliquam. Suspendisse placerat feugiat gravida. 
																Fusce eget venenatis urna. Class aptent taciti sociosqu ad litora 
																torquent per conubia nostra, per inceptos himenaeos. 
																Aenean sit amet mi ut lorem egestas volutpat at vel ante. 
																Pellentesque sit amet augue commodo, pulvinar odio eget, 
																condimentum nunc. Phasellus vestibulum arcu ac nisl semper, nec eleifend diam imperdiet.
															</p>
												        </div>
												        
													</div>
												</div>	
											</div>
										</section>
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

export default NewsDetailContainer;
