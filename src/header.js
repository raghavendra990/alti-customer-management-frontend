import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetcher  from './utils/fetch'
import apiMapper from "./utils/apiMapper";
import common  from "./utils/common";
import config from "./utils/config";
const Header =() => {
    const  navigate = useNavigate()
    useEffect(()=>{
       
    }, [])
    const logout_handler = async ()=>{
        const resp = await fetcher.post(apiMapper.LOGOUT_API, {}, config.host, common.getHeaders());
        if ([200, 201].includes(resp?.status)) {
            localStorage.clear();
            navigate('/');
            navigate(0);
        }
    }
    return <>
        <div className="row mt-5">
            <div className="col-4"></div>
            {!localStorage.getItem('Authorization') && <div className="col-4">
                <div className="row">
                    <div className="col">
                        <button type="button" className="btn btn-primary" onClick={()=>{
                            navigate('/register');
                            navigate(0)

                            }}>Register</button>
                    </div>

                    <div className="col">
                        <button type="button" className="btn btn-primary"onClick={()=>{
                            navigate('/login');
                            navigate(0)

                            }}>Sign In</button>
                    </div>
                </div>
                
            </div>}
            {localStorage.getItem('Authorization') && <div className="col-4">
                <div className="row">
                    <div className="col">
                        <button type="button" className="btn btn-danger" onClick={()=>{logout_handler()}}>Logout</button>
                    </div>

                   
                </div>
                
            </div>}
            
            <div className="col-4"></div>

            
        </div>
        
    </>
}
export default Header;