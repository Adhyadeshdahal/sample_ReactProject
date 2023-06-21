
export default function pagnitionUtils(items,noOfItemsInAPage=3,startingIndex=0) {
  const noOfPage =()=>{

    return (Math.ceil(items.length/noOfItemsInAPage));


  }
  const refactorItems=()=>{
    return items.slice(startingIndex,noOfItemsInAPage+startingIndex);//[apple,banana,mango,cat,dog,lod,rod,cod]
  }

  return ({
    noOfPage: noOfPage(),
    refactoredItems: refactorItems().sort((a, b) => a['title'].localeCompare(b['title'])),

  }
  )
}
