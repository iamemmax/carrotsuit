import React, {useState} from 'react';
import { Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css'
import PhoneInput from 'react-phone-input-2';
import { getCheckedInVisitor } from '../../../actions/visitorActions';
import { getCompany } from '../../../actions/settingsActions';

export default function VisitorCheckOut(props) {

  const [phoneNumber, setPhoneNumber] = useState()


  const dispatch =useDispatch()
  // const dispatch = useDispatch()

  const numberchange = (value, country) =>{
    setPhoneNumber(value)
    setPhoneNumber(`+${value}`)
    // console.log(phoneNumber, 'hhh')


  
   

    
  }


  const handleNext = ()=>{

    console.log(phoneNumber, 'dowie')

    dispatch(getCheckedInVisitor(phoneNumber));

    // dispatch(getCompany())
    props.history.push({pathname: `/mob-signout`});
  }

  const {company} = useSelector(state => state.settings) 

  return <div>

    <Card>
          <CardBody>
              {/* <div> <input style={{border: '2px solid black'}} className='form-control'/> </div>

              <div className='row'>
                  <button className='button btnChk1'>Check In </button>
                  <button className='button btnChk1' >Check Out</button>

              </div> */}

        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center'}} >

              <PhoneInput
              // style={{placeSelf: 'center'}}
                      // country= {'us'}
                      country={company.country? company.country.toLowerCase(): 'us'}
                      value={phoneNumber}
                      onChange={(value, country) => numberchange(value, country) }
                      // required: true
              />
          </div>

          <div style={{marginTop: '2rem'}}>
            <button className='next-button' onClick={handleNext} >Next</button>
          </div>

          </CardBody>
      </Card>


  </div>;
}
