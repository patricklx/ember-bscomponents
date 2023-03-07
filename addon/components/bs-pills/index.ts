import Component from '@glimmer/component';

type Args = {
  onItemSelected(): void,
  selected: any;
  content: any;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class BsPills extends Component<Args> {

}
