const { Router } = require('express');
const axios = require('axios');
const { Recipe, DietType } = require('../db');
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const recipeInfo = await apiUrl.data.results.map(e => {                             //bring just the neccesary info
        return {
            id: e.id,
            name: e.title,
            img: e.image,
            summary: e.summary,
            score: e.spoonacularScore,
            healthyLevel: e.healthScore,
            instructions: e.analyzedInstructions,
            dietTypes: e.diets,
            isVegetarian: e.vegetarian,
            isVegan: e.vegan,
            isGlutenFree: e.glutenFree,
        };
    });
    return recipeInfo;
};

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: DietType,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
};

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = await apiInfo.concat(dbInfo);
    return totalInfo;
}

router.get('/recipes', async (req, res) => {
    const name = req.query.name
    let allRecipes = await getAllRecipes();
    if (name) {
        let recipeName = await allRecipes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(400).send("The recipe has doesn't exist yet, will you make it?")
    } else {
        res.status(200).send(allRecipes);
    }
})

router.get('/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const allRecipes = await getAllRecipes()
    if (id) {
        let recipesId = await allRecipes.filter(e => e.id == id)
        recipesId.length ?
            res.status(200).json(recipesId) :
            res.status(404).send('Recipe not found')
    }
});

router.get('/types', async (req, res) => {
    const apiInfo = await getApiInfo();
    const types = apiInfo.map(e => e.dietTypes).flat();
    types.forEach(e => {
        DietType.findOrCreate({
            where: { name: e }
        })
    })
    const allTypes = await DietType.findAll();
    res.send(allTypes)
})

router.post('/recipe', async (req, res) => {
    let {
        name,
        summary,
        score,
        healthyLevel,
        instructions,
        diets,
        isVegan,
        isVegetarian,
        isGlutenFree,
        createdOnDb
    } = req.body;


    let recipeCreated = await Recipe.create({
        name,
        summary,
        score,
        healthyLevel,
        instructions,
        isVegan,
        isVegetarian,
        isGlutenFree,
        createdOnDb
    })

    let dietsDb = await DietType.findAll({
        where: { name: diets }
    })

    recipeCreated.addDietType(dietsDb);

    res.send('You added a new recipe');


})
module.exports = router;
