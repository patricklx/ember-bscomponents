import BsPopoverComponent, { Args } from "../bs-popover/component";
import template from '../bs-popover/template';
import { setComponentTemplate } from '@ember/component';

class BsTooltipComponent extends BsPopoverComponent<Args> {
  type = 'tooltip';
}
setComponentTemplate(template, BsTooltipComponent);
export default BsTooltipComponent;
