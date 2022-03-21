import React, {useState, useEffect} from 'react';
import { Button, Card, CardBody, Input, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewVisitor } from '../../../actions/visitorActions';
import { sendMailMessages } from '../../../actions/staffActions';

export default function PersonalForms(props) {
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [selectedPurpose, setSelectedPurpose] = useState('')
    const [privateNote, setPrivateNote] = useState('')
    const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')



    useEffect(() => {


      console.log(props.location.state.phone_number, 'sdhsdyss,yetwetwy')

      setPhoneNumber(props.location.state.phone_number || {})
      setSelectedPurpose(props.location.state.purpose || {})
        
     
    }, [])



    const handleNoteChange = (e)=>{
        setPrivateNote(e.target.value)

    }

    const {company} = useSelector(state => state.settings) 


const dispatch = useDispatch()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const visitorData = {
            // ...data,
            phone_number: phoneNumber,
            purpose: selectedPurpose,
            company: company.id,
            name: firstName,
            email: email,
            // estate_house,
            private_note: privateNote,
            // staff,
          };


      

          // dispatch(addNewVisitor(visitorData))
        // props.history.push(`/mob-welcome-notf`);

    try{
        await addNewVisitor(visitorData).then((data) => {
          console.log(data, 'sssssssssssssssttttttttt')
  
          if (data) {
          //Send Emails To VCC and BCC
            sendMailMessages(selectedPurpose)
            console.log(data, 'check arena')
            if (data.isPhoto_required) {

              // navigate("VisitorPictureScreen", {
              //   stateData: {
              //     name: this.state.data.name || "",
              //     visit_type: this.state.purpose,
              //     staff: this.state.staff
              //   },
              // })

              console.log('photo is required')

              alert('Take photo capture on mobile')

              // props.history.push({pathname: `/personal-form`, state: visitorData });
             
            } else {

            
                  // navigate("VisitorSuccessView", {
                  //             stateData: {
                  //               name: this.state.data.name || "",
                  //               visit_type: this.state.purpose,
                  //                staff: this.state.staff
                  //             },
                  //           })

                  console.log('jheeeeeeeeeeerrrrrrrrrrrrreeeeeeeeeeee')

                  props.history.push({pathname: `/mob-welcome-notf`, state: visitorData });
  
            }
          }
        });

      }catch(err){
        console.log(err)
      } 

    }


    const renderSpinner = () => {
      return (
        <div className="spinner-border text-light spinner-border-sm" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    };



  return <div>

    <Card>
        <CardBody style={{display: 'flex', flexDirection: 'column', rowGap: '1rem', justtifyContents: 'center', alignItems: 'center'}}>
  

                <div >
                        <div>
                        <label>Email</label>
                           <Input  className="form-control" required  onChange={(e)=> setEmail(e.target.value) }  />
                        </div>
                    <div>
                        <label>                   Name</label>
                       <Input  className="form-control" required onChange={(e)=> setFirstName(e.target.value) } />
                    </div>
                    {/* <div>
                        <label>Last Name</label>
                       <Input  className="form-control" required  onChange={(e)=> setLastName(e.target.value) }  />
                    </div> */}
                    <div>
                        <label>Host</label>
                       <Input  className="form-control" />
                    </div>
                    <div>
                        <label>private note</label>
                       {/* <Input   className="form-control" /> */}
                    <textarea
                            rows= '5'
                            className="form-control"
                            name="message"
                            onChange={handleNoteChange}
                            // value={this.state.message}
                    />
                    </div>

                </div>

              
            
            <Button color="danger" onClick={handleSubmit} >Submit</Button>
            {/* <Button color="danger">{isLoading ? renderSpinner() : 'Next'}</Button> */}
          
         

          </CardBody>
</Card>


  </div>;
}
