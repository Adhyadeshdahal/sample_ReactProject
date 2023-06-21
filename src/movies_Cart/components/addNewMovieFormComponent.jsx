import React from 'react'

function AddNewMovieFormComponent() {
  return (
    <>
    <form>
  <div class="form-group">
    <label for="Title">Title</label>
    <input type="Text" className="form-control" id="Title" placeholder="In Time"/>
  </div>
  <div class="form-group">
    <label for="Genre">Genre</label>
    <select className="form-control" id="Genre">
        {ogenres.map(obj=>{
            return(
                <option key={obj._id}>{obj.name}</option>

            )
        })}
      
      </select>
  </div>
  <div class="form-group">
    <label for="Stock">Number In Stock</label>
    <input type="Text" className="form-control" id="stock" placeholder="6"/>
  </div>
  <div class="form-group">
    <label for="Rate">Rate</label>
    <input type="number" className="form-control" id="Rate" placeholder="2.5"/>
  </div>
  <button type="submit" className="btn btn-warning">Add</button>

  </form>

    
    
    </>
  )
}

export default AddNewMovieFormComponent