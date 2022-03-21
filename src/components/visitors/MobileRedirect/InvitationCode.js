import React, {useState} from 'react';
import { Card, CardBody } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { inviteeSignIn } from '../../../actions/visitorActions';

export default function InvitationCode(props) {

    const [uid, setUid] = useState('')


const dispatch = useDispatch()
    const handleSignIn = async() =>{

        try{
    
    
         if(uid.length === 0){

            alert('Input Data')

    //      setAlertColor('red')
    //   setShowAlert(true)
    //             setError('Input Data')
    
    
          }else{
    
    
              const data =  await dispatch(inviteeSignIn(uid))
    
    
    
    
                if(data){

                    console.log('data')

                    alert('Successful ')
    // //               toggleModal();
    //                 setAlertColor('green')
    //                  setShowAlert(true)
    //                  setError('Successful ')
    
    
    //               navigation.navigate('VisitorDashboardScreen', {
    //                 stateData: {
    //                         name: "",
    //                 }});
                }
    
          }
    
    
    
        }catch(err){
    
    
        console.log(err.response.data, 'jjjjjjjjjjj')
    
            if(err.response.data){
    
            alert(err.response.data)
            // setError(err.response.data)
    
            }else{
                alert('Input Data')
            //  setError('Input Data')
            }
    
                // alert()
            //  setAlertColor('red')
            //     setShowAlert(true)
    
    
    
    //       setTimeout(() => setShowAlert(false), timeOut)
    
    //       Alert.alert("Ooops!", err.response.data);
    //       toggleModal();
    
        }
    
      }


  return <div>

       <Card>
          <CardBody>
              <div>UID</div>
              <div> <input style={{border: '2px solid black'}} onChange={(e)=> setUid(e.target.value)} className='form-control'/> </div>

              <div className='row'>
                  <button className='button btnChk1' onClick={handleSignIn} >Check In </button>
                  <button className='button btnChk1' onClick={()=> props.history.push({pathname: `/mobile-dashboard`})} >Cancel</button>

              </div>
          </CardBody>
      </Card>

  </div>;
}
