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
				<section>
		    		<div className="container">
			    	 	News Detail here
		      		</div>
	      		</section>
      		</div>
	    );
	}
	
}

export default NewsDetailContainer;
