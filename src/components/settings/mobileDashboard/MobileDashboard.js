import React, {useState, useEffect} from 'react'
import { Button, Col, Row } from 'reactstrap';
import { mobileColorUpdate } from '../../../actions/settingsActions';
import colors from './colors';

export default function MobileDashboard() {

    //colors


    // const [color, setColor] = useState({
    //     welcome_text : '',
    //     checkin_btn_outline: '',
    //     checkin_btn_text: '',
    //     checkout_

    // })

// const [data, setData] = useState(initialState)

    const [color, setColor] = useState('')
    const [welcomeText, setWelcomeText] = useState('')
   const [checkInBtnOutline, setCheckInBtnOutline] = useState('');
   const [checkInBtnText, setCheckInBtnText] = useState('')
   const [checkOutBtnText, setCheckOutBtnText] = useState('')
   const [inviteeBtnTextColor, setInviteeBtnTextColor] = useState('')
   const [employeeBtnText, setEmployeeBtnText] = useState('')
   const [checkOutBtnBackground, setCheckOutBtnBackground] = useState('')
   const [employeeBtnBackground, setEmployeeBtnBackground] = useState('')
   const [inviteeBtnBackground, setInviteeBtnBackground] = useState('')


    useEffect(() => {
      
    }, [color])

   const handleWelmTxt = (e)=>{
       const value = e.target.value
    setWelcomeText(value)
    setColor(value)

   }

   const submitwelTxt = (e) =>{

    var welcome_text_color = 'welcome_text_color'
    mobileColorUpdate(welcomeText, welcome_text_color)


   } 

   const handleChkInBtnOutline = (e)=>{
    const value = e.target.value
    setCheckInBtnOutline(value)
    setColor(value)

    }
    
    const submitChInBtOut = (e) =>{

        var checkin_btn_outline_color = 'checkin_btn_outline_color'
        mobileColorUpdate(checkInBtnOutline, checkin_btn_outline_color)
    
    
    } 


const handleChkInBtnTxt = (e)=>{
    const value = e.target.value
    setCheckInBtnText(value)
    setColor(value)

}

    const submitChInBtTxt = (e) =>{

    var checkin_btn_text_color = 'checkin_btn_text_color'
    mobileColorUpdate(checkInBtnText, checkin_btn_text_color)


} 

const handleChkOutBtnTxt = (e)=>{
    const value = e.target.value
    setCheckOutBtnText(value)
    setColor(value)

}

const submitChkOutBtnTxt = (e) =>{

    var checkout_btn_text_color = 'checkout_btn_text_color'
    mobileColorUpdate(checkOutBtnText, checkout_btn_text_color)


} 



const handleInviteeBtnColor = (e)=>{
    const value = e.target.value
    setInviteeBtnTextColor(value)
    setColor(value)

}


const submitInviteeBtnTxt = (e) =>{

    var invitee_btn_text_color = 'invitee_btn_text_color'
    mobileColorUpdate(inviteeBtnTextColor, 	invitee_btn_text_color)


} 

const handleEmployeeBtnTxt = (e)=>{
    const value = e.target.value
    setEmployeeBtnText(value)
    setColor(value)

}


const submitEmplyBtnTxt = (e) =>{

    var employee_btn_text_color = 'employee_btn_text_color'
    mobileColorUpdate(employeeBtnText, employee_btn_text_color)


} 


const handleCheckoutBtnBg = (e)=>{
    const value = e.target.value
    setCheckOutBtnBackground(value)
    setColor(value)

}


const submitCkOutBtnBg = (e) =>{

    var checkout_btn_bg_color = 'checkout_btn_bg_color'
    mobileColorUpdate(checkOutBtnBackground, checkout_btn_bg_color)


} 


const handleEmployeeBtnBg = (e)=>{
    const value = e.target.value
    setEmployeeBtnBackground(value)
    setColor(value)

}



const submitEmplyBtnBg = (e) =>{

    var employee_btn_bg_color = 'employee_btn_bg_color'
    mobileColorUpdate(employeeBtnBackground, employee_btn_bg_color)


} 


const handleInviteeBtnBg = (e)=>{
    const value = e.target.value
    setInviteeBtnBackground(value)
    setColor(value)

}




const submitInviteeBtnBg = (e) =>{

    var invitee_btn_bg_color = 'invitee_btn_bg_color'
    mobileColorUpdate(inviteeBtnBackground, invitee_btn_bg_color)


} 




   

   console.log(color, 'jjjjuuuuuuuuuuu')
    return (
        <div>
            <div>Color Preview</div>
            <div style={{backgroundColor: `${color}`, height: '80px', width: "80px", border: '2px solid black'}}>  - </div>

        <div>
            
        </div>
        <Row>
            <Col>
            
                <div>Welcome Text</div>

                <div>
                <input type='text' onChange={(e)=> handleWelmTxt(e)} />
                </div>
                
                {/* <select className='form-control' style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={(e)=> handleWelmTxt(e) } >
                    
                    <option></option>
                    {colors.map(color => 
                        <option value={color.color} >{color.color}</option>
                        
                    )}
                </select> */}
                <Button color='danger' onClick={submitwelTxt}>
                    Save</Button>
                
            </Col>
            
            <Col>
                <div>Check In Button Outline</div>

                <div>
                <input type='text' onChange={(e)=> handleChkInBtnOutline(e) } />
                </div>
                
                {/* <select className='form-control' style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={(e)=> handleChkInBtnOutline(e) } >
                    
                    <option></option>
                    {colors.map(color => 
                        <option value={color.color} >{color.color}</option>
                        
                    )}
                </select> */}
                <Button color='danger'  onClick={submitChInBtOut} >
                    Save</Button>
            
            
            
            </Col>
            <Col>
                <div>Check In Button Text</div>


                <div>
                <input type='text' onChange={(e)=> handleChkInBtnTxt(e) } />
                </div>

                {/* <select className='form-control' style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={(e)=> handleChkInBtnTxt(e) } >
                    
                    <option></option>
                    {colors.map(color => 
                        <option value={color.color} >{color.color}</option>
                        
                    )}
                </select> */}
                
                <Button color='danger'  onClick={submitChInBtTxt} >
                    Save</Button>
            
            
            </Col>
            <Col>
                <div>Check Out Button Text</div>

                <div>
                <input type='text' onChange={(e)=> handleChkOutBtnTxt(e) } />
                </div>
                
                {/* <select className='form-control' style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={(e)=> handleChkOutBtnTxt(e) } >
                    
                    <option></option>
                    {colors.map(color => 
                        <option value={color.color} >{color.color}</option>
                        
                    )}
                </select> */}


                <Button color='danger'  onClick={submitChkOutBtnTxt} >
                    Save</Button>
            
                
            
            </Col>
         

     
        </Row>   
        {/* ////////row end ////////// */}
        <Row>
        <Col>
                <div>Invitee Button Text Color</div>


                <div>
                <input type='text' onChange={(e)=> handleInviteeBtnColor(e) } />
                </div>


                {/* <select className='form-control' style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={(e)=> handleInviteeBtnColor(e) } >
                    
                    <option></option>
                    {colors.map(color => 
                        <option value={color.color} >{color.color}</option>
                        
                    )}
                </select> */}

                <Button color='danger'  onClick={submitInviteeBtnTxt} >
                    Save</Button>
            
            
            
            </Col>
        
        <Col>
            <div>Employee Button Text </div>

            <div>
                <input type='text' onChange={(e)=> handleEmployeeBtnTxt(e) } />
                </div>

            {/* <select className='form-control' style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={(e)=> handleEmployeeBtnTxt(e) } >
                
                <option></option>
                {colors.map(color => 
                    <option value={color.color} >{color.color}</option>
                    
                )}
            </select> */}
            <Button color='danger'  onClick={submitEmplyBtnTxt} >
                    Save</Button>
        
        
        
        </Col>
        <Col>
            <div>Check Out Button Background</div>
            <div>
                <input type='text' onChange={(e)=> handleCheckoutBtnBg(e) } />
                </div>

            {/* <select className='form-control' style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={(e)=> handleCheckoutBtnBg(e) } >
                
                <option></option>
                {colors.map(color => 
                    <option value={color.color} >{color.color}</option>
                    
                )}
            </select> */}
            <Button color='danger'  onClick={submitCkOutBtnBg} >
                    Save</Button>
        
        
        
        </Col>
        <Col>
            <div>Employee Button Background</div>

            <div>
                <input type='text' onChange={(e)=> handleEmployeeBtnBg(e) } />
                </div>

            {/* <select className='form-control' style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={(e)=> handleEmployeeBtnBg(e) } >
                
                <option></option>
                {colors.map(color => 
                    <option value={color.color} >{color.color}</option>
                    
                )}
            </select> */}
            <Button color='danger'  onClick={submitEmplyBtnBg} >
            Save</Button>
        
        
        
        </Col>
          
        </Row>
        <Row>
        <Col>
                <div>Invitee Button Background</div>

                <div>
                <input type='text' onChange={(e)=> handleInviteeBtnBg(e) }/>
                </div>

                {/* <select className='form-control' style={{marginBottom: '1rem', width: '10rem', height:'3rem', paddingLeft: '1rem' }} onChange={(e)=> handleInviteeBtnBg(e) } >
                    
                    <option></option>
                    {colors.map(color => 
                        <option value={color.color} >{color.color}</option>
                        
                    )}
                </select> */}
            
                <Button color='danger'  onClick={submitInviteeBtnBg} >
            Save</Button>
                
            </Col>
        </Row>


        </div>
    )
}
