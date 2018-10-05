import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";

class PrintComponent extends Component {
	constructor() {
	    super();

	    this.printDiv = this.printDiv.bind(this);
	}

	printDiv(){
		if(document.readyState === 'ready' || document.readyState === 'complete') {
			let toPrint = document.getElementById(this.props.elem);

		    let print_me = document.getElementById("print-me");
		    print_me.innerHTML = toPrint.outerHTML;

		    let rootdiv = document.getElementById('root');
		    rootdiv.style.display = "none";

			window.print();
		    rootdiv.style.display = "block";
		    print_me.innerHTML = "";
	    	return true;
	    }
	    else
	    	return false;
	}

	render() {
	    return (
			<a className="icons" onClick={this.printDiv}><img className="img-fluid icon-printresult mr-2" src="/img/icons/print-results.svg" /></a>
	    );
	}
	
}


function mapStateToProps(state){
  	return {
  	}
}

export default withRouter(connect(mapStateToProps)(PrintComponent));
