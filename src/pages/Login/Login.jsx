import { useEffect, useRef, useState } from 'react';
import Login_Component from './login_component';
import { login } from '../../services/loginUser';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigateTo = useNavigate();
  const loginDetails = useRef({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isDisabled, setIsDisabled] = useState(true);
  const firstUpdate = useRef(true);

  useEffect(() => {
    setErrors(validateForm());

    if (firstUpdate.current) {
      firstUpdate.current = false;
      setErrors({ email: "", password: "" });
    }
  }, [loginDetails.current]);

  useEffect(() => {
    if (errors.email === "" && errors.password === "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [errors]);

  const validateProperty = () => {
    // Implementation for validating a single property
  };

  const passedProps = useState([
    {
      id: "email",
      type: "email",
      placeHolder: "name@example.com",
      label: "Email Address",
    },
    {
      id: "password",
      type: "password",
      placeHolder: "Enter your password",
      label: "Password",
    },
  ]);

  const handleChange = (event) => {
    const account = { ...loginDetails.current };
    account[event.currentTarget.id] = event.currentTarget.value;
    loginDetails.current = account;
    setErrors(validateForm());
  };

  const validateForm = () => {
    const schema = Joi.object({
      email: Joi.string()
        .min(3)
        .max(30)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

      password: Joi.string().min(8).max(32).alphanum(),
    }).options({ abortEarly: false });

    const { error } = schema.validate({ ...loginDetails.current });
    let errs = { email: "", password: "" };
    if (error) {
      error.details.map((e) => {
        if (e.path[0] === "email") {
          errs.email = e.message;
        } else if (e.path[0] === "password") {
          errs.password = e.message;
        }
      });
    };

    setIsDisabled(!!error)
    return errs;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(validateForm());

    try {
      const { data: result } = await login(loginDetails.current);
      localStorage.setItem('token',result);
      window.location.href = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        let error = { ...errors };
        error['email'] = err.response.data;
        setErrors(error);
      }
    }
  };

  const style = {
    height: "80vh",
    width: "100vw",
  };

  return (
    <>
      <div className='row align-es-center' style={style}>
        <div className='mx-auto col-10 col-md-8 col-lg-6'>
          <h1>Login:</h1>
          <Login_Component
            forFields={passedProps[0]}
            forLogin={loginDetails}
            forChange={handleChange}
            forSubmit={handleSubmit}
            error={errors}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
