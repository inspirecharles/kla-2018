import React, { Component } from "react";
import News from "./home/NewsSliderComponent"

class LotteryResultContainer extends Component {
	constructor() {
	    super();
	}
	
	componentDidMount() {
	 	window.scrollTo(0, 0)
	}

	render() {
	    return (
			<div id="lottery-result">
	    	 	<section className="results background-blue space-top">
	    	 		<div className="container">
	    	 			Lotter Result Content Here
	    	 		</div>
	    	 	</section>
      		</div>
	    );
	}
	
}

export default LotteryResultContainer;
