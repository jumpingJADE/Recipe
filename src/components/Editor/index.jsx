import React from 'react'
import { styled } from '@/utils'
import styles from './index.module.scss'
import Button from '@/components/Button'
import { v4 as uuidV4 } from 'uuid';


const EditorPanel = (props) => {
  const {
    handleSelectRecipe,
    handleRecipeChange,
    handleRecipeSelect
  } = props

  const recipe = handleSelectRecipe()

  const { id, name, cookTime, servings, instructions, ingredients } = recipe

  const handleChange = (change_item) => {
    handleRecipeChange(id, { ...recipe, ...change_item })
  }

  function handleInstructionAdd() {
    handleChange({ instructions: [...instructions, ''] })
  }

  function handleInstructionDelete(index) {
    handleChange({ instructions: instructions.filter((_, i) => i !== index) })
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidV4(),
      name: '',
      amount: ''
    }
    handleChange({ ingredients: [...ingredients, newIngredient] })
  }

  function handleIngredientDelete(index) {
    handleChange({ ingredients: ingredients.filter((_, i) => i !== index) })
  }

  return (
    <div className={styled(styles, 'container')}>

      <div className={styled(styles, 'container_header')}>
        <span className={styled(styles, 'container_title')}>Edit Recipe</span>
        <Button className="btn-danger" onClick={() => handleRecipeSelect(null)}>X</Button>
      </div>

      <div className={styled(styles, 'sample_panel')}>

        <div className={styled(styles, 'panel_item')}>
          <label htmlFor="editor_name">Name</label>
          <input type="text" id='editor_name' value={name}
            onChange={e => handleChange({ name: e.target.value })}
          />
        </div>

        <div className={styled(styles, 'panel_item')}>
          <label htmlFor="cook_time">Cook Time</label>
          <input type="text" id='cook_time' value={cookTime}
            onChange={e => handleChange({ cookTime: e.target.value })}
          />
        </div>

        <div className={styled(styles, 'panel_item')}>
          <label htmlFor="servings">Servings</label>
          <input type="text" id='servings' value={servings}
            onChange={e => handleChange({ servings: e.target.value })}
          />
        </div>
      </div>

      <div className={styled(styles, 'instructions_panel')}>
        <span className={styled(styles, 'title')}>Instructions</span>
        {
          instructions && Array.isArray(instructions) && instructions.map((instruction, index) => {
            const instructionId = `instruction-${index}`
            return (
              <div key={index} className={styled(styles, 'panel_item')}>
                <label htmlFor={instructionId}>{`Step ${index + 1}`}</label>
                <input
                  type="text"
                  id={instructionId}
                  value={instruction}
                  onChange={e => handleChange({
                    instructions:
                      [...instructions.slice(0, index),
                      e.target.value,
                      ...instructions.slice(index + 1)]
                  })}
                />
                <Button className={styled(styles, 'btn-danger')} onClick={() => handleInstructionDelete(index)}>X</Button>
              </div>
            )
          })
        }
        <div className={styled(styles, 'add')}>
          <Button
            className={styled(styles, 'btn-primary')}
            onClick={() => {
              handleInstructionAdd()
            }}>Add Instruction</Button>
        </div>
      </div>

      <div className={styled(styles, 'ingredients_panel')}>
        <span className={styled(styles, 'title')}>Ingredients</span>
        <div className={styled(styles, 'title_item')}>
          <label>Name</label>
          <label>Amount</label>
          <span className={styled(styles, 'hidden')} >
            <Button className={styled(styles, 'btn-danger')}>X</Button>
          </span>
        </div>
        {
          ingredients && Array.isArray(ingredients) && ingredients.map((ingredient, index) => {
            const ingredientId = `ingredient-${index}`
            return (
              <div key={index} className={styled(styles, 'panel_item')}>
                <input
                  type="text"
                  id={ingredientId}
                  value={ingredient.name}
                  onChange={e => handleChange({
                    ingredients:
                      [...ingredients.slice(0, index),
                      { ...ingredient, name: e.target.value },
                      ...ingredients.slice(index + 1)]
                  })}
                />
                <input
                  type="text"
                  id={ingredientId}
                  value={ingredient.amount}
                  onChange={e => handleChange({
                    ingredients:
                      [...ingredients.slice(0, index),
                      { ...ingredient, amount: e.target.value },
                      ...ingredients.slice(index + 1)]
                  })}
                />
                <Button className={styled(styles, 'btn-danger')} onClick={() => handleIngredientDelete(index)}>X</Button>
              </div>
            )
          })
        }
        <div className={styled(styles, 'add')}>
          <Button
            className={styled(styles, 'btn-primary')}
            onClick={() =>
              handleIngredientAdd()
            }>Add Ingredient</Button>
        </div>
      </div>

    </div >
  )
}

export default EditorPanel