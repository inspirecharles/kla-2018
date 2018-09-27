import React, { Component } from "react"; 
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {createResultLink} from "../../helper.js"
import {saveEmail} from "../../actions/action-subscribe"

class SubscriptionComponent extends Component {

	constructor(props) {
		super(props);
		//let errorView = {display: 'none'};
		this.state = {
			email: 'false',
			success:false,
			errorDisplay:{display: 'none', color:'red'},
			hideInput:{display:'block'},
			successEmail:{display:'none'},
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
			this.setState({email:this.refs.email1.value, 
						   errorDisplay:{display: 'block',color:'red'}})			
		}else{
		  this.setState({email:this.refs.email1.value})
		  console.log("Email is Correct");
		  this.setState({errorDisplay:{display: 'none'} ,
		  				hideInput:{display: 'none'},
		 				successEmail:{display: 'block'}})
		 
		  this.props.dispatch(saveEmail(this.refs.email1.value));
		  this.refs.email1.value = '';
		}

		
	}

	render() {
    	
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
						    <div style={this.state.hideInput}>
								<div className="input-group">							
						         <input type="email" ref="email1" className="form-control" placeholder="Email" />
							        <span className="input-group-btn">
							        	<button className="btn btn-theme btn-subscribe" onClick={this.submitEmail} type="submit">Subscribe</button>
						         	</span>
						        </div>
						        <div style={this.state.errorDisplay}>
									<span>
									This email address you have entered is invalid.<br/>
									Please try again.
									</span>
								</div>
							</div>
							<div style={this.state.successEmail}>
								<h3 className="media-heading subscribe-heading celias text-white">Thank you for your subscription!</h3>
							</div>			
						</div>
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