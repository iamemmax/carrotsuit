import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitPurposes, getDefaultVisitPurposes, deleteCustomizedPurpose, disableDefaultPurpose } from '../../actions/settingsActions';
import { bulkImportAccountOfficer } from '../../actions/staffActions';
import { Table, Input, CardBody, Card, Col, Row, Nav, Button, NavItem, Navbar} from 'reactstrap';
import Page from '../includes/Page';
import './message.css'
import SwalToaste from '../common/SwalToaste';


export default function Messaging() {

    const [selected, setSelected] = useState(false);
    const [purpose, setPurpose] = useState('');
    const [emailMsg, setEmailMsg] = useState('');
    const [whatsappMsg, setWhatsappMsg] = useState('');
    const [emailAttach, setEmailAttach] = useState('')
    const [whatsAppAtch, setwhatsAppAtch] = useState('')
    const [ccMail, setCcMail] = useState('')
    const [bccMail, setBccMail] = useState('')
    const [error, setError] = useState('')
    const [addPurpose, setAddPurpose] = useState('')
    const [purposeError, setPurposeError] = useState('')
    const [purposeSelectOptions, setPurposeSelectOptions] = useState([])
    const [csvFile, setCsvFile] = useState('')
   

    const dispatch = useDispatch();
    
    useEffect(() => {

      getVisitPurposess()
      
     

    }, [purpose, visitPurposes, addPurpose])




      const getVisitPurposess =  async ()=>{
        dispatch(getDefaultVisitPurposes())
        dispatch(getVisitPurposes())
       
        // setPurposeSelectOptions(visitPurposes)
       
        console.log(purposeSelectOptions)
      }

      //convert file upload to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


    const handleOptionChange = (e)=>{
        setSelected(true)
        setPurpose(e.target.value)

    }

    const handleEmailMsg = (e) =>{
    setEmailMsg(e.target.value)

    }

    const handleEmailAtch = async (e) =>{
        console.log(e.target.files[0])
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setEmailAttach({ ...emailAttach, myFile: base64 });
        

    }


    const uploadCsv = async (e) =>{
      console.log(e.target.files[0])
    const csvFile = e.target.files[0];
    // const base64 = await convertToBase64(file);
    // setCsvFile({ ...emailAttach, myFile: base64 });
    setCsvFile({file: csvFile})

    // const formData = new FormData();
    // formData.append('name', "FILENAME");
    // formData.append('file', csvFile);

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('visitorCsv', file);

    bulkImportAccountOfficer(formData)
      

  }


    const handleWhatsAppMsg = (e) =>{
        
        setWhatsappMsg(e.target.value)
    }


    const handleWhatsAppAtch = async (e) =>{

        console.log(e.target.files[0])
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setwhatsAppAtch({ ...whatsAppAtch, myFile: base64 });
        

    }

    const handleBCC = (e) =>{
        setBccMail(e.target.value)

    }


    const handleCC = (e) =>{
        setCcMail(e.target.value)

    }
    

    const handeleAddPurpose = (e)=>{
     
      setAddPurpose(e.target.value)

    }

  const handledeletePurpose = (e)=>{
    console.log(e.target.value, 'deeeellll')
    deleteCustomizedPurpose(e.target.value)

  }



const handleDisableDefaultpurpose= (e)=>{

  disableDefaultPurpose(e.target.value)


}


    const handlePurposeSubt = async()=> {


      try{
  
        await Axios.post('/api/v1/settings/add-purpose', {purpose: addPurpose}).then(response=>{
  
          console.log(response);


           SwalToaste.fire({
            icon: 'success',
            title: response.data.message
          });
              // setPurposeError(response.data.message);
  
          }
  
      )
      }catch(err){
  
        setPurposeError(err.response.data,)
        console.log(err.response.data, 'eerrrre')

        SwalToaste.fire({
          icon: 'error',
          title: err.response.data
        });
  
      }


    }

    const handleSubmit = async(e) =>{

        console.log('hereeeeeee')

        const formData = {
            // purpose: purpose,
            whatsAppAtch: whatsAppAtch,
            emailAttach: emailAttach,
            emailMsg: emailMsg,
            whatsappMsg: whatsappMsg,
            bccMail: bccMail,
            ccMail: ccMail,
            

        }


        console.log(formData, 'hhhhhhhhhhbyu')

        try{
  
            await Axios.post('/api/v1/settings/customize-messages', {formData, purpose}).then(response=>{
      
              console.log(response);
              setError(response.data.message);
      
              }
      
          )
          }catch(err){
      
            setError(err.response.data,)
            console.log(err.response.data, 'eerrrre')
      
          }


    }


    const {visitPurposes, defaultVisitPurposes } = useSelector((state) => state.settings)
    console.log(defaultVisitPurposes)
 



    useEffect(() => {

      setPurposeSelectOptions([...defaultVisitPurposes, ...visitPurposes])
     

    }, [visitPurposes, defaultVisitPurposes])

    console.log(purposeSelectOptions) 

    
  return (
    <>
     <Page title="Messagings" >
     <div>
            {purposeError}
          </div>


       <Row>

       <Col>

       <Card className="mb-3">
              <CardBody>

              <div>
                  <div>
                    Upload Account Officer Details
                  </div>
                  <div>
                  <Input type="file" onChange={uploadCsv} />
                  </div>
          </div>


              </CardBody>
      </Card>


       <Card className="mb-3">
              <CardBody>

            
              Add Purpose
              <div>
                <Input type="text" onChange={handeleAddPurpose} required />
              </div>
              <div>
                <Button  color="danger" onClick={handlePurposeSubt}>
                  Add
                </Button>
              </div>


              </CardBody>
      </Card>

      <Card className="mb-3">
              <CardBody>

    
  
    
    {/* {defaultVisitPurpoes.map(types=> <div>
      <div>
        {types.purpose}
      </div>
    </div>)} */}

    
<div style={{color: 'blue', fontSize: '1.5rem'}}>
  Default Purpose of Visits
    </div>
  

    <Table responsive>
              <thead>
                <tr>
               
                
                  <th>ID</th>
                  <th>Purpose</th>
                  <th>Disable</th>

                </tr>
              </thead>
              <tbody>
              {defaultVisitPurposes.map(types=> 
              <tr>
            {/* <div style={{display: 'flex', flexDirection: 'row', marginBottom:'1.5rem'}}> */}
                <td>

                  <div >
                  {types.id}
                  </div>
                </td>
                
                <td>
                  <div  >
                  {types.purpose}
                  </div>
                </td>
                
                <tr>
                   <Button color="danger" value={types.purpose} onClick={handleDisableDefaultpurpose}> 
                  Disable
                </Button>
                </tr>
               


          
          
          </tr>)}




              </tbody>
    </Table>

  


              </CardBody>
      </Card>


      <Card className="mb-3">
              <CardBody>
              {error}

       

        <div style={{color: 'blue', fontSize: '1.5rem'}}>
        Customized Purpose of Visits
        </div>
        <Table>

      
          <thead>
                      <tr>
                    
                      
                        <th>ID</th>
                        <th>Purpose</th>
                        <th>Disable</th>

                      </tr>
            </thead>
            <tbody>
        
            {visitPurposes.map((types, index)=>
            <tr>

              <td>
                <div >
                {index+1}
              </div>

              </td>
          
          <td>
              <div >
              {types.purpose}
              </div>
          </td>
          
              <td>
                <Button  color="danger" value={types.purpose} onClick={(e)=>handledeletePurpose(e)} > 
                  Delete
                </Button>
              </td>
          
            
          
            </tr>
              )}

        
            </tbody>

          </Table>


              </CardBody>
      </Card>


      <Card className="mb-3">
              <CardBody>


              <div style={{color: 'blue', fontSize: '1.5rem'}}>
                Customize Messaggings for Purpose of Visits
                  </div>
                <div> Select Purpose of Visit</div>
                         

            <select className="form-control" style={{marginBottom: '1rem', width: "60%", height:'2rem', paddingLeft: '1rem' }} onChange={handleOptionChange}>
            {purposeSelectOptions.map(purpose=>(
              <option value={purpose.purpose}>{purpose.purpose}</option>

            ))}

            </select>


            {selected && (

            <div> 
                <div style={{display: 'flex', flexDirection: 'row',  columnGap:'3rem'}}>
                <div>
                    Email Message
                    <div className='textarea-div'>
                    <textarea
                            rows= '5'
                            className="form-control"
                            name="message"
                            onChange={handleEmailMsg}
                            // onChange={this.handleChange}
                            // value={this.state.message}
                    />
                        {/* <textarea className="textarea-notif-wrapper" type="text" onChange={handleEmailMsg} /> */}
                    </div>
                    <div>
                        Add Attachment
                        <div>
                            <Input type="file"onChange={handleEmailAtch} />
                        </div>
                    </div>

                </div>
                <div>
                    Whatsapp Message
                    <div className='textarea-div'>
                    <textarea
                            rows= '5'
                            className="form-control"
                            name="message"
                            onChange={handleWhatsAppMsg}
                            // onChange={this.handleChange}
                            // value={this.state.message}
                    />
                        {/* <textarea className="textarea-notif-wrapper" type="text" onChange={handleWhatsAppMsg} /> */}
                    </div>
                    <div>
                        Add Attachment
                        <div>
                            <Input type="file" onChange={handleWhatsAppAtch} />
                        </div>
                    </div>
                </div>

            </div>

            <div className='notfi-div'>
              <h4>Also notify these Persons: </h4>
                
                <div>
                BCC Email: <Input type="email" onChange={handleBCC}/>
                </div>
                <div>
                VCC Email: <Input type="email" name="" id="" onChange={handleCC} />
                </div>
            </div>
            <Button color="danger" style={{marginTop: '1rem'}} onClick={handleSubmit}>
                Submit
            </Button>
            </div>

            )}


              </CardBody>
      </Card>


            
      
      

   


    

   
    


     
    {/* {visitPurposes && visitPurposes.map(purpose=>(
        <div> 
          <div>
             {purpose.purpose}
          </div>
         


        </div>

    ) )  } */}


   
               
 

    </Col>
    </Row>
    </Page>
    </>
  );
}
