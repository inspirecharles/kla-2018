import React, {Component} from "react";
import { Switch, Route} from "react-router-dom";

import routes from "./routes"
import Header from "./components/HeaderContainer";
import Footer from "./components/FooterContainer";

class App extends Component {
	render(){
		return (
			<div>
				<Header />
				<switch>
					{routes.map((route, i) => <Route key={i} {...route} />)}
				</switch>
				<Footer />
			</div>
		)
	}
}

export default App;