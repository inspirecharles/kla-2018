import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
			<div id="news-list">
				<section>
		    		<div className="container">
			    	 	News list here
		      		</div>
	      		</section>
      		</div>
	    );
	}
	
}


function mapStateToProps(state){
  	return {
    	news: state.news
  	}
}

export default withRouter(connect(mapStateToProps)(NewsContainer));
