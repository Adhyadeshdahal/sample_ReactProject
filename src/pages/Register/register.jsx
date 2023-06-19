import React,{useEffect, useState} from 'react'
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

      const [registerValues,setRegisterValues]=useState({email:"",password:"",username:""});

      const [activeId,setActiveId]=useState("");


      function Validate() {

        const schema = Joi.object(
            {
                username:Joi.string().required().max(16).min(3).alphanum(),

                password: Joi.string().min(8).max(32).alphanum().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

                email: Joi.string().min(3)
                .max(30).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            }
            )
            .options({abortEarly:false});


        const {error}= schema.validate(registerValues);
        let err={};
        
        if (error){
            setIsDisabled(true);
            error.details.map(e=>{
                let message = e.message;
                if (message.includes("\"email\"")) {
                    err["email"]=message;
                }
                else if(message.includes("\"username\"")){
                    err["username"]=message;
                }
                else if(message.includes("\"password\"")){
                    err["password"]=message;
                }
            })
        }else{
            setIsDisabled(false);
            err={email:"",password:"",username:""};
        };

        setErrors(err);

         }

         function handlePropertyChange(id) {
            Validate();
            setActiveId(id);



            
         }



      function handleChange(event,val) {
        const register = {...registerValues};
        register[event.currentTarget.id]=event.currentTarget.value;
        setRegisterValues(register);
        handlePropertyChange(event.currentTarget.id);

        
      }

      function handleSubmit(event) {
        event.preventDefault();
        
        if (Validate()) {
            
            
            return 0
        
        
        };

      }



  return (
   <>
   <Register_Component forFields={labels} forChange={handleChange} forSubmit={handleSubmit} 
   forVal={registerValues} error={errors} activeId={activeId} isDisabled={isDisabled}/>
   
   
   </>
  )
}

export default Register;