import React, { Component } from "react";

class ComingSoonContainer extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
			<div id="coming-soon" className="comingSoon">
	    		<div className="container">
		    	 	<div className="row">
		    	 		<div className="col-lg-12">
		    	 			<h2 className="launchingSoon-text text-center text-white">LAUNCHING SOON</h2>
		    	 			<p className="comingSoon-text text-center text-white">
		    	 				This awesome feature is coming soon. <br />
		    	 				Please check back with us shortly. <br />
		    	 				Thank you for your patience.
		    	 			</p>
		    	 		</div>
		    	 	</div>
	      		</div>
      		</div>
	    );
	}
	
}

export default ComingSoonContainer;
