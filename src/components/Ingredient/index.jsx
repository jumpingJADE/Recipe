import React from 'react'
import { styled } from '@/utils'
import styles from './index.module.scss'

const Ingredient = (props) => {
  const {
    ingredients,
    className,
    ...rest
  } = props
  return (
    <div className={styled(styles, 'ingredient', className)} {...rest}>
      <span className={styled(styles, 'ingredient_title')}>Ingredient:</span>
      <div className={styled(styles, 'ingredient_grid_item')}>
        {
          Array.isArray(ingredients) && ingredients.map((ingredient, index) => (
            <React.Fragment key={index}>
              <span className={styled(styles, 'ingredient_name')}>{ingredient.name}</span>
              <span className={styled(styles, 'ingredient_amount')}>{ingredient.amount}</span>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default Ingredient