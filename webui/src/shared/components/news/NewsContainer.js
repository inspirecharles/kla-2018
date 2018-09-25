import React, { Component } from "react";

class NewsContainer extends Component {
	constructor() {
	    super();
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

export default NewsContainer;
