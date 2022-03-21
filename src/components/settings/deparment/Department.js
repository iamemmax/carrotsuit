import React, {useState, useEffect} from 'react'
import { Button, Card, Table } from 'reactstrap'
import { getAppointmentByPurpose } from '../../../actions/appointmentActions'
import { addDepartment } from '../../../actions/settingsActions'

import { getDepartment } from '../../../actions/settingsActions'



export default function Department() {

    const [department, setDepartment] = useState('')
    const [departments, setdepartments] = useState([])


    useEffect(() => {
     
        getDepartment().then(data=>{
            console.log(data, 'djd')
            setdepartments(data)
           
        })

    }, [])





    useEffect(() => {

      
    }, [department])


    const loadDepartment = ()=>{

        getDepartment().then(data=>{
            console.log(data, 'djd')
            setdepartments(data)
           
        })
    }


    const handeDepartmentChange =(e)=>{
        console.log(e.target.value)
        setDepartment(e.target.value)

    }

    const handleSave = async() =>{

        await addDepartment(department)
        loadDepartment()
        // setDepartment('')
    }

    return (
        <div>
            <p className="text-muted">Add Department</p>

            <div>
            <input type='text'  onChange={(e)=> handeDepartmentChange(e)}/>
            </div>



            <Button color="danger" onClick={()=>handleSave()}>
            Add
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

            <div>

           <Card style={{marginTop: '5px'}}>

                
                   

                    <Table size="md" responsive  >
                            <thead>
                                <tr>
                                    <td><b>Departments</b></td>
                                </tr>
                            </thead>
                            <tbody>
                            {departments.map(department =>
                      
                                <tr  key={department.id}>
                                    <td>{department.department}</td>
                                </tr>
                          
                            )}
                            </tbody>
                    </Table>

                        
                            
                   

            </Card>

            </div>
          

            
        </div>
    )
}
