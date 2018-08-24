module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _serializeJavascript = __webpack_require__(/*! serialize-javascript */ "serialize-javascript");

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _express = __webpack_require__(/*! express */ "express");

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(/*! react-dom/server */ "react-dom/server");

var _redux = __webpack_require__(/*! redux */ "redux");

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _reduxThunk = __webpack_require__(/*! redux-thunk */ "redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(/*! redux-logger */ "redux-logger");

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reducers = __webpack_require__(/*! ../shared/reducers */ "./src/shared/reducers/index.js");

var _reducers2 = _interopRequireDefault(_reducers);

var _App = __webpack_require__(/*! ../shared/App */ "./src/shared/App.js");

var _App2 = _interopRequireDefault(_App);

var _sourceMapSupport = __webpack_require__(/*! source-map-support */ "source-map-support");

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (true) {
	_sourceMapSupport2.default.install();
}

var app = (0, _express2.default)();

app.use(_express2.default.static("public"));

app.use(handleRender);

function handleRender(req, res) {
	var store = (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default), (0, _redux.applyMiddleware)(_reduxLogger2.default));

	var html = (0, _server.renderToString)(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: store },
		_react2.default.createElement(
			_reactRouterDom.StaticRouter,
			{ location: req.url },
			_react2.default.createElement(_App2.default, null)
		)
	));

	var preloadedState = store.getState();
	res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
	return "\n\t\t<!DOCTYPE html>\n\t\t\t<head>\n\t\t\t\t<title>Test</title>\n\t\t\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"/css/main.css\">\n\t\t\t</head>\n\t\t\t<body>\n\t\t\t\t<div id=\"root\">" + html + "</div>\n\t\t\t</body>\n\t\t\t<script>window.__PRELOADED_STATE__ = " + (0, _serializeJavascript2.default)(preloadedState) + "</script>\n\t\t\t<script type=\"text/javascript\" src=\"/bundle.js\"></script>\n\t\t</html>\n\t";
}

app.get("*", function (req, res) {
	res.send(renderFullPage(html, preloadedState));
});

app.listen(process.env.PORT || 3000, function () {
	console.log("Server is listening " + process.env.PORT + " || " + 3000);
});

/***/ }),

/***/ "./src/shared/App.js":
/*!***************************!*\
  !*** ./src/shared/App.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var _routes = __webpack_require__(/*! ./routes */ "./src/shared/routes.js");

var _routes2 = _interopRequireDefault(_routes);

var _HeaderContainer = __webpack_require__(/*! ./components/HeaderContainer */ "./src/shared/components/HeaderContainer.js");

var _HeaderContainer2 = _interopRequireDefault(_HeaderContainer);

var _FooterContainer = __webpack_require__(/*! ./components/FooterContainer */ "./src/shared/components/FooterContainer.js");

var _FooterContainer2 = _interopRequireDefault(_FooterContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_HeaderContainer2.default, null),
				_react2.default.createElement(
					"switch",
					null,
					_routes2.default.map(function (route, i) {
						return _react2.default.createElement(_reactRouterDom.Route, _extends({ key: i }, route));
					})
				),
				_react2.default.createElement(_FooterContainer2.default, null)
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;

/***/ }),

/***/ "./src/shared/components/FooterContainer.js":
/*!**************************************************!*\
  !*** ./src/shared/components/FooterContainer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooterContainer = function (_Component) {
	_inherits(FooterContainer, _Component);

	function FooterContainer() {
		_classCallCheck(this, FooterContainer);

		return _possibleConstructorReturn(this, (FooterContainer.__proto__ || Object.getPrototypeOf(FooterContainer)).call(this));
	}

	_createClass(FooterContainer, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"footer",
				null,
				"footer here"
			);
		}
	}]);

	return FooterContainer;
}(_react.Component);

exports.default = FooterContainer;

/***/ }),

