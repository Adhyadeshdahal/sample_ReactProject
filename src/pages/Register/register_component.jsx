import React from 'react'

export default function Register_Component({forFields,forChange,forSubmit,forVal,error,activeId,isDisabled}) {
  return (
    <>
    <form onSubmit={forSubmit}>

        {forFields.map(item => {
            return(
            <div key={item.id}>
                <div className="form-group" >
                <label htmlFor={item.id}>{item.label}</label>
                <input type={item.type} className="form-control" id={item.id}
                onChange={forChange} placeholder={item.placeHolder} value={forVal[item.id]} />
            
              </div>
            <div className={(error[item.type]&&(activeId==item.id))?"alert alert-danger":"d-none"}>{error[item.type]}</div>
            </div>
            )
        })}

{/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
  <button type="submit" disabled={isDisabled} className="btn btn-primary">Register</button>
  </form>
  </>
  )
}
