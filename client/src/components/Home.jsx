import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByDietType } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginate from "./Paginate";


export default function Home() {
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const numberOfRecipes = 9
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(numberOfRecipes);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };



    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
    }

    function handleFilterDietType(e){
        dispatch(filterRecipesByDietType(e.target.value))
    }

    return (
        <div>
            <Link to='/recipes'>Create Recipe</Link>
            <h1>'Insert cool title'</h1>
            <button onClick={e => { handleClick(e) }}>
                Existing Recipes
            </button>
            <div>
                <select>
                    <option value='asc'>A - Z</option>
                    <option value='des'>Z - A</option>
                </select>
                <select>
                    <option value='highest score'>Highest Score</option>
                    <option value='lowest score'>Lowest Score</option>
                </select>
                <select onChange={e => handleFilterDietType(e)}>
                    <option value='all'>-All Diets-</option>
                    <option value='vegan'>Vegan</option>
                    <option value='paleolithic'>Paleolithic</option>
                    <option value='gluten free'>Gluten free</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='dairy free'>Dairy free</option>
                    <option value='primal'>Primal</option>
                    <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
                    <option value='whole 30'>Whole 30</option>
                    <option value='pescatarian'>Pescatarian</option>
                    <option value='fodmap friendly'>Fodmap friendly</option>
                </select>
                <Paginate
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginate={paginate}
                />
                {
                    currentRecipes?.map((e) => {
                        return (
                            <Card name={e.name} img={e.img} dietTypes={e.dietTypes} key={e.id} />
                        );
                    })
                }
            </div>
        </div>
    )

}