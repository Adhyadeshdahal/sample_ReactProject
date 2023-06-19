import { useEffect, useRef, useState } from 'react';
import Login_Component from './login_component';
import Joi from 'joi';

function Login() {
  const [loginDetails,setLoginDetails]=useState({email:"",password:""});
  const [errors,setErrors]=useState({email:"",password:""});
  const [isDisabled,setIsDisabled]=useState(true);
  let firstUpdate = useRef(true);

  useEffect
  (
  ()=>
  { 
    setErrors(validateForm());
    if (firstUpdate.current) {
      firstUpdate.current=false;
      setErrors({email:"",password:""});
}
  },[loginDetails]);

  const validateProperty=()=>{
    
  }

  const passedProps=useState([{
    id:"email",
    type:"email",
    placeHolder:"name@example.com",
    label:"Email Address"
  },{
    id:"password",
    type:"password",
    placeHolder:"Enter your password",
    label:"Password"
  }]);

  const handleChange=(event)=>{
    const account ={...loginDetails};
    account[event.currentTarget.id]=event.currentTarget.value;
    setLoginDetails(account);
  };
  
  
  const validateForm=()=>{
    const schema = Joi.object({
      email: Joi.string()
          .min(3)
          .max(30).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  
      password: Joi.string().min(8).max(32).alphanum()}).options({abortEarly:false});

      const {error} = schema.validate({...loginDetails});
      let errs={};
      if (error){
        setIsDisabled(true);
        error.details.map((item)=>{
        if(item.message.includes("email")){
          errs.email=item.message;
        }else if(item.message.includes("password")){
          errs.password = item.message;
        };
        
      }
      )}else{
        setIsDisabled(false);
        errs ={email:"",userName:""};
      }
      return errs;
}

  const handleSubmit=(event)=>{
    event.preventDefault();
    //validation etc etc
    setErrors(validateForm());



  }
  const style ={
    "height":"80vh",
    "width":"100vw",
  }



    return (  
        <>
        <div className='row align-items-center' style={style}>
        <div className='mx-auto col-10 col-md-8 col-lg-6'>
          <h1>Login:</h1>
        <Login_Component forFields={passedProps[0]} forLogin={loginDetails} forChange={handleChange} 
        forSubmit={handleSubmit} error={errors} isDisabled={isDisabled}/>
        </div>
        </div>  

        </>
    );
}

export default Login;