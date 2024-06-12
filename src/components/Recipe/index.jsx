import React from 'react';
import styles from './index.module.scss';
import { classNameStyled, styled } from '@/utils';
import Button from '@/components/Button'
import Header from '@/components/Header';
import Panel from '@/components/Panel';

const RecipeList = (props) => {
  const { recipes,
    selectedRecipeId,
    lastSelectedRecipeId,
    className,
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect
  } = props
  // Tigger
  const [newAddRecipe, setNewAddRecipe] = React.useState(false)
  const ref = React.useRef()
  const addRecipe = () => {
    handleRecipeAdd()
    setNewAddRecipe(true)
  }
  React.useEffect(() => {
    if (newAddRecipe) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
      })
      setNewAddRecipe(false)
    }
  }, [newAddRecipe])

  const classNames = classNameStyled(className, styles, 'container')
  return (
    <div className={classNames}>
      <div className={styles['title']}>
        Richard's Recipe HandBook
      </div>
      <div className={styles['add']}>
        <Button className="btn-big" onClick={addRecipe}>Add Recipe</Button>
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
              lastSelectedRecipeId={lastSelectedRecipeId}
            />
          ))
        }
      </div>
      <div className={styles['add']}>
        <Button className="btn-big" onClick={addRecipe}>Add Recipe</Button>
      </div>
      <div className={styles['the-end']} ref={ref}></div>
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
    selectedRecipeId,
    lastSelectedRecipeId
  } = props

  const [chosen, setChosen] = React.useState('')
  const [lastChosen, setLastChosen] = React.useState('')

  React.useEffect(() => {
    selectedRecipeId === id ? setChosen('chosen') : setChosen('')
  }, [selectedRecipeId])
  React.useEffect(() => {
    lastSelectedRecipeId === id ? setLastChosen('last-chosen') : setLastChosen('')
  }, [selectedRecipeId])

  return (
    <div
      className={styled(styles, className, 'recipe', chosen, lastChosen)}
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