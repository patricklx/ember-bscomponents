`import Ember from 'ember'`
`import linkTemplate from './template'`


BsPillLinkView = Ember.View.extend(
  tagName: 'a'
  template: linkTemplate
  attributeBindings: ['href']
  href: "#"
)

`export default BsPillLinkView`
