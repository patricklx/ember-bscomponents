import Component from '@glimmer/component';

type Args = {
  type: 'primary'|'secondary'|'default';
  size: 'sm'|'lg'|'md'|'xs';
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class BsButtonComponent extends Component<Args> {}
