import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Row } from 'reactstrap';
import { MobsignVisitorOut, signVisitorOut } from '../../../actions/visitorActions';
import Toaste from '../../../components/common/SwalToaste'

export default function VisitorSignOut(props) {


  const signout = (e)=> {
    e.preventDefault();
     console.log(checkedInVisitor.visitor, "llllllid ")
 //             dispatch(signVisitorOut(checkedInVisitor.id));
 MobsignVisitorOut(checkedInVisitor.visitor)
           .then(data => {
           console.log(data, 'datatatat')
             if (data) {

              console.log(data.data, 'kjwgqwgyq')
              if(data.data === null){
                console.log('nullll')
              }else{
                console.log('not null')
                props.history.push({pathname: `/mobile-dashboard` });

              }
              // props.history.push({pathname: `/personal-form`, state: data });
             
              //  toggleModal();
              //  setTimeout(handleOkClick, 3000)
             }
           })
           .catch(err => {
           console.log(err, 'eerrurur')
           
            // SwalToaste.fire({
            //   icon: 'error',
            //   title: err.response.data
            // });

             alert("Ooops! Unauthorized" ,`${err.response.data} Unauthorized`);
            //  navigation.navigate("Dashboard");
           });
 
 //       .then(data => {
 //         if (data) {
 //           toggleModal();
 //           setTimeout(handleOkClick, 3000)
 //         }
 //       })
 //       .catch(err => {
 //         Alert.alert("Ooops!", err.response.data);
 //         navigation.navigate("VisitorDashboardScreen");
 //       });
    }

  const {checkedInVisitor, checkedInVisitorRetrieved} = useSelector((state) => state.visitor)



  return <div>
    {checkedInVisitor? <Card>
      <Row>
        <div>
          <img></img>
        </div>
        <div>{checkedInVisitor.name} </div>
        <div>{new Date(checkedInVisitor.date).toLocaleString()}</div>
        <div>
          <button onClick={signout} >Signout</button>
        </div>
      </Row>

      </Card> 
    :
  <div>
    Visitor Not Found
  </div> }
      
  </div>
}
