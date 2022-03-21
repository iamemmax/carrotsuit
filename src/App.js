import React, { Component } from "react";
import { getAuthStatus } from "./reducers/authReducer";
import { verifyToken } from "./actions/authActions";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import socketIOClient from "socket.io-client";

import "./App.css";
import MyRoutes from "./components/routes/Routes";
import "./styles/reduction.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: "",
      // endpoint: "https://api.carrotsuite.space",
      endpoint: "/",
      // endpoint: "http://127.0.0.1:4001"
      notificationState: true,
    };
    // this.showNotification = this.showNotification.bind(this)
  }

  componentWillMount() {
    // Check for token
    const token = localStorage.jwtToken;
    if (token) {
      // set auth token header
      setAuthToken(token);
      verifyToken(token);
    }

    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission().then((result) => {
        console.log(result);
      });
      console.log("Notifications are supported");
    }

    // const {endpoint} = this.state;
    // //Very simply connect to the socket
    // var socket = socketIOClient(endpoint);
    // console.log(socket, 'hhh')
    // socket.on("connect", data => {console.log('socket connected!!!!!!!')})

    //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    // socket.on("connection", data => {
    //   console.log(data, 'kk')
    //   console.log(this.notificationState, 'lllllii')
    //   if(data){

    //     for(var i= 0;i=1;i++){
    //       if(this.state.notificationState === true){

    //         this.setState({
    //           notificationState: false
    //         })
    //          this.showNotification()

    //       }

    //     }

    //   }

    // });

    //   socket.on("message", data => {
    //   console.log(data, 'kk')
    //   if(data){

    //     this.showNotification()
    //   }

    // });

    //   socket.on('broadcast',function(data){
    //   console.log(data, 'jkdkjkjd')
    //  });
  }

  // showNotification() {
  //   var options = {
  //     body: "This is the body of the Notification",
  //     icon: "/images/logo_200.png?    auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     dir: "ltr",
  //     sound: "../sound.mp3",

  //   };
  //   var notification = new Notification("Notification Demo", options);
  // }

  componentDidUpdate() {
    const isAuthenticated = getAuthStatus();
    console.log(isAuthenticated);
    if (isAuthenticated) {
      this.props.push("/dashboard");
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <MyRoutes />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
