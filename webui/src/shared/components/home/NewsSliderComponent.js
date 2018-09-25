import React, { Component } from "react"; 
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";
import Slider from "react-slick";

import {fetchNewsForSlider} from "../../actions/action-news";

class NewsSliderComponent extends Component {
	constructor(props) {
		super(props);
	}

	static initialAction() {
    	return fetchNewsForSlider();
  	}

	componentWillMount(){
		this.props.dispatch(NewsSliderComponent.initialAction());
	}

	render() {
		const settings = {
			className: "news-slider",
			arrows: false,
	        slidesToShow: 3,
	        slidesToScroll: 3,
			centerMode: false,
			centerPadding: '100px',
			dots: false,
			infinite: false,
	      	responsive: [
	      		{
		      		breakpoint: 992,
				    settings: {
						arrows: true,
				        slidesToShow: 1,
				        slidesToScroll: 1,
						centerMode: false,
						centerPadding: '100px',
						dots: true,
				    }
			    }
	      	]
	    };
		return (
			<Slider {...settings}>
		        {this.props.news_slider && this.props.news_slider.map((news_detail, i)=>{
		        	return (
		        		<div key={i} className="col-lg-12">
		        			<Link to={"/news/"+news_detail.slug}>
								<div className="card h-100">
									<div className="featured-image" style={{"background-image": "url('"+this.props.env.API_URL+"/uploads/news/"+news_detail.id+"/"+news_detail.feat_img+"')"}}></div>
									<div className="card-body">
										<h3 className="card-title blog-title celias">{news_detail.title}</h3>
										<div className="card-text blog-text" dangerouslySetInnerHTML={{__html: news_detail.article}}></div>
									</div>
								</div>
							</Link>
						</div>
		        	)
		        })}
		    </Slider>
		)
	}
}


function mapStateToProps(state){
  	return {
    	news_slider: state.news_slider,
    	env: state.env
  	}
}

export default withRouter(connect(mapStateToProps)(NewsSliderComponent));