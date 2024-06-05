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

const App = () => {

  const [recipes, setRecipes] = React.useState(sampleRecipes)
  const [selectedRecipeId, setSelectedRecipeId] = React.useState()


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
    setRecipes([...recipes, newRecipe])
  }

  // Delete
  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  // Selecte
  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleSelectRecipe() {
    return recipes.find(recipe => recipe.id === selectedRecipeId)
  }

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