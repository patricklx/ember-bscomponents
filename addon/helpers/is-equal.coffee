
isEqual = (leftSide, rightSide) ->
  return leftSide == rightSide

isEqualHelper = Ember.Handlebars.makeBoundHelper(isEqual)

`export {isEqual}`
`export default isEqualHelper`
