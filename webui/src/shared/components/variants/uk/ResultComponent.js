import React, { Component } from "react"; 

class ResultComponent extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			main_numbers: [],
			supp_numbers: [],
		}

	} 

	processMainNumbers(main_numbers){
		var mNumbers = JSON.parse(main_numbers);
		if( mNumbers.type == 'Main' ){
			for (const key of Object.keys(mNumbers)) {
			    if( key != 'type' )
			    	this.state.main_numbers.push(mNumbers[key])
			}
		}
	}

	processSuppNumbers(supp_numbers){
		var sNumbers = JSON.parse(supp_numbers);
		if( sNumbers.type == 'Supplementary' ){
			for (const key of Object.keys(sNumbers)) {
			    if( key != 'type' )
			    	this.state.supp_numbers.push(sNumbers[key])
			}
		}
	}

	componentWillMount(){
		if(this.props.game.results.length){
			this.processMainNumbers(this.props.game.results[0].main_numbers);
			this.processSuppNumbers(this.props.game.results[0].supp_numbers)
		}
	}

	render() {
		return (
			<div>
                <div className="card-body pt-0" id="lotto">
                    <div className="gameResults-main">
                    	<div className="main_numbers col-lg-12 col-md-12">
                            <dl>
                            	<dt className="clr mainNumber_label">
                                    <label htmlFor="">Main Numbers</label>
                                </dt>
                                { this.state.main_numbers.map((item, i) => {
                                	return <dd key={i} className="numbers circle bc_lotto d-inline-block">{item}</dd>
                                }) }
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="card-body pt-0" id="lotto">
                    <div className="gameResults-main">
                    	<div className="supplementary_numbers col-lg-12 col-md-12">
                            <dl>
                            	<dt className="clr supplementary_label">
                                    <label htmlFor="">Supplementary</label>
                                </dt>
                                { this.state.supp_numbers.map((item, i) => {
                                	return <dd key={i} className="numbers circle supplementary d-inline-block">{item}</dd>
                                }) }
                                <button className="btn btn-primary float-right">View Prizes</button>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
		); 
	}
}


export default ResultComponent;