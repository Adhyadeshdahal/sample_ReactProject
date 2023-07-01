import React,{useEffect, useState,useRef} from 'react';
import Register_Component from './register_component';
import Joi from 'joi';
import { saveUser } from '../../services/registerUser';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function Register() {

  const navigateTo = useNavigate();
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
        id:"name",
        type:"username",
        placeHolder:"Enter your username",
        label:"UserName"
      }]);

      const [isDisabled,setIsDisabled]=useState(true);

      const [errors,setErrors]=useState({email:"",password:"",name:""})
      // const errors = useRef({email:"",password:"",username:""})

      const registerValues = useRef({email:"",password:"",name:""});

      const [activeId,setActiveId]=useState("");

      useEffect(()=>{


        if(errors.email ===""&&errors.password===""&&errors.name===""){
          setIsDisabled(false);
        }else{
          setIsDisabled(true);
        }



      },[errors])



      function Validate() {
        const schema = Joi.object({
          name: Joi.string().required().max(16).min(3).alphanum(),
          password: Joi.string().min(8).max(32).alphanum().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
          email: Joi.string().min(3).max(30).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        }).options({ abortEarly: false });
      
        const { error } = schema.validate(registerValues.current);
        let err = {
          email: "",
          password: "",
          name: ""
        };
        
        if (error) {
          error.details.forEach(e => {
            const message = e.message;
      
            if (e.path[0] === "email") {
              err["email"] = message;
            } else if (e.path[0] === "name") {
              err["name"] = message;
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
        setErrors(Validate());
        async function postVal() {
          try{
            const {data:result,headers} = await saveUser(registerValues.current);
            localStorage.removeItem('token');
            localStorage.setItem('token',headers['x-auth-token']);

            window.location.href= "/";
          
          }catch(err){

              if (err.response.status === 400&&err.response){
              let error = {...errors};
              error['email']=err.response.data;
              toast.dark(error.email);
              setErrors(error);

              }
              


            }
          
          
        }

        postVal();

      }



  return (
   <>
   <ToastContainer/>
   <Register_Component forFields={labels} forChange={handleChange} forSubmit={handleSubmit} 
   forVal={registerValues} error={errors} activeId={activeId} isDisabled={isDisabled}/>
   
   
   </>
  )
}

export default Register;