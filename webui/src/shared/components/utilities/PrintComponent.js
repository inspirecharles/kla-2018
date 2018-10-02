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
	    let toPrint = document.getElementById(this.props.elem+"-container");

	    let print_me = document.getElementById("print-me");
	    print_me.innerHTML = toPrint.outerHTML;

	    let root = document.getElementById('root');
	    root.style.display = "none";

	    window.print();

	    root.style.display = "block";
	    print_me.innerHTML = "";
	    return true;
	}

	render() {
	    return (
			<a className="icons" onClick={this.printDiv}><img className="img-fluid icon-printresult" src="/img/icons/print-results.svg" /></a>
	    );
	}
	
}


function mapStateToProps(state){
  	return {
  	}
}

export default withRouter(connect(mapStateToProps)(PrintComponent));
