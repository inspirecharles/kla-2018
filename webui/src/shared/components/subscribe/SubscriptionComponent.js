import React, { Component } from "react"; 
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {createResultLink} from "../../helper.js"
import {saveEmail} from "../../actions/action-subscribe"

class SubscriptionComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: 'false',
		};
		
		this.submitEmail = this.submitEmail.bind(this);
	} 

	componentWillMount(){
		this.setState({email: this.props.email})
	}

	submitEmail(){
		console.log(this.refs.email1.value);
		
		
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
		if(reg.test(this.refs.email1.value) === false)
		{
			console.log("Email is Not Correct");
			this.setState({email:this.refs.email1.value})
			errorView= {display: 'block'};
		}else{
		  this.setState({email:this.refs.email1.value})
		  console.log("Email is Correct");
		  this.props.dispatch(saveEmail(this.state.email));
		}

		this.refs.email1.value = '';
	}

	render() {
    	let errorView = {display: 'none'};
    	const succesView = {display: 'block'};
		return (
				<div className="row">
					<div className="media-body subscribe-body col-lg-6 col-md-12">
						<h3 className="media-heading subscribe-heading celias text-white">Lottery Results in Your Inbox</h3>
						<p className="subscribe-content text-white">
							Get the latest UK lottery results direct to your email and never miss your lucky numbers!
						</p>
					</div>
					<div className="media-body subscribe-body right col-lg-6 col-md-12 subscribe">
						<div className="single">
							<div className="input-group">
							
							<h3 className="media-heading subscribe-heading celias text-white" style={errorView}>Email is not a Correct!</h3>
							
					         <input type="email" ref="email1" className="form-control" placeholder="Email" />
						        <span className="input-group-btn">
						        	<button className="btn btn-theme btn-subscribe" onClick={this.submitEmail} type="submit">Subscribe</button>
					         	</span>
					        </div>
						</div>
					</div>
					<div style={errorView}>
						<h3 className="media-heading subscribe-heading celias text-white">
						{this.state.email} THANK YOU FOR SUBSCRIBING! www.lotteryresults.co.uk!
						</h3>
					</div>					
				</div>
				
            
		) 
	}
}

function mapStateToProps(state){
  	return {
    	result_detail: state.result_detail
  	}
}

export default withRouter(connect(mapStateToProps)(SubscriptionComponent));