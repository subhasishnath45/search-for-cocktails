import React,{useState, useEffect} from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);
  useEffect(()=>{
    setLoading(true);
    async function getCocktail(){ // fetching a particular drink with a specific id.
      try{
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        console.log(data);
        if(data.drinks){ // if drinks key is an array
          // first we will destructure the array inside the JSON object for a drink.
          const {
            strDrink: name, 
            strDrinkThumb: image, 
            strAlcoholic: info, 
            strCategory: category, 
            strGlass: glass, 
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5} = data.drinks[0];

            const ingredients = [
              strIngredient1,
              strIngredient2,
              strIngredient3,
              strIngredient4,
              strIngredient5
            ];

            const newCocktail = {
              name: name,
              image: image,
              info:info,
              category: category,
              glass: glass,
              instructions: instructions,
              ingredients: ingredients
            }
            setCocktail(newCocktail);
        }else{
          setCocktail(null);
        }
        setLoading(false);
      }catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getCocktail();
  },[id]); // everytime id changes, useEffect() will be called.
  if(loading){
    return <Loading/>;
  }
  if(!cocktail){
    return <h2 className="section-title">No Cocktail found, try again.</h2>
  }
  const {name,image,info,category,glass,instructions,ingredients} = cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary btn-back-home">
        Home
      </Link>
      <br/>
      {/* <h2 className="section-title">{id}</h2> */}
      <div className="drink">
        <img src={image} alt="name" />
        <div className="drink-info">
          <p>
            <span className="drink-data">
              Name: {name}
            </span>
          </p>
          <p>
            <span className="drink-data">
              Category: {category}
            </span>
          </p>
          <p>
            <span className="drink-data">
              Info: {info}
            </span>
          </p>
          <p>
            <span className="drink-data">
            Glass: {glass}
            </span>
          </p>
          <p>
            <span className="drink-data">
            Instructions: {instructions}
            </span>
          </p>
          <p>
            <span className="drink-data">Ingredients: </span>
            {ingredients.map((ingredient, index)=>{
              if(ingredient){
                return <span key={index}>{ingredient} /</span>;
              }else{
                return null;
              }
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
