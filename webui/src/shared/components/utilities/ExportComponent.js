import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";
import Modal from 'react-modal';

import {exportResults, exportResultByDrawId} from "../../actions/action-results"

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width  				  : '50%'
  },
  overlay: {
  	backgroundColor		  : 'rgba(0,0,0,.7)',
  }
};

class ExportComponent extends Component {
	constructor() {
	    super();

	    this.state = {
	    	modalIsOpen: false,
	    	export: {
	    		from: '',
	    		to: '',
	    	}
	    };

	    this.openModal = this.openModal.bind(this);
	    this.afterOpenModal = this.afterOpenModal.bind(this);
	    this.closeModal = this.closeModal.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.handleExportByDrawId = this.handleExportByDrawId.bind(this);
	}

	openModal() {
	    this.setState({modalIsOpen: true});
  	}

	afterOpenModal() {
	    // references are now sync'd and can be accessed.
	    this.subtitle.style.color = '#333';
	}

	closeModal() {
	    this.setState({modalIsOpen: false});
	}

	handleChange(event) {
      	this.setState({export:{...this.state.export, [event.target.name]:event.target.value}})
  	}

  	handleSubmit(event){
  		event.preventDefault();
  		const {exportData} = this.state.export;
  		
  		if(this.state.export.from.trim() != "" && this.state.export.to.trim() != ""){
  			this.props.dispatch( exportResults( this.props.game, this.state.export.from, this.state.export.to ) )
  		}
  	}

  	handleExportByDrawId(event){
  		event.preventDefault();
  		this.props.dispatch( exportResultByDrawId( this.props.game, this.props.draw_id ) )
  	}

	render() {
	    return (
	    	<a className="icons" onClick={this.handleExportByDrawId}><img className="img-fluid icon-download" src="/img/icons/download.svg" /></a>
	    	/*<div>
				<a className="icons" onClick={this.openModal}><img className="img-fluid icon-download" src="/img/icons/download.svg" /></a>
				<Modal
		          isOpen={this.state.modalIsOpen}
		          onAfterOpen={this.afterOpenModal}
		          onRequestClose={this.closeModal}
		          style={customStyles}
		          contentLabel="Example Modal"
		        >
		          	<h2 ref={subtitle => this.subtitle = subtitle}>Select date range to export</h2>
		          	<button className="pull-right" onClick={this.closeModal}>close</button>
		          	<div>
		          	<form onSubmit={this.handleSubmit}>
		          		<input type="date" name="from" value={this.state.export.from} onChange={this.handleChange} /><br/>
		          		<input type="date" name="to" value={this.state.export.to}  onChange={this.handleChange} /><br/>
		          		<button type="submit">Export</button>
		          	</form>
		          	</div>
		        </Modal>
	        </div>*/
	    );
	}
	
}


function mapStateToProps(state){
  	return {
  	}
}

export default withRouter(connect(mapStateToProps)(ExportComponent));
