

export default function ListGroup(props) {
  return (
    <>
    <div className="list-group">
  <a onClick={()=>{props.forClick(null)}} className={!props.selectGenre?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"}>
    All Genres
  </a>
  {props.genres.map((obj,index)=>{
    return(<a className={obj._id == props.selectGenre?"list-group-item list-group-item-action active":"list-group-item list-group-item-action"} key={obj._id} onClick={()=>{props.forClick(obj._id)}}>
    {obj.name.toUpperCase()}
  </a>)
  })}

</div>
    
    
    </>
  )
}
