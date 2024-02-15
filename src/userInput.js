import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetcher  from './utils/fetch'
import apiMapper from "./utils/apiMapper";
import common  from "./utils/common";
import {DatePicker, Input, PhoneNumber, InputPassword} from "./utils/baseComponents";
import config from "./utils/config";

const UserInput =({meta})=>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [heading, setHeading] =  useState('Login')
    const [dob, setDob] = useState(new Date());
    const [error, setError] = useState(null);

    const [plan, setPlan] = useState([]);
    const getPlans = async ()=>{
      const resp = await fetcher.get(apiMapper.PLAN_API , config.host, common.getHeaders());
      if ([200, 201].includes(resp?.status)) {
          const userData = resp.data || [];
          setPlan(userData)
      }
  }

    useEffect(()=>{
        getPlans();
        if(meta){
            setHeading(meta);
        }

        if(localStorage.getItem('Authorization')){
            navigate('/');
            navigate(0)
        }
    }, [])

    const handlerLogin = async (event)=>{
        event.preventDefault();
        // setLoading(true);

        var fields = [];
        if(meta === 'Register'){
          fields = ['name', 'email', 'password', 'phone_number', 'dob', 'adhar_number', 'plan'];
        } else {
          fields = ['password', 'email'];
        }
        const formData = {};
        fields.forEach((field)=>{
            console.log('field', field);
            formData[field] = event.target[field].value;
        })
        console.log('formData', formData);

        if (Object.keys(formData).length > 0) {
          const resp = await fetcher.post(meta === 'Register' ? apiMapper.REGISTRATION_API : apiMapper.LOGIN_API, formData );
          if ([200, 201].includes(resp?.status)) {
            if(meta === 'Register'){
                alert('Registration successful')
                const respdata = resp.data;
                const token = respdata?.token;
                console.log('respdata', respdata, resp, token)
                if (token) {
                  localStorage.setItem("Authorization", token);
                  navigate('/');
                  navigate(0);
                }
                
            } else {
                const respdata = resp.data;
                const token = respdata?.token;
                console.log('respdata', respdata, resp, token)
                if (token) {
                localStorage.setItem("Authorization", token);

        
                setTimeout(() => {
                    setLoading(false);
                    common.resetForm(event);
                    navigate('/')
                    navigate(0);
                }, 1000);
                }
            }
            
    
          } else {
            setLoading(false);
            console.log(resp)
            if (resp?.data){ setError(JSON.stringify(resp.data))}
            else {
                setError('something went wrong.')
            };
            // event.target.phone_number.classList.add('is-invalid');
            
          }
        }    
    }

    return <>
    <div className="container mt-5">
    <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
            <h1>{heading}</h1>
            <form onSubmit={handlerLogin} className="needs-validation user-login">

              { meta === 'Register' && <><div className="mb-3">
                <Input type="text" className="form-control" id="name" placeholder="Name" required />
              </div>
              <div className="mb-3">
                <PhoneNumber className="form-control" id="phone_number" placeholder="Phone Number" required />
                <div className="invalid-feedback">
                  Phone Number is invalid.
                </div>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" id="adhar_number" placeholder="Adhaar Number" required />
              </div>
              <div className="mb-3">
                <DatePicker placeholderText="DOB" id="dob" selected={dob} onChange={(e) => setDob(e)}/>
                <select class="form-select" aria-label="Plan" id="plan">
                {plan?.map((item)=>{
                  return <option value={item.id}>{item.name} price -  {item.price} validity - {item.validity}</option>
                })}
                  
                </select>
              </div></>}

              <div className="mb-3">
               <input type="email" className="form-control" id="email" placeholder="Email" required />

              </div>
              <div className="mb-3">
              
              </div>
              

              <div className="mb-3">
                <div className="input-group">
                  <InputPassword   type="password" className="form-control" id="password" placeholder="Password" minLength={8} required />

                </div>

                {error && <div  className="alert alert-danger mt-1">
                  {error}
                </div>}

                

                <div className="col mt-4" style={{ alignSelf: "start" }}>
                  {loading === false ? <button className="btn btn-primary"  >{heading}</button>
                    : <button type="button" className="btn btn-primary " disabled>
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </button>}
                </div>
              </div>

              
              

              </form>
        </div>
        <div className="col-4"></div>
    </div>
    
    </div>
       
        
    </>
}
export default UserInput;