`import Ember from "ember"`

isEqual = Ember.Helper.helper((leftSide, rightSide) ->
  return leftSide == rightSide
)

`export default isEqual`
