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

		/*var mywindow = window.open('', 'PRINT', 'height=400,width=600');

	    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
	    mywindow.document.write('</head><body >');
	    mywindow.document.write('<h1>' + document.title  + '</h1>');
	    mywindow.document.write(document.getElementById(this.props.elem+"-container").innerHTML);
	    mywindow.document.write('</body></html>');

	    mywindow.document.close(); // necessary for IE >= 10
	    mywindow.focus(); // necessary for IE >= 10*/

	    window.print();
	    //mywindow.close();

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
