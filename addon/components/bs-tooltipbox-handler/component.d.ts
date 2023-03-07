import Component from '@glimmer/component';
import TooltipBoxManager from 'ember-bscomponents/services/tooltip-box-manager';
export default class BsTooltipBoxComponent extends Component {
    manager: TooltipBoxManager;
    get popovers(): import("@ember/array/-private/native-array").default<any>;
    get tooltips(): import("@ember/array/-private/native-array").default<any>;
}
