import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import jwt_decode from "jwt-decode";
import PhoneInput from 'react-phone-input-2';
import { Button, Card, CardBody, Row } from 'reactstrap';
import { checkVisitorClone } from '../../../actions/visitorActions';
import { useSelector } from 'react-redux';

export default function VisitorPhoneForm(props) {

  const [phoneNumber, setPhoneNumber] = useState()
 const [selectedOption, setSelectedOption] = useState('')
  // const [purposeOptions, setPurposeOptions] = useState(['Customer', 'Contractor', 'Deliveries', 'Consultant', 'Interview', 'Others']),

const [purposeOptions, setpurposeOptions] = useState(['Customer', 'Contractor', 'Deliveries', 'Consultant', 'Interview', 'Others'])
    useEffect(() => {

      console.log('sdkskks')
      // const {company} = useSelector(state => state.settings) 

        // const query = queryString.parse(props.location.search);

       

        //   const token = new URLSearchParams(query).get('token');

        //   if(token){

        //     getToken(token)
             

        //   }
          


    
   
        

     
    }, [])


    const getToken = async(token)=>{
        try{
            console.log(token, 'kdsskll')
                  var decoded = jwt_decode(token);
                  console.log(decoded)

        }catch(err){

          console.log(err, 'errrr')
        }
      

    }


    const numberchange = (phone_number) =>{
      setPhoneNumber(phone_number)
      console.log(phoneNumber, 'hhh')

    }

    const handlePurposeChange = (e) =>[
      setSelectedOption(e.target.value)

    ]

    const handleSubmit = async() =>{

      const data = {
        phoneNumber,
        selectedOption
      }
      console.log('shhsshshuyutete')
      



      try{
        await checkVisitorClone(phoneNumber, selectedOption).then(res=>{
          console.log(res, 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrreeeeeeeeee')
  
  
                         if (res.isNewVisitor) {
  
                            const data = {
                              phone_number: phoneNumber,
                              purpose: selectedOption,
                              // const estate_house = data.estate_house || ''
                              // const company = data.company

                            }
                            console.log(data, 'djkdsjks')
                          props.history.push({pathname: `/personal-form`, state: data });
                          // navigation.navigate("VisitorPersonalsScreen", {
                          //   stateData: {
                          //     phone_number,
                          //     company,
                          //     estate_house,
                          //     visit_type: data.selectedOption,
                          //   },
                          // });
  
  
                        } else{
                        console.log('777777')
                          // navigate to next screen and pass state data from redux
  
                            const data = {
                              phoneNumber: phoneNumber,
                              purpose: selectedOption,
                              // const phone_number = data.phone_number
                              // const estate_house = data.estate_house || ''
                              // const company = data.company

                            }

                            
                            
                            props.history.push({pathname: `/returnee-form`, state: data });
                          // navigation.navigate("VisitorReturningScreen", {
                          //   stateData: {
                          //     phone_number,
                          //     company,
                          //     estate_house,
                          //     avatar: data.avatar,
                          //     visit_type: data.selectedOption,
                          //   },
                          // });
  
  
                        }
  
  
          })


      }catch(err){
        console.log(err, 'shshhjs')
      }
    }


    console.log('jdjjd')
    // const {company} = useSelector((state) => state.staff)
    const {company} = useSelector(state => state.settings) 

    // const {user} = useSelector(state => state.auth) 

    console.log(company, 'jdkshjsywu')

    // var country 
    // if(company.country){

    // }



  return <div>

    <Card>

      <CardBody style={{display: 'flex', flexDirection: 'column', rowGap: '1rem', justtifyContents: 'center', alignItems: 'center'}}>
     
        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center'}} >

            <PhoneInput
            // style={{placeSelf: 'center'}}
                    
                    country={company.country? company.country.toLowerCase(): 'us'}
                    value={phoneNumber}
                    onChange={phoneNumber => numberchange(phoneNumber) }
                    // required: true
          />
        </div>
          


        <select  className="form-control" style={{width: '30%'}} onChange={handlePurposeChange} required >
          {purposeOptions && purposeOptions.map((option)=> 
            <option value={option} >{option}</option>
          )}
        
        </select>

        <Button style={{width: "30%", marginTop: '1rem'}} color="danger" onClick={handleSubmit} >Next</Button>
      
      

      </CardBody>
    </Card>



  </div>;
}
