import React, { useState, useEffect } from 'react'
import axios from "axios"
import { usePaystackPayment } from 'react-paystack';
import { useDispatch, useSelector } from "react-redux"
// import { payOrder } from "../actions/orderActions"
import { Button, Image } from "react-bootstrap"
import moment from 'moment';
import { subscribe, verifyPayment } from '../../actions/staffActions';
// import { subscribeCompany } from '../../actions/adminActions';


const PaystackPayment = (props) => {

    const [amount, setAmount] = useState('')
    const [metaData, setMetaData] = useState('')
    const [billingId, setBillingId] = useState('')
    
    const dispatch = useDispatch()
    const [key, setKey] = useState("")

    const {company} = useSelector(state=> state.settings)

    console.log(company.companyemail, 'jjjjjjjjjjjjjjjllll')

    useEffect(() => {
        // const amount1 = this.props.

        console.log(props.location.state, 'sdhsdyss,yetwetwy')
        setMetaData(props.location.state || {})     


        // const { period, plan } = this.state;
        // const start_date = moment(new Date());
        // let expiring_date = '';
    
        // if (period == 'month') expiring_date = moment(start_date).add(1, 'M');
        // if (period == 'year') expiring_date = moment(start_date).add(1, 'year');
    
        // const interval_remaining = expiring_date.diff(start_date, 'days');

        // const data = {
        //     start_date: start_date.format('YYYY-MM-DD'),
        //     expiring_date: expiring_date.format('YYYY-MM-DD'),
        //     interval_remaining,
        //     plan: plan.id,
        //     period
        //   };

    // subscribe(data)
    // .then(url=>{
    //   this.setState({
    //     link: url,
    //     show: true
    //   })
    //   console.log(url, 'url')
    // })
    // .catch(err=> {console.log(err, 'jjksssjs')})
      
    }, [])

    useEffect(() => {
        const getKey = async () => {
            const { data: clientKey } = await axios.get('/api/v1/config/paystack')
            setKey(clientKey)
        }
        getKey()
       
    }, [key])

    // console.log(key)

    const config = {
        reference: (new Date()).getTime(),
        email: company.companyemail,
        amount: 5000 * 100,
        publicKey: key,
        metadata:{
            
            age: 2
        }
        
    };
    // console.log(key)

    const PayStackHooks = () => {
        const initializePayment = usePaystackPayment(config);

 console.log(metaData, 'oooooooo', )
        const submitPayment = async(onSuccess, onClose)=>{
           const data = await subscribe(metaData).then(result=>{
               
                if(result){

                    console.log(result, 'kkuyy')
                    const billing_id = result.metadata.billing_id
                    const plan = result.metadata.plan
                     config.metadata.billing_id = billing_id
                     config.metadata.plan = plan
                    
                    console.log(result.metadata.billing_id, 'jkjjkskjs')
                    setMetaData([metaData, billing_id ])
                    console.log(metaData, 'ooollooooo', )
                    setBillingId(result.metadata.billing_id)

                    initializePayment(onSuccess, onClose)
                }
           })
            
        }


        return (
            <div>
                <Button
                    type='button'

                    className='btn btn-block btn-success'
                    onClick={() => {
                        submitPayment(onSuccess, onClose)
                    }}>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Paystack_Logo.png"
                        alt="Pay with Paystack" width="40%"></Image>

                </Button>

            </div>
        );
    };


    const onSuccess = (reference) => {
        const paymentResult = {
            id: reference.trxref,
            status: reference.status,
            update_time: String((new Date()).getTime()),
            // payer: { email_address: 'email' }      
        }

        console.log('success', reference)

        verifyPayment(reference.reference, company, metaData)
        // dispatch(payOrder(orderId, paymentResult))
    }

    const onClose = (ref) => console.log(ref)

    return (
        <div>
            <PayStackHooks />
        </div>
    )
}

export default PaystackPayment
