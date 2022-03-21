import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardSubtitle, Button, CardDeck } from 'reactstrap';
import {FaCheckSquare} from 'react-icons/fa'
import './styles/planList.css';
import { ToggleButton } from '../settings/configs/customizeFormFields/ToggleButton';
import { withRouter } from 'react-router-dom';

class PlanList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plans: null,
      togglestate: false,
      introduction: '7000',
      basic: '10000',
      smart: '35000',
      premium: '55000',
      enterprise: 'Contact us',
      disabled: 'false',
      color1: 'blue',
      color2: '#999594'
    };
  }
  handleUpgrade = planName => {

    const data = {
      planType: this.state.togglestate,
      // purpose: selectedOption,
      // const estate_house = data.estate_house || ''
      // const company = data.company

    }

    this.props.history.push({pathname: `/dashboard/billing/2/order-confirmation/${planName}`, state: data });
  };

  render() {
    const { user } = this.props.auth;
    return (
      <main className="planlist-wrapper">
          
     
    <div className='headingDiv'>
      
      <div style={{color: `${this.state.color1}`, marginRight: '20px'}}> 
        Monthly
      </div>
     

   
    <div >
     <ToggleButton
            selected={this.state.togglestate}
            toggleSelected={() => {
            
              this.setState({
                togglestate: !this.state.togglestate,
              

              })


              if(this.state.togglestate == false){


                this.setState({
                  introduction: '70000',
                  basic: '100000',
                  smart: '350000',
                  premium: '550000',
                  enterprise: 'Contact us',
                  disabled: 'true',
                  color2: 'blue',
                  color1: '#999594'
                  

                })

              }else{

                this.setState({
                  introduction: '7000',
                  basic: '10000',
                  smart: '35000',
                  premium: '55000',
                  enterprise: 'Contact us',
                  disabled: 'true',
                  color2: '#999594',
                  color1: 'blue'

                })



              }
      
      
            //   setToggleSelectName(!toggleSelectName)
            // toggleSelectName? settoggleValueName('') : settoggleValueName('name')
              
         

            //   const formData = [{
            //     field:this.state.role

            //     }
            //   ]

            //   this.state.selectedRole? interviewRole(formData) : interviewRole(formData)
            //  console.log(this.state.role)
             
            }}
            />
      </div>

      <div  style={{color: `${this.state.color2}`, lineHeight:'25px', marginRight: '10px', marginLeft: '10px', paddingTop: '1.3rem'}}> 
        Annually
        <p style={{fontSize: '1rem'}} >Save 20%</p>
      </div>

      {/* <div  style={{color: `${this.state.color2}`}}> 
        Save 20%
      </div> */}

    </div>

  
    



        <h4>Plans and Billing</h4>
        <div className= "card-deck">
        <Card body className="text-center" >
            <CardTitle className="plan-name"><h5>Introduction</h5></CardTitle>
            <CardSubtitle className="plan-price"><strike className='double-strike'>N</strike>{this.state.introduction}</CardSubtitle>
          
            <div className="plan-features">
              <div><p>Maximum of 40 staff</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Email notifications only</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Automatically or manually checkout visitors</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Contactless checkIn</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Additional location costs 70k annually or 7k monthly</p> <FaCheckSquare color="green" size={15} /> </div>
              
            
            </div>

            <Button
              color="danger"
              size="sm"
              onClick={() => this.handleUpgrade('Introduction')}
              disabled={user.option !== 'office'}
            >
              Upgrade to Intoduction
            </Button>
          </Card>

          {/* ////////////////////////////// */}
          <Card body className="text-center" style={{paddingBottom: '7rem'}} >
            <CardTitle className="plan-name"><h5>Basic</h5></CardTitle>
            <CardSubtitle className="plan-price"><strike className='double-strike'>N</strike>{this.state.basic}</CardSubtitle>
           
            <div className="plan-features">
              <div><p>Unlimited visitors</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Unlimited staff</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Schedule appointment</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Appointment link</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Email notification</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Export visitor list</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Custom sign in flow</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Send custom welcome message</p> <FaCheckSquare color="green" size={15} /> </div>

              <div><p>Exhibition mode</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>WhatsApp notifications</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Check out notifications </p> <FaCheckSquare color="green" size={15} /> </div>

              <div><p></p> <FaCheckSquare color="green" size={15} /> </div>

              <Button
              color="danger"
              size="sm"
              onClick={() => this.handleUpgrade('Basic')}
              disabled={user.option !== 'office'}
            >
              Upgrade to Basic
            </Button>
            

            </div>
            

            <div>
              
        

            </div>
         
          </Card>

          {/* //////////////////////// */}
          <Card body className="text-center">
            <CardTitle className="plan-name"><h5>Smart</h5></CardTitle>
            <CardSubtitle className="plan-price"><strike className='double-strike'>N</strike> {this.state.smart}</CardSubtitle>
          
            <div className="plan-features">
              <div><p>Unlimited visitors</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Unlimited staff</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Schedule appointment</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Appointment link</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Email notification</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Export visitor list</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Custom sign in flow</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Send custom welcome message</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Exhibition mode</p> <FaCheckSquare color="green" size={15} /> </div>



              <div><p>WhatsApp notifications</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Custom email sender</p> <FaCheckSquare color="green" size={15} /> </div>
              <div><p>Check out notifications </p> <FaCheckSquare color="green" size={15} /> </div>
            
                  <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.handleUpgrade('Smart')}
                  disabled={user.option !== 'office'}
                >
                  Upgrade to Smart 
                </Button>
            </div>

          
          </Card>
          {/* ////////////////////////////////// */}
         
         
        </div>
         {/* next row */}
         <div> 


         </div>
        <div className= "card-deck">

        <Card body className="text-center">
            <CardTitle className="plan-name"> <h5>Premium</h5> </CardTitle>
            <CardSubtitle className="plan-price"><strike className='double-strike'>N</strike>{this.state.premium}</CardSubtitle>
          
            <div className="plan-features">
            <div><p>All Basic features</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Customized App color/home </p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>SMS notification</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Custom visitors fields</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Appointment only mode</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Host assitant</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>WhatsApp notifications</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Custom email sender</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Check out notifications </p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>One extra location, additional cost 250K Annually </p> <FaCheckSquare color="green" size={15} /> </div>
            
              <Button color="danger" size="sm" onClick={() => this.handleUpgrade('Premium')}>
                Upgrade to Premium
              </Button>
            </div>
            
          </Card>

           <Card body className="text-center">
            <CardTitle className="plan-name"> <h5>Enterprise</h5> </CardTitle>
            <CardSubtitle className="plan-price"><span style={{cursor: 'pointer'}} onClick={()=>this.props.history.push('/billing-contact-us')} >{this.state.enterprise}</span> </CardSubtitle>
       
            <div className="plan-features">
            <div><p>All Basic features</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>All Premium features</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Edit badge</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Appointment reminders</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Active directory</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>SSO integration</p> <FaCheckSquare color="green" size={15} /> </div>
            


            <div><p>WhatsApp notifications</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Custom email sender</p> <FaCheckSquare color="green" size={15} /> </div>
            <div><p>Check out notifications </p> <FaCheckSquare color="green" size={15} /> </div>
              {/* <Button color="danger" size="sm" onClick={() => this.handleUpgrade('Enterprise')}>
                Upgrade to Enterprise
              </Button> */}
            </div>
            
          
          </Card>
          <Card body className="text-center">

        </Card>

        </div>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default withRouter(connect(mapStateToProps)(PlanList));


// export default withRouter(BillingPage)