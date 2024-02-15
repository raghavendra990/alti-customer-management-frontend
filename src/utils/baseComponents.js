import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState,useRef  } from "react";

export const DatePicker = ({id, selected , placeholderText, onChange})=>{
    console.log('selected', selected)
    return <ReactDatePicker dateFormat={"yyyy-MM-dd"} placeholderText={placeholderText} id={id} selected={selected} onChange={onChange}/>
}


export const Input = ({type, iRref, className, id, value, placeholder, minLength, required=false, onChange, feedbackMessage="Invalid Input"})=>{
    return <>
            <input type={type} ref={iRref} className={className} value={value} id={id} minLength={minLength} placeholder={placeholder} required={required} onChange={onChange} />
    </> 

}

export const InputPassword = ({ className, id, value, placeholder, minLength, required=false, onChange, feedbackMessage="Invalid Input"})=>{
    const passwordRef = useRef();
    const passwordViewhandler = () => {
        if (passwordRef.current.type === "password") {
          passwordRef.current.type = "text";
        } else {
          passwordRef.current.type = "password";
        }
    
      }
    const onchange_handler = ((e)=>{
        const value  = e.target.value;
        console.log('pass', value)
        if(value && value.length < 8){
            passwordRef.current.className  = className + ' is-invalid';
        } else {
            passwordRef.current.className  = className + ' is-valid';

        }
    })

    return <>
            <input type="password" ref={passwordRef} className={className} value={value} id={id} minLength={minLength} placeholder={placeholder} required={required} onChange={onchange_handler}  onClick={passwordViewhandler}/>
            <span className="input-group-btn">
                <button className="btn btn-default reveal border border-start-0 rounded-start-0 " type="button" onClick={passwordViewhandler} ><i className="bi bi-eye"></i></button>
            </span>
            <div className="invalid-feedback">
                  Password should be at least 8 characters.
                </div>
    </> 

}

export const PhoneNumber = ({ className, id, placeholder, minLength, required=false,  type="text"})=>{
    const [phone, setPhone] = useState('');
    const [classNameL, setClassNameL] = useState(className);
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    const onChangeHandler  = ((e)=>{
        
        const value = e.target.value;
        setPhone(value);
        if (re.test(value)){
            setClassNameL( className + " is-valid");
        } else {
            setClassNameL( className + " is-invalid"); 
        }
    })
    
    return  <Input type={type} value={phone} className={classNameL} id={id} minLength={minLength} placeholder={placeholder} onChange={onChangeHandler} required={required} />
}


