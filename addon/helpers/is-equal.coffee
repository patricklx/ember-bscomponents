`import Ember from 'ember';`

isEqual = ([leftSide, rightSide]) ->
  return leftSide == rightSide

isEqualHelper = Ember.Helper.helper(isEqual)

`export {isEqual, isEqualHelper}`
`export default isEqualHelper`
