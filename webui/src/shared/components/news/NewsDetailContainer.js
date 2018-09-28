import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";

import {fetchNewsBySlug} from "../../actions/action-news";
import SubscriptionComponent from "../subscribe/SubscriptionComponent"

class NewsDetailContainer extends Component {
	constructor(props) {
	    super(props);
	}

	static initialAction( slug = null ) {
    	return fetchNewsBySlug( slug );
  	}

	componentWillMount() {
      	this.props.dispatch(NewsDetailContainer.initialAction( this.props.match.params.slug ));
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
			    	 				{ this.props.news_detail && this.props.news_detail.title }
			    	 			</h1>
			    	 		</div>
			    	 	</div>
		      		</div>
	      		</section>

	      		<section className="news-contentDetail">
	      			<div className="row">
	      				<div className="col-lg-12">
	      					<div className="container">
					    	 	<div className="row">
					    	 		<div className="col-lg-12 news-image">
					    	 			<header className="bg-image-full">
									    	<img className="bg-image-full" src={this.props.news_detail && this.props.news_detail.id && this.props.env.API_URL+"/uploads/news/"+this.props.news_detail.id+"/"+this.props.news_detail.feat_img} />
									    </header>
					    	 		</div>
					    	 		<div className="col-lg-12 news-content" dangerouslySetInnerHTML={{__html: this.props.news_detail && this.props.news_detail.id && this.props.news_detail.article}}>
										
							        </div>
					    	 	</div>
				      		</div>
	      				</div>
	      			</div>
	      		</section>

	      		<section className="subscription-component">
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
    	news_detail: state.news_detail,
    	env: state.env
  	}
}

export default withRouter(connect(mapStateToProps)(NewsDetailContainer));