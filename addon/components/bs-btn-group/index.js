import Component from '@ember/component';

class BsBtnGroup extends Component {

  get args() {
    const o = {};
    Object.keys(this.attrs).forEach((k) => {
      o[k] = this.get(k);
    });
    return o;
  }
}

export default BsBtnGroup;
