import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
export default class BsProgressbarComponent extends Component {
    constructor() {
        super(...arguments);
        this.role = 'progressbar';
    }
    get style() {
        return htmlSafe(`width:${this.args.progress}%;`);
    }
    get ariaValueNow() {
        return this.args.progress;
    }
}
