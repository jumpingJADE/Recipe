export function classNameStyled(classNames, styles, preClassNames) {
  // "btn btn-primary" => ['btn', 'btn-primary']
  const classList = classNames ? classNames.split(' ') : []

  // "blue bold" => ["blue", "bold"]
  const preClassList = preClassNames ? preClassNames.split(' ') : []

  // ["btn", "btn-primary"] => ["btn-456", "btn-primary-123"]
  const classListStyled = classList.map(className => styles[className] || className)

  // ["blue", "bold"] => ["blue", "bold-456"]
  const preClassListStyled = preClassList.map(className => styles[className] || className)

  // ["btn-456", "btn-primary-123", "blue", "bold-456"] => "btn-456 btn-primary-123 blue bold-456"
  return [...preClassListStyled, ...classListStyled].join(' ')
}


export function styled(styles, ...rest) {
  const classList = []
  rest.forEach(classNames => {
    if (!classNames) return
    classNames.split(' ').forEach(className => {
      className && classList.push(styles[className] || className)
    })
  })
  return classList.join(' ')
}