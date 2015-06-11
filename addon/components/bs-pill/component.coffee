`import NavItem from 'ember-cli-bscomponents/mixins/nav-item'`
`import ItemSelection from 'ember-cli-bscomponents/mixins/item-selection'`

BsPill = ItemView.extend(NavItem, ItemSelection,
    template: Ember.HTMLBars.compile '''
        {{#if view.content.linkTo}}
            {{#if view.parentView.dynamicLink}}
                {{#link-to view.content.linkTo model}}{{view.title}}{{/link-to}}
            {{else}}
                {{#link-to view.content.linkTo}}{{view.title}}{{/link-to}}
            {{/if}}
        {{else}}
            {{view view.pillAsLinkView}}
        {{/if}}
    '''

    pillAsLinkView: Ember.View.extend(
        tagName: 'a'
        template: Ember.HTMLBars.compile('{{view.parentView.title}}')
        attributeBindings: ['href']
        href: "#"
    )
)

`export default BsPill`
