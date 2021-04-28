import Component from '@glimmer/component';
import { htmlSafe } from '@ember/string';

type Args = {
  progress: number;
  type: 'info'|'warn'|'error'|'success';
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
