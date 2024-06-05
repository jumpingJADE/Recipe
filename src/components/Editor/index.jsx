import React from 'react'
import { styled } from '@/utils'
import styles from './index.module.scss'
import Button from '@/components/Button'

const EditorPanel = (props) => {
  const {
    handleSelectRecipe,
    handleRecipeChange,
    handleRecipeSelect
  } = props

  const handleChange = (change_item) => {
    handleRecipeChange(id, { ...recipe, ...change_item })
  }
  const recipe = handleSelectRecipe()
  const { id, name, cookTime, servings, instructions, ingredients } = recipe
  return (
    <div className={styled(styles, 'container')}>
      <div className={styled(styles, 'container_header')}>
        <span className={styled(styles, 'container_title')}>Edit Recipe</span>
        <Button className='btn-danger' onClick={() => handleRecipeSelect(null)}>X</Button>
      </div>
      <div className={styled(styles, 'sample_panel')}>
        <div className={styled(styles, 'panel_item')}>
          <label htmlFor="editor_name">Name</label>
          <input type="text" id="editor_name" value={name}
            onChange={e => handleChange({ name: e.target.value })}
          />
        </div>
      </div>
      <div className={styled(styles, 'sample_panel')}>
        <div className={styled(styles, 'panel_item')}>
          <label htmlFor="cook_time">Cook Time</label>
          <input type="text" id="cook_time" value={cookTime}
            onChange={e => handleChange({ cookTime: e.target.value })}
          />
        </div>
      </div>
      <div className={styled(styles, 'sample_panel')}>
        <div className={styled(styles, 'panel_item')}>
          <label htmlFor="servings">Servings</label>
          <input type="text" id="servings" value={servings}
            onChange={e => handleChange({ servings: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

export default EditorPanel