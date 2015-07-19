`import Ember from 'ember'`
`import linkTemplate from './template'`


BsPillLinkView = Ember.Component.extend({
  tagName: 'a'
  template: linkTemplate
  attributeBindings: ['href']
  href: '#'
  title: null
})

`export default BsPillLinkView`
