import BsPopoverComponent, { Args } from "../bs-popover";
import template from 'ember-bscomponents/components/bs-popover/template';
import { setComponentTemplate } from '@ember/component';

class BsTooltipComponent extends BsPopoverComponent<Args> {
  type = 'tooltip';
}
setComponentTemplate(template, BsTooltipComponent);
export default BsTooltipComponent;
