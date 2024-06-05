import React from 'react';
import styles from './index.module.scss';
import { classNameStyled, styled } from '@/utils';
import Button from '@/components/Button'
import Header from '@/components/Header';
import Panel from '@/components/Panel';

const RecipeList = (props) => {
  const { recipes,
    selectedRecipeId,
    className,
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect
  } = props
  console.log(recipes);
  const classNames = classNameStyled(className, styles, 'container')
  return (
    <div className={classNames}>
      <div className={styles['title']}>
        TopCoder Recipe Book
      </div>
      <div className={styles['add']}>
        <Button className="btn-big" onClick={() => { handleRecipeAdd() }}>Add Recipe</Button>
      </div>
      <div>
        {
          recipes.map((recipe, index) => (
            <Recipe
              key={index}
              {...recipe}
              handleRecipeDelete={handleRecipeDelete}
              handleRecipeSelect={handleRecipeSelect}
              selectedRecipeId={selectedRecipeId}
            />
          ))
        }
      </div>
      <div className={styles['add']}>
        <Button className="btn-big" onClick={() => { handleRecipeAdd() }}>Add Recipe</Button>
      </div>
    </div>
  )
}

const Recipe = (props) => {
  const {
    id,
    name,
    cookTime,
    servings,
    instructions,
    ingredients,
    className,
    handleRecipeDelete,
    handleRecipeSelect,
    selectedRecipeId
  } = props

  const [chosen, setChosen] = React.useState('')

  React.useEffect(() => {
    selectedRecipeId === id ? setChosen('chosen') : setChosen('')
  }, [selectedRecipeId])

  return (
    <div
      className={styled(styles, className, 'recipe', chosen)}
      onClick={() => {
        handleRecipeSelect(id)
      }}
    >
      <Header
        id={id}
        title={name}
        deleteHandler={handleRecipeDelete}
      />
      <Panel
        id={id}
        cookTime={cookTime}
        servings={servings}
        instructions={instructions}
        ingredients={ingredients}
      />
    </div>
  )
}

export default RecipeList