/***/ "./src/shared/components/HeaderContainer.js":
/*!**************************************************!*\
  !*** ./src/shared/components/HeaderContainer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderContainer = function (_Component) {
	_inherits(HeaderContainer, _Component);

	function HeaderContainer() {
		_classCallCheck(this, HeaderContainer);

		return _possibleConstructorReturn(this, (HeaderContainer.__proto__ || Object.getPrototypeOf(HeaderContainer)).call(this));
	}

	_createClass(HeaderContainer, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"nav",
				{ className: "navbar navbar-expand-lg navbar-dark fixed-top mx-auto", id: "mainNav" },
				_react2.default.createElement(
					"div",
					{ className: "container" },
					_react2.default.createElement(
						"section",
						{ className: "one-fourth", id: "html" },
						_react2.default.createElement("img", { className: "img-fluid uk-logo", src: "../../img/uk-logo.png" })
					),
					_react2.default.createElement(
						"button",
						{ className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarResponsive", "aria-controls": "navbarResponsive", "aria-expanded": "false", "aria-label": "Toggle navigation" },
						_react2.default.createElement("span", { className: "navbar-toggler-icon" })
					),
					_react2.default.createElement(
						"div",
						{ className: "collapse navbar-collapse", id: "navbarResponsive" },
						_react2.default.createElement(
							"ul",
							{ className: "navbar-nav ml-auto" },
							_react2.default.createElement(
								"li",
								{ className: "nav-item active" },
								_react2.default.createElement(
									"a",
									{ className: "nav-link", href: "#" },
									"Home",
									_react2.default.createElement(
										"span",
										{ className: "sr-only" },
										"(current)"
									)
								)
							),
							_react2.default.createElement(
								"li",
								{ className: "nav-item" },
								_react2.default.createElement(
									"a",
									{ className: "nav-link", href: "#" },
									"Lottery Results"
								)
							),
							_react2.default.createElement(
								"li",
								{ className: "nav-item" },
								_react2.default.createElement(
									"a",
									{ className: "nav-link", href: "#" },
									"Check Your Ticket"
								)
							),
							_react2.default.createElement(
								"li",
								{ className: "nav-item" },
								_react2.default.createElement(
									"a",
									{ className: "nav-link", href: "#" },
									"Lottery News"
								)
							)
						)
					)
				)
			);
		}
	}]);

	return HeaderContainer;
}(_react.Component);

exports.default = HeaderContainer;

/***/ }),

