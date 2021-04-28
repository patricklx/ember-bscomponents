import Component from '@glimmer/component';

type Args = {
  onItemSelected(): void
  contentPath: string
  selected: any
  content: any[]
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class BsTabs extends Component<Args> {

}
