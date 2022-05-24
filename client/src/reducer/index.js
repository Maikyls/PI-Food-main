
const initialState = {
    recipes: [],
    allRecipes: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'FILTER_BY_DIETTYPE':
            const allRecipes = state.allRecipes
            const dietTypeFiltered = action.payload === 'all' ? allRecipes : allRecipes.filter(e => e.dietTypes.includes(action.payload))
            return {
                ...state,
                recipes: dietTypeFiltered
            }
        default:
            return state;
    }
}

export default rootReducer;