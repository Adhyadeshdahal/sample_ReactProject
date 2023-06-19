import React from 'react'

export default function Login_Component({forFields,forLogin,forChange,forSubmit,error,isDisabled}) {
  return (
    <>
    <form onSubmit={forSubmit}>

        {forFields.map(item => {
            return(
            <div key={item.id}>
                <div className="form-group" >
                <label htmlFor={item.id}>{item.label}</label>
                <input type={item.type} className="form-control" id={item.id}
                onChange={forChange} placeholder={item.placeHolder} value={forLogin[item.type]} />
            
              </div>
            <div className={error[item.type]?"alert alert-danger":"d-none"}>{error[item.type]}</div>
            </div>
            )
        })}

{/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="check1"/>
    <label className="form-check-label" htmlFor="check1">Check me out</label>
  </div>
  <button type="submit" disabled={isDisabled} className="btn btn-primary">Login</button>
  </form>
  </>)
}
