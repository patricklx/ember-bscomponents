import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

type Args = {
  progress: number;
  stripped: boolean;
  type: 'info'|'warn'|'error'|'success';
  animated: boolean;
}

export default class BsProgressbarComponent extends Component<Args> {
  role = 'progressbar';

  get style() {
    return htmlSafe(`width:${this.args.progress}%;`);
  }

  get ariaValueNow() {
    return this.args.progress;
  }
}
