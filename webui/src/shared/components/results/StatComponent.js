import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";

import {formatMoney} from "../../helper";

class StatComponent extends Component {
	constructor(props, context) {
	    super(props, context);

    	this.getStatData = this.getStatData.bind(this);
    	this.getStat = this.getStat.bind(this);
	}


	getStat(){
		return this.props.result_detail && this.props.result_detail.results && this.props.result_detail.results.length && JSON.parse(this.props.result_detail.results[0].stats);
	}

	getStatData(){
		let stat = this.getStat();
		const {AveragePrizeWon, AboveAverageWins, LargestPrizeWon} = stat || {AveragePrizeWon: 0, AboveAverageWins:0, LargestPrizeWon:0}
		let data = {
			firstStat : '',
			secondStat : '',
			thirdStat : '',
			firstValue : '',
			secondValue : '',
			thirdValue : '',
		};

		if(this.props.result_detail.results && this.props.result_detail.results.length){
			switch(this.props.result_detail.slug) {
		    case '49lottery':
			   		data.firstStat = 'Avg. prize Won';
					data.secondStat='Above avg. wins';
					data.thirdStat ='Largest prize Won';
					data.firstValue = "£ " +formatMoney(AveragePrizeWon || 0);
					data.secondValue = (AboveAverageWins || 0)+" %";
					data.thirdValue = "£ " +formatMoney((LargestPrizeWon || 0));
			    break;
		    case 'postcode_daily':		   		
		    case 'postcode_weekly':		   		
		    case 'postcode_monthly' :
		   			data.firstStat = 'Amount Raised for Charity so far';
					data.secondStat='Number of Players';
					data.thirdStat ='% of Sub given to charity';
					data.firstValue = '$255M';
					data.secondValue = '2.4M';
					data.thirdValue = '31%';
		        break;
		    case 'health_lottery':
		   			data.firstStat = "£\'s RAISED";
					data.secondStat= "£\'s WON";
					data.thirdStat ='WINNERS';
					data.firstValue = '58 MILLION';
					data.secondValue = '87 MILLION';
					data.thirdValue = '3 MILLION';
		        break;
		    default:
		    		data.firstStat = 'Avg. prize Won';
					data.secondStat='Above avg. wins';
					data.thirdStat ='Largest prize Won';
					data.firstValue = "£ " + (formatMoney(AveragePrizeWon || 0 ));
					data.secondValue = (AboveAverageWins || 0)+" %";
					data.thirdValue = "£ " +formatMoney(LargestPrizeWon || 0);
		         break;
			} 
		}
		return data;
	}

	render() {
		const {firstStat,secondStat,thirdStat,firstValue,secondValue,thirdValue} = this.getStatData();
	    return (
	    	<section className="draw-statistics">
      			<div className="container">
      				<div className="row">
      					<div className="col-lg-12 text-center section-title margin-bottom">
      						Draw {this.props.result_detail.results && this.props.result_detail.results.length && this.props.result_detail.results[0].draw_id} Statistics
      					</div>
      				</div>	      			
      				<div className="row text-center">
      					<div className="col-lg-4 margin-bottom">
      						<label>{firstStat}</label><br/>
      						<span className="value">{firstValue}</span>
      					</div>
      					<div className="col-lg-4 margin-bottom">
      						<label>{secondStat}</label><br/>
      						<span className="value">{secondValue}</span>
      					</div>
      					<div className="col-lg-4 margin-bottom">
      						<label>{thirdStat}</label><br/>
      						<span className="value">{thirdValue}</span>
      					</div>
      				</div>
      			</div>
      		</section>
	    )
	}
	
}


function mapStateToProps(state){
  	return {
    	result_detail: state.result_detail
  	}
}

export default withRouter(connect(mapStateToProps)(StatComponent));
