import React, { Component } from "react";
import UKResult from "../variants/uk/ResultComponent";
import moment from "moment";

class HomeCardComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};


		this.toggleShow = this.toggleShow.bind(this);
    	this.renderResult = this.renderResult.bind(this);
	}

	componentWillMount(){
		this.setState({show: this.props.show})
	}

	toggleShow(){
		this.setState({
			show: !this.state.show
		})
	}

	renderResult(){
		if( this.props.game.variant == "uk" )
			return <UKResult game={this.props.game} />
	}

	render() {
		return (
	        <div className="col-lg-6 game_result">
	        	<div className="accordion md-accordion accordion-3 z-depth-1-half" role="tablist" aria-multiselectable="true">
					<div className="card">
						<div className="lottery-results-header accordion md-accordion accordion-3 z-depth-1-half" id="accordionEx1" role="tablist" aria-multiselectable="true" onClick={this.toggleShow}>
						    <a data-toggle="collapse" data-parent="#accordionEx1" href={"#card"+this.props.name} aria-expanded="true" aria-controls="collapse1">
	                        	<div className="game-result-header">
	                        		<div className="container">
										<div className="row game-row">
										    <div className="game-logo">
										    	<img className={"img-fluid "+this.props.game.variant+"-logo-lotto game-"+this.props.game.slug} src={"/img/variants/"+this.props.game.variant+"/"+this.props.game.slug+".png"} />
										    </div>
										    <div className="prize-date">
										    	<p className="prize text-right">{this.props.game.results && this.props.game.results[0] && decodeURIComponent(JSON.parse(this.props.game.results[0].current_jackpot))}</p>
												<p className="date text-right">{this.props.game.results && this.props.game.results[0] && moment(this.props.game.results[0].draw_date).format('dddd DD MMMM YYYY') }</p>
										    </div>
										    <div className="arrow-icon">
										    	<i className={"fa fa-angle-"+(this.state.show==true?'up':'down')+" rotate-icon fa-2x align-middle"}></i>
										    </div>
										</div>
									</div>
	                        	</div>
	                        </a>
						</div>
						
						<div id={"card"+this.props.name} className={"collapse game-card-content "+(this.props.show==true?'show':'')} role="tabpanel" aria-labelledby="heading4" data-parent="#accordionEx1">
							<div className="gameResult-body">
	                        { this.renderResult() }

	                        <div className="gameResults-actionLink">
	                        	<div className="actionLink">
	                            	<div className="supplementary_numbers col-lg-12 col-md-12">
	                            		<div className="supp-link-icons">
	                            			<a className="icons"><img className="img-fluid icon-printresult" src="../../img/icons/print-results.svg" /></a>
			                            	<a className="icons"><img className="img-fluid icon-download" src="../../img/icons/download.svg" /></a>
			                            	<a className="icons icon-pastresult"><img className="img-fluid icon-pastresult" src="../../img/icons/past-results.svg" />Past Results</a>
			                            </div>
	                            	</div>
	                            </div>
	                        </div>
	                    	</div>
	                        <div className="card-footer container">
								<div className="row footerNextDraw">
									<h3 className="nextDraw">Next Draw: {this.props.game.results && this.props.game.results[0] && decodeURIComponent(JSON.parse(this.props.game.results[0].next_jackpot))}</h3>
									<button className="btn btn-light ml-auto buy-now-btn">Buy Now</button>
								</div>
							</div>
	                    </div>
						
					</div>

	        	</div>
	        </div>
		); 
	}
}


export default HomeCardComponent;