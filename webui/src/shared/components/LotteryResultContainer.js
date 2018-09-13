import React, { Component } from "react";
import ComingSoon from "./ComingSoonContainer"
import News from "./home/NewsSliderComponent"

class LotteryResultContainer extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
			<div id="lottery-result" className="coming-soon">
	    	 	<section className="results background-blue space-top">
	    	 		<div className="container">
	    	 			<ComingSoon/>
	    	 		</div>
	    	 	</section>
	    	 	<section className="news">
	    	 		<div className="container">
	    	 			<News/>
	    	 		</div>
	    	 	</section>
      		</div>
	    );
	}
	
}

export default LotteryResultContainer;
