import React, { Component } from 'react';
import {BrowserRouter,Route,Redirect} from "react-router-dom"
import {Provider} from "react-redux"
import {createStore,applyMiddleware,compose} from "redux"
import {connect} from "react-redux"
import reduxThunk from "redux-thunk"
import {rootReducer} from "./reducers"
import Header from "./shared/Header"
import RentalListing from "./components/rental/rental-listing/RentalListing"
import RentalDetail from "./components/rental/rental-detail/RentalDetail"
import logo from './logo.svg';
import './App.css';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(reduxThunk)))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Header/>
        <div className="container">
        <Route exact path="/" render={()=><Redirect to="/rentals"/>}/>
      <Route exact path="/rentals" component={RentalListing}/>
      <Route exact path="/rentals/:id" component={RentalDetail}/>
        </div>
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
