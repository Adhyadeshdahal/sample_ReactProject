import React,{useEffect, useState,useRef} from 'react'
import Register_Component from './register_component';
import Joi from 'joi';

function Register() {
    const [labels,setLabels]=useState([{
        id:"email",
        type:"email",
        placeHolder:"name@example.com",
        label:"Email Address"
      },{
        id:"password",
        type:"password",
        placeHolder:"Enter your password",
        label:"Password"
      },
      {
        id:"username",
        type:"username",
        placeHolder:"Enter your username",
        label:"UserName"
      }]);

      const [isDisabled,setIsDisabled]=useState(true);

      const [errors,setErrors]=useState({email:"",password:"",username:""})
      // const errors = useRef({email:"",password:"",username:""})

      const registerValues = useRef({email:"",password:"",username:""});

      const [activeId,setActiveId]=useState("");



      function Validate() {
        const schema = Joi.object({
          username: Joi.string().required().max(16).min(3).alphanum(),
          password: Joi.string().min(8).max(32).alphanum().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
          email: Joi.string().min(3).max(30).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        }).options({ abortEarly: false });
      
        const { error } = schema.validate(registerValues.current);
        let err = {
          email: "",
          password: "",
          username: ""
        };
        
        if (error) {
          error.details.forEach(e => {
            const message = e.message;
      
            if (e.path[0] === "email") {
              err["email"] = message;
            } else if (e.path[0] === "username") {
              err["username"] = message;
            } else if (e.path[0] === "password") {
              err["password"] = message;
            }
          });
        }
      
        setIsDisabled(!!error);
        return err;
      }
      




      function handleChange(event,val) {
        const register = {...registerValues.current};
        register[event.currentTarget.id]=event.currentTarget.value;
        // setRegisterValues(register);
        setActiveId(event.currentTarget.id);
        registerValues.current=register;
        setErrors(Validate());

        
      }

      function handleSubmit(event) {
        event.preventDefault();
        Validate();

      }



  return (
   <>
   <Register_Component forFields={labels} forChange={handleChange} forSubmit={handleSubmit} 
   forVal={registerValues} error={errors} activeId={activeId} isDisabled={isDisabled}/>
   
   
   </>
  )
}

export default Register;