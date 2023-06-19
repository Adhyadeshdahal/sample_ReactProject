export default function listgroupUtils(items,genreId) {
    const itemsRefactor =()=>{
        return items.filter(item => {
            return item.genre._id == genreId;
        })
    }
  return (
    {
        refactoredItems:itemsRefactor(),

    }
    
  )
}
