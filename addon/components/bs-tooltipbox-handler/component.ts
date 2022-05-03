import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import TooltipBoxManager from 'ember-bscomponents/services/tooltip-box-manager';

export default class BsTooltipBoxComponent extends Component {
  @service('ember-bscomponents@tooltip-box-manager') manager: TooltipBoxManager;

  get popovers() {
    return this.manager.popovers;
  }

  get tooltips() {
    return this.manager.tooltips;
  }
}
