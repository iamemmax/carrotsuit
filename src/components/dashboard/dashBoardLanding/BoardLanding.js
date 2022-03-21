// navigator.serviceWorker.register('sw.js');
import React, { Component } from 'react';

import PieCharts from '../PieCharts';
import GeneralStats from '../GeneralStats';
import MonthlyStats from '../MonthlyStats';
import LastMonthStats from '../LastMonthStats';
import MostVisited from '../MostVisited';
import BusiestStats from '../BusiestStats';
import socketIOClient from "socket.io-client";
import addNotification from 'react-push-notification';


import NotificationAlert from 'react-notification-alert';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEvents } from '../../../actions/eventsActions';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';


// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

// import Notification from "react-web-notification";



const CustomToastWithLink = () => (
  <div>
    <Link to="/dashboard">This is a link</Link>
  </div>
);



class BoarderLanding extends Component {

  constructor() {
    super();
    
    this.state = {
      // endpoint: "https://api.carrotsuite.space",
      //  endpoint: "http://localhost:5000",
       endpoint: "/",
      notificationState: true
    }

    this.buttonClick = this.buttonClick.bind(this);
    this.letsToast = this.letsToast.bind(this);

    
  }


  



 
  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission().then(result=>{
        console.log(result);
      });
      // dom.webnotifications.enabled = false
      console.log("Notifications are supported");
    }


    const {endpoint} = this.state;
    //Very simply connect to the socket
    var socket = socketIOClient(endpoint);
    console.log(socket, 'hhh')
    
    socket.on("connect", data => {console.log('socket connected!!!!!!!')})
    // socket.on("message", data => {this.showNotification(data);console.log('socket connected!!!!!!!')})
    
    
    // const registration = runtime.register();
    socket.on("broadcast", data => {
      // console.log(this.state.notificationState, 'pppppppppkk')
      // console.log(data, 'koooooooook')

      // const options = {
      //   body: data,
      // }

      if(data){
        if(this.state.notificationState){
          // this.showNotification(data)
          // registration.showNotification(data, options)
          // this.setState({
          //   notificationState: false
          // })

          this.buttonClick(data)
        }
       
      }
     
        });
    }




    buttonClick = (data) => {

      // serviceWorkerRegistration.showNotification(title, [options]);

      // new Notification('Hey')
      new addNotification({
          title: 'You have a new Visitor',
          subtitle: 'Hello',
          message: data.message,
          theme: 'darkblue',
          icon: "/images/favicon.ico?    auto=compress&cs=tinysrgb&dpr=1&w=500",
          native: true, // when using native, your OS will handle theming,
          onClick: (e)=>{window.open(data.url)},
          position: 'bottom-right'
      });
    };


    letsToast = () => {
      toast.info(CustomToastWithLink);
    };



    
  


  // showNotification(data) {
  //   var options = {
  //     title: data.message,
  //     body: data.url,
  //     icon: "/images/logo_200.png?    auto=compress&cs=tinysrgb&dpr=1&w=500",
  //     dir: "ltr",
  //     sound: "../sound.mp3",
  //     position: 'bottom-right',
  //     onClick: (e)=>{window.open("https://google.com")}
  //   };
  //   var notification = new Notification(`${data.message}`, options);
  // }


  render() {

    const SweetAlert = withSwalInstance(swal);

  
    return (
      <div>

    <button onClick={() => this.setState({ show: true })}>Alert</button>
      <SweetAlert
        show={this.state.show}
        title="Demo"
        text="SweetAlert in React"
        onConfirm={() => this.setState({ show: false })}
      />


      <button type="button" onClick={this.letsToast}>
        Toast!
      </button>


{/* 
        <NotificationAlert ref="notify" zIndex={9999} onClick={(e)=>{window.open(`${this.state.url}`)}} />
        <button onClick={() => this.myFunc()}>Hey</button> */}

        {/* <ToastContainer
        position="bottom-right"
        // autoClose={false}
        onCLick = {(e)=>{window.open("https://google.com")}}
        /> */}

      {/* <Notification
          ignore={this.state.ignore && this.state.title !== ""}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}
          swRegistration={this.props.swRegistration}
        /> */}

        <GeneralStats history= {this.props.history} />
        <br />
        <PieCharts />
        <br />
        <MonthlyStats />
        <br />
        <LastMonthStats />
        <br />
        <MostVisited />
        <br />
        <BusiestStats />
        <div>
        {/* <button onClick={this.notify()} >
          Click to show notification
        </button> */}
      </div>
      </div>
    );
  }
}

export default BoarderLanding;
