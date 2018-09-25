import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";

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
			<div id="news-list" className="background-blue">
				<section>
		    		<div className="container space-top">
		    			<div className="row">
			    	 	{this.props.news && this.props.news.map((news, i)=>{
				        	return (
				        		<div key={i} className="col-lg-4 mt-4">
				        			<Link to={"/news/"+news.slug}>
										<div className="card h-100">
											<div className="featured-image" style={{"background-image": "url('"+this.props.env.API_URL+"/uploads/news/"+news.id+"/"+news.feat_img+"')"}}></div>
											<div className="card-body">
												<h3 className="card-title blog-title celias">{news.title}</h3>
												<div className="card-text blog-text" dangerouslySetInnerHTML={{__html: news.article}}></div>
											</div>
										</div>
									</Link>
								</div>
				        	)
				        })}
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