/***/ "./src/shared/components/HomeContainer.js":
/*!************************************************!*\
  !*** ./src/shared/components/HomeContainer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeContainer = function (_Component) {
	_inherits(HomeContainer, _Component);

	function HomeContainer() {
		_classCallCheck(this, HomeContainer);

		return _possibleConstructorReturn(this, (HomeContainer.__proto__ || Object.getPrototypeOf(HomeContainer)).call(this));
	}

	_createClass(HomeContainer, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ className: "business-header result-container" },
					_react2.default.createElement(
						"div",
						{ className: "container" },
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-12" },
								_react2.default.createElement(
									"h3",
									{ className: "display-5 text-left text-white mt-4" },
									"Latest UK Lottery Results."
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 game_result" },
								_react2.default.createElement(
									"div",
									{ className: "accordion md-accordion accordion-3 z-depth-1-half", role: "tablist", "aria-multiselectable": "true" },
									_react2.default.createElement(
										"div",
										{ className: "card" },
										_react2.default.createElement(
											"div",
											{ className: "card-header accordion md-accordion accordion-3 z-depth-1-half", id: "accordionEx1", role: "tablist", "aria-multiselectable": "true" },
											_react2.default.createElement(
												"a",
												{ "data-toggle": "collapse", "data-parent": "#accordionEx1", href: "#collapse4", "aria-expanded": "true", "aria-controls": "collapse4" },
												_react2.default.createElement(
													"div",
													{ className: "d-inline-block" },
													_react2.default.createElement("img", { className: "img-fluid uk-logo-lotto", src: "../../img/icon-lotto.png" }),
													" ",
													_react2.default.createElement("i", { className: "fa fa-angle-down rotate-icon fa-2x" })
												),
												_react2.default.createElement(
													"div",
													{ className: "d-inline-block prize_date" },
													_react2.default.createElement(
														"h6",
														{ className: "prize text-right" },
														"\xA36,300,000"
													),
													_react2.default.createElement(
														"p",
														{ className: "text-right date" },
														"Saturday 21 July 2018"
													)
												)
											)
										),
										_react2.default.createElement(
											"div",
											{ id: "collapse4", className: "collapse show", role: "tabpanel", "aria-labelledby": "heading4", "data-parent": "#accordionEx1" },
											_react2.default.createElement(
												"div",
												{ className: "card-body pt-0", id: "lotto" },
												_react2.default.createElement(
													"div",
													{ className: "gameResults-main" },
													_react2.default.createElement(
														"div",
														{ className: "main_numbers col-lg-12 col-md-12" },
														_react2.default.createElement(
															"dl",
															null,
															_react2.default.createElement(
																"dt",
																{ className: "clr mainNumber_label" },
																_react2.default.createElement(
																	"label",
																	{ htmlFor: "" },
																	"Main Numbers"
																)
															),
															_react2.default.createElement(
																"dd",
																{ className: "numbers circle bc_lotto d-inline-block" },
																"9"
															),
															_react2.default.createElement(
																"dd",
																{ className: "numbers circle bc_lotto d-inline-block" },
																"13"
															),
															_react2.default.createElement(
																"dd",
																{ className: "numbers circle bc_lotto d-inline-block" },
																"16"
															),
															_react2.default.createElement(
																"dd",
																{ className: "numbers circle bc_lotto d-inline-block" },
																"25"
															),
															_react2.default.createElement(
																"dd",
																{ className: "numbers circle bc_lotto d-inline-block" },
																"40"
															),
															_react2.default.createElement(
																"dd",
																{ className: "numbers circle bc_lotto d-inline-block" },
																"46"
															)
														)
													)
												)
											),
											_react2.default.createElement(
												"div",
												{ className: "card-footer container-fluid" },
												_react2.default.createElement(
													"div",
													{ className: "row footerNextDraw" },
													_react2.default.createElement(
														"h3",
														{ className: "nextDraw" },
														"Next Draw: \xA37,000,000"
													),
													_react2.default.createElement(
														"button",
														{ className: "btn btn-light ml-auto" },
														"Buy Now"
													)
												)
											)
										)
									)
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 game_result" },
								_react2.default.createElement(
									"div",
									{ className: "card" },
									_react2.default.createElement(
										"div",
										{ className: "card-header accordion md-accordion accordion-3 z-depth-1-half", id: "accordionEx2", role: "tablist", "aria-multiselectable": "true" },
										_react2.default.createElement(
											"a",
											{ "data-toggle": "collapse", "data-parent": "#accordionEx1", href: "#collapse5", "aria-expanded": "true", "aria-controls": "collapse5" },
											_react2.default.createElement(
												"div",
												{ className: "d-inline-block" },
												_react2.default.createElement("img", { className: "img-fluid uk-logo-lotto", src: "../../img/icon-lotto.png" }),
												" ",
												_react2.default.createElement("i", { className: "fa fa-angle-down rotate-icon fa-2x" })
											),
											_react2.default.createElement(
												"div",
												{ className: "d-inline-block prize_date" },
												_react2.default.createElement(
													"h6",
													{ className: "prize text-right" },
													"\xA36,300,000"
												),
												_react2.default.createElement(
													"p",
													{ className: "text-right date" },
													"Saturday 21 July 2018"
												)
											)
										)
									),
									_react2.default.createElement(
										"div",
										{ id: "collapse5", className: "collapse show", role: "tabpanel", "aria-labelledby": "heading4", "data-parent": "#accordionEx2" },
										_react2.default.createElement(
											"div",
											{ className: "card-body pt-0", id: "lotto" },
											_react2.default.createElement(
												"div",
												{ className: "gameResults-main" },
												_react2.default.createElement(
													"div",
													{ className: "main_numbers col-lg-12 col-md-12" },
													_react2.default.createElement(
														"dl",
														null,
														_react2.default.createElement(
															"dt",
															{ className: "clr mainNumber_label" },
															_react2.default.createElement(
																"label",
																{ htmlFor: "" },
																"Main Numbers"
															)
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"9"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"13"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"16"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"25"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"40"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"46"
														)
													)
												)
											)
										),
										_react2.default.createElement(
											"div",
											{ className: "card-footer container-fluid" },
											_react2.default.createElement(
												"div",
												{ className: "row footerNextDraw" },
												_react2.default.createElement(
													"h3",
													{ className: "nextDraw" },
													"Next Draw: \xA37,000,000"
												),
												_react2.default.createElement(
													"button",
													{ className: "btn btn-light ml-auto" },
													"Buy Now"
												)
											)
										)
									)
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 game_result" },
								_react2.default.createElement(
									"div",
									{ className: "card" },
									_react2.default.createElement(
										"div",
										{ className: "card-header accordion md-accordion accordion-3 z-depth-1-half", id: "accordionEx1", role: "tablist", "aria-multiselectable": "true" },
										_react2.default.createElement(
											"a",
											{ "data-toggle": "collapse", "data-parent": "#accordionEx1", href: "#collapse6", "aria-expanded": "true", "aria-controls": "collapse6" },
											_react2.default.createElement(
												"div",
												{ className: "d-inline-block" },
												_react2.default.createElement("img", { className: "img-fluid uk-logo-lotto", src: "../../img/icon-lotto.png" }),
												" ",
												_react2.default.createElement("i", { className: "fa fa-angle-down rotate-icon fa-2x" })
											),
											_react2.default.createElement(
												"div",
												{ className: "d-inline-block prize_date" },
												_react2.default.createElement(
													"h6",
													{ className: "prize text-right" },
													"\xA36,300,000"
												),
												_react2.default.createElement(
													"p",
													{ className: "text-right date" },
													"Saturday 21 July 2018"
												)
											)
										)
									),
									_react2.default.createElement(
										"div",
										{ id: "collapse6", className: "collapse", role: "tabpanel", "aria-labelledby": "heading4", "data-parent": "#accordionEx1" },
										_react2.default.createElement(
											"div",
											{ className: "card-body pt-0", id: "lotto" },
											_react2.default.createElement(
												"div",
												{ className: "gameResults-main" },
												_react2.default.createElement(
													"div",
													{ className: "main_numbers col-lg-12 col-md-12" },
													_react2.default.createElement(
														"dl",
														null,
														_react2.default.createElement(
															"dt",
															{ className: "clr mainNumber_label" },
															_react2.default.createElement(
																"label",
																{ htmlFor: "" },
																"Main Numbers"
															)
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"9"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"13"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"16"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"25"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"40"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"46"
														)
													)
												)
											)
										),
										_react2.default.createElement(
											"div",
											{ className: "card-footer container-fluid" },
											_react2.default.createElement(
												"div",
												{ className: "row footerNextDraw" },
												_react2.default.createElement(
													"h3",
													{ className: "nextDraw" },
													"Next Draw: \xA37,000,000"
												),
												_react2.default.createElement(
													"button",
													{ className: "btn btn-light ml-auto" },
													"Buy Now"
												)
											)
										)
									)
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-6 game_result" },
								_react2.default.createElement(
									"div",
									{ className: "card" },
									_react2.default.createElement(
										"div",
										{ className: "card-header accordion md-accordion accordion-3 z-depth-1-half", id: "accordionEx2", role: "tablist", "aria-multiselectable": "true" },
										_react2.default.createElement(
											"a",
											{ "data-toggle": "collapse", "data-parent": "#accordionEx1", href: "#collapse7", "aria-expanded": "true", "aria-controls": "collapse7" },
											_react2.default.createElement(
												"div",
												{ className: "d-inline-block" },
												_react2.default.createElement("img", { className: "img-fluid uk-logo-lotto", src: "../../img/icon-lotto.png" }),
												" ",
												_react2.default.createElement("i", { className: "fa fa-angle-down rotate-icon fa-2x" })
											),
											_react2.default.createElement(
												"div",
												{ className: "d-inline-block prize_date" },
												_react2.default.createElement(
													"h6",
													{ className: "prize text-right" },
													"\xA36,300,000"
												),
												_react2.default.createElement(
													"p",
													{ className: "text-right date" },
													"Saturday 21 July 2018"
												)
											)
										)
									),
									_react2.default.createElement(
										"div",
										{ id: "collapse7", className: "collapse", role: "tabpanel", "aria-labelledby": "heading4", "data-parent": "#accordionEx2" },
										_react2.default.createElement(
											"div",
											{ className: "card-body pt-0", id: "lotto" },
											_react2.default.createElement(
												"div",
												{ className: "gameResults-main" },
												_react2.default.createElement(
													"div",
													{ className: "main_numbers col-lg-12 col-md-12" },
													_react2.default.createElement(
														"dl",
														null,
														_react2.default.createElement(
															"dt",
															{ className: "clr mainNumber_label" },
															_react2.default.createElement(
																"label",
																{ htmlFor: "" },
																"Main Numbers"
															)
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"9"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"13"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"16"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"25"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"40"
														),
														_react2.default.createElement(
															"dd",
															{ className: "numbers circle bc_lotto d-inline-block" },
															"46"
														)
													)
												)
											)
										),
										_react2.default.createElement(
											"div",
											{ className: "card-footer container-fluid" },
											_react2.default.createElement(
												"div",
												{ className: "row footerNextDraw" },
												_react2.default.createElement(
													"h3",
													{ className: "nextDraw" },
													"Next Draw: \xA37,000,000"
												),
												_react2.default.createElement(
													"button",
													{ className: "btn btn-light ml-auto" },
													"Buy Now"
												)
											)
										)
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "container" },
					_react2.default.createElement(
						"div",
						{ className: "media" },
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "media-body col-lg-6" },
								_react2.default.createElement(
									"h4",
									{ className: "media-heading" },
									"The UK's Home of Lottery ",
									_react2.default.createElement("br", null),
									"Results Online"
								),
								_react2.default.createElement(
									"p",
									{ className: "media-content" },
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacinia, tellus quis rutrum vulputate, est augue pellentesque sem, vitae tempus ipsum lacus at tortor. In efficitur eu eros sed semper.",
									_react2.default.createElement("br", null),
									_react2.default.createElement("br", null),
									"Vivamus molestie metus ac tincidunt iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque et arcu vel felis consequat maximus non at purus.",
									_react2.default.createElement("br", null),
									_react2.default.createElement("br", null),
									"Vivamus molestie metus ac tincidunt iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque et arcu vel felis consequat maximus non at purus."
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "media-right col-lg-6 hidden-md-down" },
								_react2.default.createElement(
									"a",
									{ href: "#" },
									_react2.default.createElement("img", { className: "img-fluid media-img hidden-md", src: "../../img/girl_laptop.jpg" })
								)
							)
						)
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "notification-wrapper" },
					_react2.default.createElement(
						"div",
						{ className: "container" },
						_react2.default.createElement(
							"div",
							{ className: "media getNotified-container" },
							_react2.default.createElement(
								"div",
								{ className: "row" },
								_react2.default.createElement(
									"div",
									{ className: "media-body col-lg-8" },
									_react2.default.createElement(
										"h4",
										{ className: "media-heading notif-heading text-white" },
										"Draw Results Direct to Your Phone."
									),
									_react2.default.createElement(
										"p",
										{ className: "notif-content text-white" },
										"Never miss the winning numbers! Get push notification over time UK lotto results are available for all your favorite lotteries."
									)
								),
								_react2.default.createElement(
									"div",
									{ className: "media-right notif-button col-lg-4" },
									_react2.default.createElement(
										"button",
										{ type: "button", className: "btn btn-light" },
										"Get Notified"
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "container" },
					_react2.default.createElement(
						"div",
						{ className: "uk-lotto-news-wrapper" },
						_react2.default.createElement(
							"h1",
							{ className: "my-4 text-center" },
							"Latest UK Lotto News"
						),
						_react2.default.createElement(
							"div",
							{ className: "row" },
							_react2.default.createElement(
								"div",
								{ className: "col-lg-4 col-sm-6 portfolio-item" },
								_react2.default.createElement(
									"div",
									{ className: "card h-100" },
									_react2.default.createElement(
										"a",
										{ href: "#" },
										_react2.default.createElement("img", { className: "card-img-top", src: "../../img/girl_laptop.jpg" })
									),
									_react2.default.createElement(
										"div",
										{ className: "card-body" },
										_react2.default.createElement(
											"h4",
											{ className: "card-title" },
											_react2.default.createElement(
												"a",
												{ href: "#" },
												"Project Six"
											)
										),
										_react2.default.createElement(
											"p",
											{ className: "card-text" },
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse."
										)
									)
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-4 col-sm-6 portfolio-item" },
								_react2.default.createElement(
									"div",
									{ className: "card h-100" },
									_react2.default.createElement(
										"a",
										{ href: "#" },
										_react2.default.createElement("img", { className: "card-img-top", src: "../../img/girl_laptop.jpg" })
									),
									_react2.default.createElement(
										"div",
										{ className: "card-body" },
										_react2.default.createElement(
											"h4",
											{ className: "card-title" },
											_react2.default.createElement(
												"a",
												{ href: "#" },
												"Project Six"
											)
										),
										_react2.default.createElement(
											"p",
											{ className: "card-text" },
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse."
										)
									)
								)
							),
							_react2.default.createElement(
								"div",
								{ className: "col-lg-4 col-sm-6 portfolio-item" },
								_react2.default.createElement(
									"div",
									{ className: "card h-100" },
									_react2.default.createElement(
										"a",
										{ href: "#" },
										_react2.default.createElement("img", { className: "card-img-top", src: "../../img/girl_laptop.jpg" })
									),
									_react2.default.createElement(
										"div",
										{ className: "card-body" },
										_react2.default.createElement(
											"h4",
											{ className: "card-title" },
											_react2.default.createElement(
												"a",
												{ href: "#" },
												"Project Six"
											)
										),
										_react2.default.createElement(
											"p",
											{ className: "card-text" },
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse."
										)
									)
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "row view-more-news" },
							_react2.default.createElement(
								"button",
								{ className: "btn btn-primary" },
								"View More..."
							)
						)
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "subscribe-wrapper" },
					_react2.default.createElement(
						"div",
						{ className: "container" },
						_react2.default.createElement(
							"div",
							{ className: "subscribe-container" },
							_react2.default.createElement(
								"div",
								{ className: "row" },
								_react2.default.createElement(
									"div",
									{ className: "media-body subscribe-body col-lg-6" },
									_react2.default.createElement(
										"h4",
										{ className: "media-heading subscribe-heading text-white" },
										"Lottery Results in Your Inbox"
									),
									_react2.default.createElement(
										"p",
										{ className: "subscribe-content text-white" },
										"Get the latest UK lottery results direct to your email and never miss your lucky numbers!"
									)
								),
								_react2.default.createElement(
									"div",
									{ className: "media-body subscribe-body right col-lg-6" },
									_react2.default.createElement(
										"div",
										{ className: "single" },
										_react2.default.createElement(
											"div",
											{ className: "input-group" },
											_react2.default.createElement("input", { type: "email", className: "form-control", placeholder: "youremail@email.com" }),
											_react2.default.createElement(
												"span",
												{ className: "input-group-btn" },
												_react2.default.createElement(
													"button",
													{ className: "btn btn-theme", type: "submit" },
													"Subscribe"
												)
											)
										)
									)
								)
							)
						)
					)
				)
			);
		}
	}]);

	return HomeContainer;
}(_react.Component);

exports.default = HomeContainer;

/***/ }),

