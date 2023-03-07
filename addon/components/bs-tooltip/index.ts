import BsPopoverComponent, { Args } from "../bs-popover";
import Popover from 'ember-bscomponents/components/bs-popover';
import { setComponentTemplate, getComponentTemplate } from '@ember/component';

class BsTooltipComponent extends BsPopoverComponent<Args> {
  type = 'tooltip';
}
setComponentTemplate(getComponentTemplate(Popover), BsTooltipComponent);
export default BsTooltipComponent;
