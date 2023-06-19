

export function Heads(movies, totalMovies, wishList) {
  return <div id="noOfItemsRemaining">
    {totalMovies > 0 ? (<h2>There are {totalMovies} items remaining.</h2>) : (<h2>There are no movies in the database</h2>)}
    {wishList > 0 ? <h1>There are {wishList} movies in your wish list</h1> : <h1>There are no movies on your wishlist currently</h1>}

  </div>;
}
