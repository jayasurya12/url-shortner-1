import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import User from "./pages/NavbarPages/User/User";
import Home from './pages/Home'
import DashBoard from "./pages/NavbarPages/DashBoard/DashBoard";
import DailyUsage from "./pages/NavbarPages/DailyUsage/DailyUsage";
import Profile from "./pages/NavbarPages/Profile/Profile";
import Verify from './pages/Verification/Verify';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup'
import ForgetPassword from './pages/forgetPassword/passResetEmailVerification';
import PasswordReset from './pages/forgetPassword/Password Reset/passwordReset';
import authReducer from './store/reducer/reducer'
import {createStore,applyMiddleware,combineReducers} from 'redux'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  const rootStore=combineReducers({
    auth:authReducer
  })
  const store=createStore(rootStore,applyMiddleware(ReduxThunk ))
 
  return (
    
      <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/verify/:token" component={Verify}/>
          <Route exact path="/" component={Home}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/forget' component={ForgetPassword}/>
          <Route exact path='/passwordreset/:token' component={PasswordReset}/>
          <div className="container">
          <Route path="/dailyusage" exact component={DailyUsage} />
          <Route path="/dashboard" exact component={DashBoard} />
          <Route path="/profile" exact component={Profile} />
          <PrivateRoute exact path='/user' component={User}/>
          </div>
        </Switch>
        <ToastContainer/>
      </Router>
      </Provider>
   
  );
}

export default App;
