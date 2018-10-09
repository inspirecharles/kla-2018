import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";
import SubscriptionComponent from "../subscribe/SubscriptionComponent"

import {fetchNews} from "../../actions/action-news";

class NewsContainer extends Component {
	constructor() {
	    super();
	}

	static initialAction() {
    	return fetchNews();
  	}

   	componentWillMount() {
    	if (!this.props.news || this.props.news.length == 0)
      		this.props.dispatch(NewsContainer.initialAction());
  	}
	
	componentDidMount() {
	 	window.scrollTo(0, 0)
	}

	render() {
	    return (
			<div id="news-list">
				<section className="news-section background-blue space-top">
		    		<div className="container">
			    	 	<div className="row">
			    	 		<div className="col-lg-12">
			    	 			<h1 className="display-5 text-left text-white blog-title">
			    	 				Lottery News
			    	 			</h1>
			    	 			<p className="text-white">
			    	 				Answering the big lottery questions like what happens after you win, who are the biggest lottery winners in history and all the latest changes to your favourite games. <Link className="text-white" to="/">LotteryResults.co.uk</Link> news is the best place to find our what’s happening in the world of UK Lotteries
			    	 			</p>
			    	 		</div>
			    	 	</div>
		      		</div>
	      		</section>

				<section className="all-news">
		    		<div className="container">
		    			<div className="row">
	    					{this.props.news && this.props.news.length && this.props.news.map((news, i)=>{
								return (
		    						<div className="news-container col-lg-12" key={i}>
				    					<div className="media margin-bottom">
											<div className="media-left media-img-container" style={{backgroundImage: 'url('+this.props.env.API_URL+"/uploads/news/"+news.id+"/"+news.feat_img+')'}}>
										  	</div>
										  	<div className="media-body">
										    	<h4 className="media-heading mt-4">{news.title}</h4>
										    	<div className="margin-bottom news-content" dangerouslySetInnerHTML={{__html: news.article}}></div>
										    	<div className="read-more-news">
													<Link to={"/news/"+news.slug}><button className="btn btn-primary blueBtn">Read More...</button></Link>
												</div>
										  	</div>
											
								        </div>
		    						</div>
								)
							})}
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
    	news: state.news,
    	env: state.env
  	}
}

export default withRouter(connect(mapStateToProps)(NewsContainer));
