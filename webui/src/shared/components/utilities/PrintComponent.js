import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";

class PrintComponent extends Component {
	constructor() {
	    super();
	}

	render() {
	    return (
			<a className="icons"><img className="img-fluid icon-printresult" src="/img/icons/print-results.svg" /></a>
	    );
	}
	
}


function mapStateToProps(state){
  	return {
  	}
}

export default withRouter(connect(mapStateToProps)(PrintComponent));
