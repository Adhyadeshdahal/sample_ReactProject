import React from 'react'

function AddNewMovieFormComponent({genres,fields,forSubmit,val,forChange,error,activeId,isDisabled,forClick,repeatedMovie}) {
  return (
    <>
    <form onSubmit={forSubmit}>

        {
            fields.map(item =>{

                return (
                    <div key={item.id}>
         <div className="form-group">
            <label htmlFor={item.id}>{item.label}</label>
            <input type={item.type} className="form-control" onChange ={forChange} onClick={forClick} id={item.id} 
            placeholder={item.placeholder} value={val[item.id]}/>
          </div>
          {/* <div>{error[item.id]}</div> */}
          <div className={(error[item.id]&&(activeId==item.id))?"alert alert-danger":"d-none"}>{error[item.id]}</div>
          </div>
)

            })
            
        }

  <div className="form-group">
    <label htmlFor="genre">genre</label>
    <select className="form-control" id="genre" onChange={forChange}>
        {genres.map(obj=>{
            return(
                <option key={obj._id}>{obj.name}</option>

            )
        })}
      </select>
      <div className={(error["genre"]&&(activeId=="genre"))?"alert alert-danger":"d-none"}>{error["genre"]}</div>
  </div>
  <button type="submit" className="btn btn-warning" disabled={isDisabled}>Add</button>

  </form>

  {repeatedMovie?(<div className="alert alert-danger">{"The Movie Already Exists In Database"}</div>):null}

    
    
    </>
  )
}

export default AddNewMovieFormComponent