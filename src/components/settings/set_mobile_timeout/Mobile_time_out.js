import Axios from 'axios';
import React, {useState, useEffect} from 'react'
import { CardBody, Card, Button } from 'reactstrap';
import { editMobileTimeout } from '../../../actions/settingsActions';

export default function Mobile_time_out() {

    const [time, setTIme] = useState('')


    useEffect(() => {

      
    }, [time])


    const handleTimeChange = (e)=>{
        const value = e.target.value



        setTIme(value.replace(/[^\d.]/ig, ""))

    }

    const handleSave = () =>{

        editMobileTimeout(time)
    }



    return (
        <div>

            <p className="text-muted">edit timeouts in milliseconds(ms)</p>

            <div>
            <input type='number' maxLength="4"  onChange={(e)=> handleTimeChange(e)}/>
            </div>
           


            <Button color="danger" onClick={()=>handleSave()}>
              Save Changes
            </Button>
{/* 
            <input
                type="text"
                value={this.state.companyName}
                onChange={e => this.setState({ companyName: e.target.value })}
                className="form-control"
                placeholder=
              />
             */}
        </div>
    )
}
