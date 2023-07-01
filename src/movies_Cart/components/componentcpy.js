import React, { useContext } from 'react'
import LikeComponent from './likeComponent'
import { Link } from 'react-router-dom'
import { userContext } from '../../App'

export default function ComponentCpy(props) {
  const value = useContext(userContext);
  return (
    <>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">SN</th>
      <th scope="col" onClick={()=>{props.forSort('title')}}>Title</th>
      <th scope="col">Description</th>
      <th scope="col" onClick={()=>{props.forSort('numberInStock')}}>In stocks</th>
      <th></th>
      <th scope="col"></th>
    </tr>
</thead>
  <tbody>
    {props.movies.map((obj,index)=>{
        return(
          
        <tr key={obj._id}>
            <th scope="Row">{index+1}</th>
            <td><Link to={`/movies/${obj._id}`}>{obj.title}</Link></td>
            <td>{obj.genre.name}</td>
            <td>{obj.numberInStock}</td>
            <td><LikeComponent onLiked={props.onLiked} id={obj._id} key={obj._id}/></td>
            {(value._id && value.isAdmin)&&<td><button className='btn btn-danger'
             onClick={()=>{
                props.handleClick(obj._id)
            }}>Delete</button></td>}
            
    </tr>
    )
    })}
  </tbody>
  </table>
    
    
    </>
  )


}

//   proptypes:
//{ movies=object
//    onLiked=>handleLike,
// handleClick=>handleDelete,
//   }
