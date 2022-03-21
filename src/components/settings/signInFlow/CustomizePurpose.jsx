import React from 'react';
// import { ToggleButton } from './customizeFormFields/ToggleButton';
import { ToggleButton } from '../configs/customizeFormFields/ToggleButton';
import { useState, useEffect } from 'react';
import './styles/CustomizePurpose.css'
import Axios from 'axios';
import { Table, Input, CardBody, Card, Col, Row, Nav, Button, NavItem, Navbar} from 'reactstrap';
// import Page from '../includes/Page';

export default function CustomizePurpose() {

  const [selected, setselected] = useState(false)
  const [purpose, setPurpose] = useState('')
  const [toggleSelectName, setToggleSelectName] = useState(true);
  const [toggleValueName, settoggleValueName] = useState('name')
  const [toggleSelectRole, setToggleSelectRole] = useState(true);
  const [toggleValueRole, settoggleValueRole] = useState('role');
  const [roleDisplay, setRoleDisplay] = useState(false)
  const [toggleSelectLastName, setToggleSelectLastName] = useState(true);
  const [toggleValueLastName, settoggleValueLastName] = useState('last_name');
  const [toggleSelectHost, setToggleSelectHost] = useState(true);
  const [toggleValueHost, setToggleValueHost] = useState('false');
  const [textFieldName, setTextFieldName] = useState('');
  const [error, setError] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [displayFieldName, setdisplayFieldName] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [displayCheckBpx, setDisplayCheckBpx] = useState(false)
  const [displayActNot, setDisplayActNot] = useState(false)

  const [selectFieldName, setselectFieldName] = useState('')
  const [selectFieldOptions, setSelectFieldOptions] = useState([])
  const [selectOption, setselectOption] = useState('')
  const [checkBxName, setcheckBxName] = useState('')

  const [checkState, setCheckState] = useState(false);
  const [nofifyAcctOff, setNofifyAcctOff] = useState(false)



  useEffect(() => {
    console.log(purpose, 'effect')
    console.log(toggleValueName, 'effectl')
    console.log(toggleValueHost, 'effectl')
  }, [purpose, toggleSelectName, toggleValueName, textFieldName, fieldType])


  const handleOptionChange = (e) =>{
    console.log(e.target.value)
    // setPurpose(e.target.value)
    // setselected(true)



    if(e.target.value === 'Interview'){
      setRoleDisplay(true)
      setPurpose(e.target.value)
    setselected(true)
    setDisplayActNot(false)

    }else if(e.target.value === 'Client'){
      setDisplayActNot(true)
      setselected(true)
      setPurpose(e.target.value)

    }else{

      setRoleDisplay(false)
      setPurpose(e.target.value)
      setselected(true)
      setDisplayActNot(false)



    }
    console.log(purpose)
   
    console.log(e, 'kkkkkkkkkkk')

  }


  const handleActOffNot = (e)=>{
    var value = e.target.value

    setCheckState(true)
    console.log(e.target.checked, 'cccccc')

    if(e.target.checked === true){
        console.log('hhhhhh')
      setNofifyAcctOff(true)


    }else{

      setNofifyAcctOff(false)


    }

  }

  console.log(nofifyAcctOff, 'kkk')

  const handleTextFieldNameChange = (e) =>{
    setTextFieldName(e.target.value);

  }

  const hangleFieldTypeChange = (e) =>{
    console.log(e.target.value)
    setFieldType(e.target.value);

    if(e.target.value === 'Text'){
    setdisplayFieldName(!displayFieldName)
    setDisplayCheckBpx(false)
    setDisplayOptions(false)


  }else if (e.target.value === 'Select'){
    setDisplayOptions(!displayOptions)
    setDisplayCheckBpx(false)
    setdisplayFieldName(false)
    
  }
  else if(e.target.value === 'Check Box'){
      setDisplayCheckBpx(!displayCheckBpx)
      setDisplayOptions(false)
      setdisplayFieldName(false)
  }
}

const handleSelectFieldNameChange = (e)=>{
setselectFieldName(e.target.value)

}

const handleSelectOptions = (e) =>{
setselectOption(e.target.value)

}


const handleSelectOptionAdd= ()=>{

  setSelectFieldOptions(selectFieldOptions => [...selectFieldOptions,selectOption] );
  // setSelectFieldOptions([[...selectFieldOptions], [...selectOption]])
}


const handleRemoveOption = (e)=>{
  var value = e.target.value
  console.log(value)
  
  setSelectFieldOptions(selectFieldOptions.filter(e => e !== value))
}




const handleCheckBxFieldNameChange = (e) =>{

  setcheckBxName(e.target.value)
}


const handleChbxFieldSubmit = async(e)=>{

  const FormData = {
    // field_type: fieldType, //remove,  it's a select field
    
    type: 'check box',
    notifyAccountOfficer: nofifyAcctOff,
    
    checkBxName: checkBxName
  }
  console.log(checkBxName, 'llllll')

  try{
  
    await Axios.post('/api/v1/settings/purpose-form-field', {FormData,purpose }).then(response=>{

      console.log(response);
      setError(response.data.message);

      }

  )
  }catch(err){

    setError(err.response.data,)
    console.log(err.response.data, 'eerrrre')

  }


}



const handleSelectFieldSubmit = async()=>{
  
  const formData = {
    // field_type: fieldType, //remove, we all knw it's a select field
    // selectFieldOptions: selectFieldOptions,
    purpose: purpose,
    selectFieldName: selectFieldName,
    notifyAccountOfficer: nofifyAcctOff,
    type: 'select'
  }


  try{
  
    await Axios.post('/api/v1/settings/option-custom-fields', {formData, selectFieldOptions }).then(response=>{

      console.log(response);
      setError(response.data.message);

      }

  )
  }catch(err){

    setError(err.response.data,)
    console.log(err.response.data, 'eerrrre')

  }
  

}

console.log(selectFieldOptions)
  const handleTextFieldSubmit = async()=>{

    const FormData = {
      // field_type: fieldType,
      // name: toggleValueName,
      // last_name : toggleValueLastName,
      textFieldName: textFieldName,
      notifyAccountOfficer: nofifyAcctOff,
      type: 'text'
      // toggleValueHost: toggleValueHost
    }


    console.log(FormData, 'formDTA')

    try{
  
      await Axios.post('/api/v1/settings/purpose-form-field', {FormData, purpose}).then(response=>{

        console.log(response);
        setError(response.data.message);

        }

    )
    }catch(err){

      setError(err.response.data,)
      console.log(err.response.data, 'eerrrre')

    }
    
    
  }





  return (




    <>

    <select className='form-control' style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={handleOptionChange}>
      <option value="Interview">Job Applications/Interview</option>
      <option value="Consultant">Partner/Consultant</option>
      <option value="Visit">Visit</option>
      <option value="Client">Client</option>
      <option value="Deliveries">Deliveries</option>
    </select>

    <div style={{color: 'red'}}>
        {error}
    </div>
   
    {selected && <div>

     <div style={{fontWeight: 800}}>Select Related Fields</div> 

    {displayActNot && <div>

      Enable : Notify My Account Officer : <input type="checkbox" defaultChecked={checkState} onChange={handleActOffNot} />
      
      
      </div>}

{/* 
     <select style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={handleOptionChange}>
      <option value="input">Interview</option>
      <option value="Consultant">Consultant</option>
      <option value="Visit">Visit</option>
      <option value="Deliveries">Deliveries</option>
    </select> */}

     <div className='flex-row'> Name 
     
     <ToggleButton
            selected={toggleSelectName}
            toggleSelected={() => {
              // setSelected(!selected);this.setState({name: 'name'});

              setToggleSelectName(!toggleSelectName)
            toggleSelectName? settoggleValueName('') : settoggleValueName('name')
              
         

            //   const formData = [{
            //     field:this.state.role

            //     }
            //   ]

            //   this.state.selectedRole? interviewRole(formData) : interviewRole(formData)
            //  console.log(this.state.role)
             
            }}
            />
     
     
     
    </div>



    <div className='flex-row'> last name  
      <ToggleButton
            selected={toggleSelectLastName}
            toggleSelected={() => {
              // setSelected(!selected);this.setState({name: 'name'});

              setToggleSelectLastName(!toggleSelectLastName)
            toggleSelectLastName? settoggleValueLastName('') : settoggleValueLastName('last_name')
            
             
            }}
            />

      </div>  

    {roleDisplay &&     
        <div className='flex-row'> Role 
            <ToggleButton

                  selected={toggleSelectRole}
                  toggleSelected={() => {
                    // setSelected(!selected);this.setState({name: 'name'});

                    setToggleSelectRole(!toggleSelectRole)
                  toggleSelectRole? settoggleValueRole('') : settoggleValueRole('role')
                  
                  
                  }}
                  />

      </div> }
  

      

      <div className='flex-row'> Disable Host  
      <ToggleButton
            selected={toggleSelectHost}
            toggleSelected={() => {
              // setSelected(!selected);this.setState({name: 'name'});

              setToggleSelectHost(!toggleSelectHost)
              // setToggleValueHost(!toggleValueHost) 
            toggleSelectHost? setToggleValueHost('true') : setToggleValueHost('false')
            console.log(toggleValueHost, 'effectl')
             
            }}
            />

      </div>

        Select Field Type
      <select className='form-control' name="" id="" onChange={hangleFieldTypeChange}>
        <option value="Text">Text</option>
        <option value="Check Box">Check Box</option>
        <option value="Select">Select</option>

      </select>


            <div>
              {selectFieldOptions.map(option=>(
                <div style={{display: 'flex', flexDirection: 'row'}}>

                  <div style={{fontSize: '1.5rem'}}>
                      {option}
                  </div>
                

                  <div>
                    <button style={{fontSize: '1.5rem', color: 'red', backgroundColor: 'white', border: 'none'}} value={option} onClick={handleRemoveOption}>
                      X
                    </button>
                   
                  </div>
                </div>
                
              ))}
            </div>
      {displayOptions && <div>


        <div>
           <Input type="text" onChange={handleSelectOptions} />
        </div>
        <div>
        <Button color='danger' onClick={handleSelectOptionAdd}>
          Add Options</Button>
        </div>


        <div  style={{fontSize: '1rem', fontWeight: 800, marginBottom: '.5rem', marginTop: '1rem'}}>
            
            ADD OPTION FIELD NAME
          </div>
          <div>
            <div>
              <Input type="text" onChange={handleSelectFieldNameChange}/>
            </div>
          
            <Button color='danger' onClick={handleSelectFieldSubmit}  >
              Save
            </Button>
          </div>
        
       
        
        </div>}
      
      {displayFieldName && 
      <div>

          <div  style={{fontSize: '1rem', fontWeight: 800, marginBottom: '1rem'}}>
            ADD TEXT FIELD NAME
          </div>
          <div>
            <div>
              <Input type="text" onChange={handleTextFieldNameChange}/>
            </div>
          
            <Button onClick={handleTextFieldSubmit} style={{fontSize: '1rem', backgroundColor: 'red', marginTop: '1rem', borderRadius: '5px', color: 'white'}} >
              Save
            </Button>
          </div>

      </div>
      
      
      }



    {displayCheckBpx && 
      <div>

          <div  style={{fontSize: '1rem', fontWeight: 800, marginBottom: '1rem'}}>
            ADD CHECK BOX NAME
          </div>
          <div>
            <div>
              <Input type="text" onChange={handleCheckBxFieldNameChange}/>
            </div>
          
            <Button onClick={handleChbxFieldSubmit} style={{fontSize: '1rem', backgroundColor: 'red', marginTop: '1rem', borderRadius: '5px', color: 'white'}} >
              save
            </Button>
          </div>

      </div>
      
      
      }

      
      
    </div>}




    


    
    </>
  );
}
