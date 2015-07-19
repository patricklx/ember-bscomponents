
isIn = (leftSide, rightSide) ->
  return leftSide in rightSide

isInHelper = Ember.Handlebars.makeBoundHelper(isEqual)

`export {isIn}`
`export default isInHelper`
