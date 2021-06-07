import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  // destructuring from my context.
  const {cocktails, loading} = useGlobalContext();
  console.log(cocktails);

  if(loading){ // if loading is true (by default)
    return <Loading/> // will display the Loading component
  }
  if(cocktails.length < 1){ // If after search, cocktails state variable holds an empty array.
    return( // That means nothing matched from the API data.
      <h2 className="section-title">
        No cocktails matched your search term.
      </h2>
    )
  }
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((cocktail)=>{
          return <Cocktail key={cocktail.id} {...cocktail} />
        })}
      </div>
      
    </section>
  )
}

export default CocktailList
