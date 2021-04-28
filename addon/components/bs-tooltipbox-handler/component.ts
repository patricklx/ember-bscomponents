import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class BsTooltipBoxComponent extends Component {
  @service('ember-bscomponents@tooltip-box-manager') manager;

  get popovers() {
    return this.manager.popovers;
  }

  get tooltips() {
    return this.manager.tooltips;
  }
}