/***/ "./src/shared/components/LotteryResultContainer.js":
/*!*********************************************************!*\
  !*** ./src/shared/components/LotteryResultContainer.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LotteryResultContainer = function (_Component) {
	_inherits(LotteryResultContainer, _Component);

	function LotteryResultContainer() {
		_classCallCheck(this, LotteryResultContainer);

		return _possibleConstructorReturn(this, (LotteryResultContainer.__proto__ || Object.getPrototypeOf(LotteryResultContainer)).call(this));
	}

	_createClass(LotteryResultContainer, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "row" },
				_react2.default.createElement(
					"div",
					{ className: "container" },
					"LotteryResultContainer content here"
				)
			);
		}
	}]);

	return LotteryResultContainer;
}(_react.Component);

exports.default = LotteryResultContainer;

/***/ }),

/***/ "./src/shared/components/NewsContainer.js":
/*!************************************************!*\
  !*** ./src/shared/components/NewsContainer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewsContainer = function (_Component) {
	_inherits(NewsContainer, _Component);

	function NewsContainer() {
		_classCallCheck(this, NewsContainer);

		return _possibleConstructorReturn(this, (NewsContainer.__proto__ || Object.getPrototypeOf(NewsContainer)).call(this));
	}

	_createClass(NewsContainer, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "row" },
				_react2.default.createElement(
					"div",
					{ className: "container" },
					"NewsContainer content here"
				)
			);
		}
	}]);

	return NewsContainer;
}(_react.Component);

exports.default = NewsContainer;

/***/ }),

