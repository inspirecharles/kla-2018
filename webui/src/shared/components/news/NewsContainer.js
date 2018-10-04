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
			    	 				All News
			    	 			</h1>
			    	 			<p className="text-white">
			    	 				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc commodo pulvinar sapien ut hendrerit. Ut eros mi, tristique facilisis nibh quis, pretium laoreet velit. Suspendisse potenti. Duis quis nibh ac ante aliquam varius. Nulla varius risus orci, in scelerisque odio aliquet eget. Nam consequat justo diam, id finibus nunc ullamcorper at. Aliquam volutpat ante ante, nec rutrum odio placerat quis. Vivamus semper blandit ex quis lacinia. Vivamus non consectetur quam, id gravida mi. Sed in porta nisl.
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
											<div className="media-left media-img-container" style={{background: 'url('+this.props.env.API_URL+"/uploads/news/"+news.id+"/"+news.feat_img+')'}}>
											    <Link to={"/news/"+news.slug} >
											      <img className="img-fluid media-img" src={this.props.env.API_URL+"/uploads/news/"+news.id+"/"+news.feat_img} />
											    </Link>
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
