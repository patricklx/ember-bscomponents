import Component from '@ember/component';
import layout from './template';

class BsBtnGroup extends Component {
  layout = layout;

  get args() {
    const o = {};
    Object.keys(this.attrs).forEach((k) => {
      o[k] = this.get(k);
    });
    return o;
  }
}

export default BsBtnGroup;
