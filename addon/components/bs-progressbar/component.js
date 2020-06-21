import Component from '@glimmer/component';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { defaultArgs } from "../../decorators";
import { tracked } from "@glimmer/tracking";


export default class BsProgressbarComponent extends Component {

  @defaultArgs
  args = {
    progress: 0,
    type: null
  };

  role = 'progressbar';

  get style() {
    return htmlSafe(`width:${this.progress}%;`);
  }

  get ariaValueNow() {
    return this.progress;
  }
}
