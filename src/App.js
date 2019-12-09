
import React, {Component} from 'react';
import {createStore , applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import FlashMessage from "react-native-flash-message";


class App extends Component {


    render() {

      const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
      return (
        <Provider store = {store}>

          
             <Router />      

               <FlashMessage position="top" /> 
         
        </Provider>
          

       
        
      );
    }
  }

  
  export default App; 
