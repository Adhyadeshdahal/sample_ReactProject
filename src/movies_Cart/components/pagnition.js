

export default function Pagnition(props) {
    const arr =Array(props.noOfPage).fill('a');
    console.log(props.currentPage);


  return (

    <>
    <nav aria-label="Page navigation example">
  <ul className="pagination">
    {arr.map((obj,index)=>{return (<li className={(props.currentPage == index+1)?"page-item active":"page-item"} key={index} 
    onClick={()=>{props.forClick(index)}}><a className="page-link" >{index+1}</a></li> ) })}
  </ul>
</nav>
    
    </>

  )
}
