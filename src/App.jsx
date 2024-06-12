import React from 'react'
import { v4 as uuidV4 } from 'uuid'
import RecipeList from '@/components/Recipe'
import EditorPanel from '@/components/Editor'

const sampleRecipes = [
  {
    id: uuidV4(),
    name: "Plain Chicken",
    servings: 3,
    cookTime: "2:45",
    instructions: [
      "Put salt on Chicken",
      "Put chicken in oven",
      "Eat chicken"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Chicken",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Salt",
        amount: "1 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: [
      "Put paprika on Pork",
      "Put pork in oven",
      "Eat pork"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Apple Pai",
    servings: 10,
    cookTime: "3:45",
    instructions: [
      "Put apples in pie",
      "Put pie in oven",
      "Eat pie"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  }
]

const recipesKey = import.meta.env.VITE_RECIPES_KEY
const selectedRecipeIdKey = import.meta.env.VITE_SELECTED_RECIPE_ID_KEY
const lastSelectedRecipeIdKey = import.meta.env.VITE_LAST_SELECTED_RECIPE_ID_KEY

const App = () => {

  const [recipes, setRecipes] = React.useState(() => {
    const localData = localStorage.getItem(recipesKey)
    return localData ? JSON.parse(localData) : sampleRecipes
  })
  React.useEffect(() => {
    localStorage.setItem(recipesKey, JSON.stringify(recipes))
  }, [recipes])
  const [selectedRecipeId, setSelectedRecipeId] = React.useState(() => {
    const localData = localStorage.getItem(selectedRecipeIdKey)
    return localData ? JSON.parse(localData) : null
  })
  React.useEffect(() => {
    localStorage.setItem(selectedRecipeIdKey, JSON.stringify(selectedRecipeId))
  }, [selectedRecipeId])
  const [lastSelectedRecipeId, setLastSelectedRecipeId] = React.useState(() => {
    const localData = localStorage.getItem(lastSelectedRecipeIdKey)
    return localData ? JSON.parse(localData) : null
  })
  React.useEffect(() => {
    localStorage.setItem(lastSelectedRecipeIdKey, JSON.stringify(lastSelectedRecipeId))
  }, [lastSelectedRecipeId])
  // Add
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidV4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: ["New Instruction 1", "New Instruction 2"],
      ingredients: [
        {
          id: uuidV4(),
          name: 'demo',
          amount: '1 Tbs'
        }
      ]
    }

    // Select the new recipe
    handleRecipeSelect(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  // Delete
  function handleRecipeDelete(id) {
    if(selectedRecipeId !== null && id === selectedRecipeId){
      setSelectedRecipeId(null)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  // Selecte
  function handleRecipeSelect(id) {
   if(!selectedRecipeId && id === lastSelectedRecipeId){
    setLastSelectedRecipeId(null)
   }else if(selectedRecipeId && id != selectedRecipeId){
    setLastSelectedRecipeId(selectedRecipeId)
   }
   setSelectedRecipeId(id)
  }

  // Find selected recipe
  function handleSelectRecipe() {
    return recipes.find(recipe => recipe.id === selectedRecipeId)
  }

  // Change recipe content
  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }
  return (
    <>
      <RecipeList
        recipes={recipes}
        selectedRecipeId={selectedRecipeId}
        lastSelectedRecipeId={lastSelectedRecipeId}
        handleRecipeAdd={handleRecipeAdd}
        handleRecipeDelete={handleRecipeDelete}
        handleRecipeSelect={handleRecipeSelect}
      />
      {
        selectedRecipeId &&
        <EditorPanel
          handleSelectRecipe={handleSelectRecipe}
          handleRecipeChange={handleRecipeChange}
          handleRecipeSelect={handleRecipeSelect}
        />
      }
    </>
  )
}

export default App