/***/ "./src/shared/components/TicketsContainer.js":
/*!***************************************************!*\
  !*** ./src/shared/components/TicketsContainer.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TicketsContainer = function (_Component) {
	_inherits(TicketsContainer, _Component);

	function TicketsContainer() {
		_classCallCheck(this, TicketsContainer);

		return _possibleConstructorReturn(this, (TicketsContainer.__proto__ || Object.getPrototypeOf(TicketsContainer)).call(this));
	}

	_createClass(TicketsContainer, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "row" },
				_react2.default.createElement(
					"div",
					{ className: "container" },
					"TICKETS content here"
				)
			);
		}
	}]);

	return TicketsContainer;
}(_react.Component);

exports.default = TicketsContainer;

/***/ }),

/***/ "./src/shared/reducers/index.js":
/*!**************************************!*\
  !*** ./src/shared/reducers/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = __webpack_require__(/*! redux */ "redux");

var _reducerAccount = __webpack_require__(/*! ./reducer-account */ "./src/shared/reducers/reducer-account.js");

var _reducerAccount2 = _interopRequireDefault(_reducerAccount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
	accounts: _reducerAccount2.default
});

exports.default = allReducers;

/***/ }),

/***/ "./src/shared/reducers/reducer-account.js":
/*!************************************************!*\
  !*** ./src/shared/reducers/reducer-account.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialAccounts;
	var action = arguments[1];

	switch (action.type) {
		case "UPDATE_ACCOUNTS":
			return action.payload;
			break;
	}
	return state;
};

var initialAccounts = ['asdfasdf', 'asdfasdfaszxcvzx', '123123azsdasd'];

/***/ }),

