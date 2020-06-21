import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import layout from './template';

export default class BsTooltipBoxComponent extends Component {
  layout = layout;
  @service('ember-bscomponents@tooltip-box-manager') manager;

  @computed('this.manager.popovers')
  get popovers() {
    return this.manager.popovers;
  }

  @computed('this.manager.tooltips')
  get tooltips() {
    return this.manager.tooltips;
  }
}
