import Component from '@glimmer/component';

type Args = {
  progress: number;
  stripped: boolean;
  type: 'info'|'warn'|'error'|'success';
  animated: boolean;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class BsProgressComponent extends Component<Args> {
}
