import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // all 3 states 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);


  // fetching drinks
  // following function will be called everytime an user types something.
  const fetchDrinks = useCallback(
    async ()=>{
      setLoading(true);
      try{
        const response = await fetch(`${url}${searchTerm}`);
        const data = await response.json();
        // destructuring drinks property from data JSON object.
        const {drinks} = data;
        console.log(drinks);
        // drinks property of our JSON object will have an array or null as value.
        if(drinks){
          const newCocktails = drinks.map((drink)=>{
            const {idDrink,strDrink,strDrinkThumb,strAlcoholic,strGlass} = drink;
            return {
              id: idDrink,
              name: strDrink,
              image: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass
            }
          });
          // console.log(newCocktails);
          setCocktails(newCocktails);
        }else{
          setCocktails([]);
        }
        setLoading(false);
      }catch(error){
        console.log(error);
        setLoading(false);
      }
    },[searchTerm]
  )

  useEffect(()=>{
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);


  return <AppContext.Provider value={{
    loading,
    cocktails,
    setSearchTerm}}>
      {children}
    </AppContext.Provider>
}
// make sure to export our function that returns useContext().
// the following method will be imported from SearchForm and CocktailList functions.
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
