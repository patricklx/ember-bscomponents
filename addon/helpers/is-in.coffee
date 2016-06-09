`import Ember from 'ember';`

isIn = ([leftSide, rightSide]) ->
  return leftSide in rightSide

isInHelper = Ember.Helper.helper(isIn)

`export {isIn, isInHelper}`
`export default isInHelper`
