import React, {useState} from 'react';
import { Button, Card, CardBody, Input } from 'reactstrap';
import { billingContactUs } from '../../actions/visitorActions';
import { useDispatch, useSelector } from 'react-redux';



export default function ContactUsBilling(props) {

    const [subject, setSubject] = useState('Enterprise Request for Pricing');
    const [message, setMessage] = useState('')
    const {company, slides} = useSelector(state => state.settings)

    const currentCompany = company.id

    const submitForm = ()=>{
        
        billingContactUs(message, currentCompany, subject)
        .then(data=> {

            console.log(data, 'jjshjs')
            if(data){
                props.history.push('/dashboard')
            }
        } )

    }


   
    console.log(company.id, 'ksjkjkass')

  return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10%'}}> 

      <Card>
          <CardBody style={{width: '40rem'}}>
                <div>
                    <label>Subject</label>
                    <input value={subject} disabled className='form-control' />
                </div>
                <div>
                    <label>Message</label>
                    <textarea onChange={(e)=> setMessage(e.target.value) } className='form-control' />
                </div>
                <Button onClick={submitForm} style={{marginTop: '10px'}} >Send</Button>
         </CardBody>
      </Card>
  </div>;
}
