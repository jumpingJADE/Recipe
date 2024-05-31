import React from 'react';
import styles from './index.module.scss';
import { classNameStyled } from '@/utils';
import Button from '@/components/Button'

const RecipeList = (props) => {
  const { recipes, selectedRecipeId, className } = props
  const classNames = classNameStyled(className, styles, 'container')
  return (
    <div className={classNames}>
      <div className={styles['title']}>
        TopCoder Recipe Book
      </div>
      <div className={styles['add']}>
        <Button className="btn-big" onClick=" ">Add Recipe</Button>
      </div>

    </div>
  )
}

export default RecipeList