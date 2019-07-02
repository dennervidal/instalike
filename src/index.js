import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import {Router, Route, browserHistory} from 'react-router';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {timeline} from './reducers/timeline';
import thunkMiddleware from 'redux-thunk';
import {notificacao} from './reducers/header';
import {Provider} from 'react-redux';

function verificaAuth(nextState, replace){
  if(localStorage.getItem('auth-token') === null){
    replace('/?msg=Você precisa estar logado');
  }
}

const reducers = combineReducers({timeline, notificacao});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/timeline" component={App} onEnter={verificaAuth}/>
        <Route path="/timeline/:login" component={App}/>
        <Route path="/logout" component={Logout}/>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
