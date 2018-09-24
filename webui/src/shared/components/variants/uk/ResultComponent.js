import React, { Component } from "react"; 
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {createResultLink} from "../../../helper.js"

class ResultComponent extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			main_numbers: [],
			supp_numbers: [],
		}

    	this.processMainNumbers = this.processMainNumbers.bind(this);
    	this.processSuppNumbers = this.processSuppNumbers.bind(this);
	} 

	processMainNumbers(main_numbers){
		var main_array = [];
		var mNumbers = JSON.parse(main_numbers);
		if( mNumbers.type == 'Main' ){
			for (const key of Object.keys(mNumbers)) {
			    if( key != 'type' )
			    	main_array.push(mNumbers[key])
			}
		}
		return main_array;
	}

	processSuppNumbers(supp_numbers){
		var supp_array = [];
		var sNumbers = JSON.parse(supp_numbers);
		if( sNumbers.type == 'Supplementary' ){
			for (const key of Object.keys(sNumbers)) {
			    if( key != 'type' )
			    	supp_array.push(sNumbers[key])
			}
		}
		return supp_array;
	}


	componentWillMount(){
		if(this.props.game.results && this.props.game.results.length){
			var main_numbers = this.processMainNumbers(this.props.game.results[0].main_numbers);
			var supp_numbers = this.processSuppNumbers(this.props.game.results[0].supp_numbers);
			this.setState({
				main_numbers: main_numbers,
				supp_numbers: supp_numbers,
			})
		}
	}
	
	/*componentWillReceiveProps(nextProps) {
		if(nextProps.game.results && nextProps.game.results.length){
			var main_numbers = this.processMainNumbers(nextProps.game.results[0].main_numbers);
			var supp_numbers = this.processSuppNumbers(nextProps.game.results[0].supp_numbers);
			this.setState({
				main_numbers: main_numbers,
				supp_numbers: supp_numbers,
			})
		}
  	}*/

	render() {
		return (
			<div>
                <div className="card-body pt-0" id="lotto">
                	<div className="main_numbers col-lg-12 col-md-12">
                		<div className="clr mainNumber_label col-lg-12 col-md-12">Main Numbers</div>
                		<div className="">
						    { this.state.main_numbers.map((item, i) => {
                            	return <div key={i} className={"numbers circle bc_lotto d-inline-block"}>{item}</div>
                            }) }
						</div>
                    </div>
                </div>

                <div className="card-body pt-0" id="lotto">
                	<div className="supplementary_numbers col-lg-12 col-md-12">
            			<div className={"clr supplementary_label col-lg-12 col-md-12 "+(this.state.supp_numbers.length?'':'invisible')}>Supplementary</div>
                		<div className="">
						    { this.state.supp_numbers.map((item, i) => {
                            	return <div key={i} className="numbers circle supplementary d-inline-block">{item}</div>
                            }) }

                            { !this.props.hideViewPrizes &&
                            <Link to={createResultLink(this.props.game)}><button className="btn btn-primary float-right blueBtn">View Prizes</button></Link>
							}
						</div>
                    </div>
                </div>
            </div>
		); 
	}
}

function mapStateToProps(state){
  	return {
    	result_detail: state.result_detail
  	}
}

export default withRouter(connect(mapStateToProps)(ResultComponent));