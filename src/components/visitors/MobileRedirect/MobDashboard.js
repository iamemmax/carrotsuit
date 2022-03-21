import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../actions/authActions';
import queryString from 'query-string';
import Login from '../../auth/Login';
import jwt_decode from "jwt-decode";
import { Button, Card, CardBody, Row } from 'reactstrap';
import { getCompany, getSlideImages, getSlideImagesMobDashboard } from '../../../actions/settingsActions';
import { getMobStaff, getStaff } from '../../../actions/staffActions';
import validateColor from "validate-color";
import './styles.css'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


export default function MobDashboard(props) {

  const [timeOut, setTimeOut] = useState(5000);

  const [checkin_btn_outline_colo, setCheckin_btn_outline_colo] = useState('#00471e');
  const [checkin_btn_text_colo, setCheckin_btn_text_colo] = useState('#00471e');
  const [checkout_btn_bg_colo, setCheckout_btn_bg_colo] = useState('black');
   const [checkout_btn_text_colo, setCheckout_btn_text_colo] = useState('white');
    const [employee_btn_bg_colo, setEmployee_btn_bg_colo] = useState('#8c52ff');
     const [employee_btn_text_colo, setEmployee_btn_text_colo] = useState('black');
   const [invitee_btn_bg_colo, setInvitee_btn_bg_colo] = useState('#ff914d');
  const [invitee_btn_text_colo, setInvitee_btn_text_colo] = useState('black');
    const [welcome_text_colo, setWelcome_text_colo] = useState('#ff914d');



const dispatch = useDispatch()



    useEffect(() => {


      dispatch(getCompany())
      dispatch(getSlideImagesMobDashboard())
      dispatch(getMobStaff())
      updateColors()

            const query = queryString.parse(props.location.search);

       

          const token = new URLSearchParams(query).get('token');

          if(token){

            getToken(token)
             

          }
          
      
    }, [])


    const getToken = async(token)=>{
        try{
            console.log(token, 'kdsskll')
                  var decoded = jwt_decode(token);
                  console.log(decoded)

                  dispatch(loginUser(decoded))

        }catch(err){

          console.log(err, 'errrr')
        }
      

    }

    const {company, slides} = useSelector(state => state.settings)
    // const {company, slides, welcomeImage } = useSelector((state) => state.staff)
    // const { slides, welcomeImage } = useSelector((state) => state.staff)

    console.log(slides, 'jjjjj')

    useEffect(() => {

      setTimeOut(company.mobile_timeouts/60)
      updateColors()



      }, [company])


       

      const updateColors = () =>{

        setCheckin_btn_outline_colo(company.checkin_btn_outline_color)
        setCheckin_btn_text_colo(company.checkin_btn_text_color)
        setCheckout_btn_bg_colo(company.checkout_btn_bg_color)
        setCheckout_btn_text_colo(company.checkout_btn_text_color)
        console.log(company.employee_btn_bg_color, 'iiii')
        setEmployee_btn_bg_colo(company.employee_btn_bg_color)
        setEmployee_btn_text_colo(company.employee_btn_text_color)
        setInvitee_btn_bg_colo(company.invitee_btn_bg_color)
        setInvitee_btn_text_colo(company.invitee_btn_text_color)
        setWelcome_text_colo(company.welcome_text_color)

   }



        //COLOR VALIDATIONS
        const checkin_btn_outline_color = checkin_btn_outline_colo && validateColor(checkin_btn_outline_colo) ? checkin_btn_outline_colo : "#00471e";

        const checkin_btn_text_color = checkin_btn_text_colo && validateColor(checkin_btn_text_colo) ? checkin_btn_text_colo : "#00471e";
        const checkout_btn_bg_color = checkout_btn_bg_colo && validateColor(checkout_btn_bg_colo) ? checkout_btn_bg_colo : "black";
  
        const checkout_btn_text_color = checkout_btn_text_colo && validateColor(checkout_btn_text_colo) ? checkout_btn_text_colo : "white";
        const employee_btn_bg_color = employee_btn_bg_colo && validateColor(employee_btn_bg_colo) ? employee_btn_bg_colo : "yellow";
        const employee_btn_text_color = employee_btn_text_colo && validateColor(employee_btn_text_colo) ? employee_btn_text_colo : "black";
  
        const invitee_btn_bg_color = invitee_btn_bg_colo && validateColor(invitee_btn_bg_colo) ? invitee_btn_bg_colo : "#ff914d";
        const invitee_btn_text_color = invitee_btn_text_colo && validateColor(invitee_btn_text_colo) ? invitee_btn_text_colo : "black";
        const welcome_text_color = welcome_text_colo && validateColor(welcome_text_colo) ? welcome_text_colo : "#ff914d";
  //    const [checkin_btn_outline_color, setCheckin_btn_outline_color] = useState('#00471e');

 const {user} = useSelector(state => state.auth) 

 console.log(user, 'jjkyg')

  return <div>

    <Card style={{display: 'flex', flexDirection: 'column', rowGap: '1rem', justtifyContents: 'center', alignItems: 'center'}}>
      <div>   <img
                    src={company.logo
                      ? company.logo : '/images/logo_200.png'}
                    className="rounded"
                    style={{ width: 150, height: 150, cursor: 'pointer' }}
                    alt="logo"
                  />
     </div>

      <div className='heading' style={{color: `${welcome_text_color}`}}>
        Welcome To  {company.name}!
      </div>
        <Row>
        <div style={{display: 'flex', width:'100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
          <Carousel style={{alignSelf: 'center'}} width={"100%"} showArrows={true} autoPlay={true} interval={1000} infiniteLoop={true} showThumbs={false}  >
          {/* renderIndicator = {false} */}


                {slides && slides.map(slide =>
                <div>
                    <img src={slide.url}/>
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                )}
                 
                {/* <div>
                    <img src="/images/logo_200.png" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="/images/logo_200.png" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="/images/logo_200.png" />
                    <p className="legend">Legend 1</p>
                </div> */}
                {/* <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div> */}
            </Carousel>
        </div>
        </Row>
      <CardBody>

        <div className='row' >
          <button className='dashboard-button btn1' style={{border: `4px solid ${checkin_btn_outline_color}`, color: `${checkin_btn_text_color}`}} onClick={()=> props.history.push({pathname: `/phone-form`})}>Check In</button>
          <button className='dashboard-button btn2' style={{backgroundColor: `${checkout_btn_bg_color}`, color: `${checkout_btn_text_color}`}} onClick={()=> props.history.push({pathname: `/visitor-checkout`})} >Check Out</button>
        </div>
       
        <div className='row'>
           <button className='dashboard-button btn3'  style={{backgroundColor: `${invitee_btn_bg_color}`, color: `${invitee_btn_text_color}`}} onClick={()=> props.history.push({pathname: `/invitee-code`})}  >Invitee</button>
            <button className='dashboard-button btn4' style={{backgroundColor: `${employee_btn_bg_color}`, color: `${employee_btn_text_color}`}} onClick={()=> props.history.push({pathname: `/staff-checkout`})}  >Staff</button>
        </div>
        
      </CardBody>
    </Card>

  </div>;
}