/***/ "./src/shared/routes.js":
/*!******************************!*\
  !*** ./src/shared/routes.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HomeContainer = __webpack_require__(/*! ./components/HomeContainer */ "./src/shared/components/HomeContainer.js");

var _HomeContainer2 = _interopRequireDefault(_HomeContainer);

var _LotteryResultContainer = __webpack_require__(/*! ./components/LotteryResultContainer */ "./src/shared/components/LotteryResultContainer.js");

var _LotteryResultContainer2 = _interopRequireDefault(_LotteryResultContainer);

var _TicketsContainer = __webpack_require__(/*! ./components/TicketsContainer */ "./src/shared/components/TicketsContainer.js");

var _TicketsContainer2 = _interopRequireDefault(_TicketsContainer);

var _NewsContainer = __webpack_require__(/*! ./components/NewsContainer */ "./src/shared/components/NewsContainer.js");

var _NewsContainer2 = _interopRequireDefault(_NewsContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: "/",
  exact: true,
  component: _HomeContainer2.default
}, {
  path: "/results",
  exact: true,
  component: _LotteryResultContainer2.default
}, {
  path: "/tickets",
  exact: true,
  component: _TicketsContainer2.default
}, {
  path: "/news",
  exact: true,
  component: _NewsContainer2.default
}];

exports.default = routes;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-logger":
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "source-map-support":
/*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map