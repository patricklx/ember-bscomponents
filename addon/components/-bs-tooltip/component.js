import template from './template';
import BsPopoverComponent from '../-bs-popover/component';
import { setComponentTemplate } from '@ember/component';


export default class BsTooltipComponent extends BsPopoverComponent {
}

setComponentTemplate(template, BsTooltipComponent);



