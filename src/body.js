import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetcher  from './utils/fetch'
import apiMapper from "./utils/apiMapper";
import common  from "./utils/common";
import config from "./utils/config";
import moment from "moment";
const Body =() => {
    const navigate = useNavigate();
    const [ item, setItem] = useState({});
    const [renew, setRenew] = useState(true);

    const [plan, setPlan] = useState([]);
    const getPlans = async ()=>{
      const resp = await fetcher.get(apiMapper.PLAN_API , config.host, common.getHeaders());
      if ([200, 201].includes(resp?.status)) {
          const userData = resp.data || [];
          setPlan(userData)
      }
  }
    const getItems = async ()=>{
        const resp = await fetcher.get(apiMapper.PROFILE_API , config.host, common.getHeaders());
        if ([200, 201].includes(resp?.status)) {
            const userData = resp.data || [];
            setItem(userData)
            const expiry_date = moment(userData.expiry);
            const current_date = moment(new Date());
            if(expiry_date > current_date){
                setRenew(true);
            } else {
              setRenew(false);

            }
        }
    }
    
    useEffect( ()=>{
        const token = localStorage.getItem('Authorization');
        if (!token){
          navigate('/register');
        }
        getItems();
        getPlans();
    }, [])

    const renew_plan = async ()=>{
      const resp = await fetcher.get(apiMapper.RENEW_API , config.host, common.getHeaders());
      if ([200, 201].includes(resp?.status)) {
        alert('Plan renew succesfully');
        getItems();
      }
  }

    const renew_handler = (event)=>{
      renew_plan();
    }

    const upgrade_down_grade = async (id)=>{
      const resp = await fetcher.post(apiMapper.UPGRADE_API ,  {id}, config.host, common.getHeaders());
        if ([200, 201].includes(resp?.status)) {
            alert('Plan upgrade\Downgrade succesfully');
        } else {
          alert('Plan upgrade\Downgrade Failed');
        }
    }

    const submit_handler = async (event)=>{
      event.preventDefault();
      const id = event.target.plan.value;
      await upgrade_down_grade(id); 
      getItems();
    }

    return <>
        {localStorage.getItem('Authorization') ? <div className="container">
            <div className="row">
                    
               
            </div>
            <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>First Name</th>
                <th className="text-center">
                  Email 
                </th>
                <th className="text-center">
                  Phone
                </th>
                <th className="text-center">
                  Adhar
                </th>
                <th className="text-center">
                  DOB
                </th>
                <th className="text-center">
                  Plan
                </th>
                <th className="text-center">
                  Expiry
                </th>
                <th className="text-center">
                  Plan Status
                </th>
              
              </tr>
            </thead>
            <tbody>
              {Object.keys(item).length > 0 &&  <tr key={1}>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{item?.phone_number}</td>
                <td>{item?.adhar_number}</td>
                <td>{item?.dob}</td>      
                <td>{item?.plan}</td>
                <td>{item?.expiry}</td>                
                <td>{item?.plan_status}</td>                

          
              </tr>}
             
            </tbody>
          </table>
          <div className="mb-3">
          <button className="btn btn-success mt-5" onClick={renew_handler} disabled={renew} aria-disabled="plan is not expired yet">Renew</button>
          <p>Plan renew will be enable after the expiry time.</p>
          </div>
          <div className="mb-3 mt-5">
            <form onSubmit={submit_handler}>
              <h1>Upgrade/Downgrade</h1>
            <div className="mb-3">
                <select class="form-select" aria-label="Plan" id="plan">
                  {plan?.map((item)=>{
                    return <option value={item.id}>{item.name} price -  {item.price} validity - {item.validity}</option>
                  })}
                
          
                  </select>
                  <div className="mb-3 mt-2">
                  <button type="submit"  className="btn btn-primary">Upgrade/Downgrade</button>

                  </div>

                </div>
            </form>
          </div>
        </div> : <div className="conatiner text-center mt-5">
              <h1>Please Login/Signup to access this page</h1>
            </div>}
        
    </>
}
export default Body;