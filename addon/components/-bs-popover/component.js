import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias, readOnly } from '@ember/object/computed';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/string';
import template from './template';
import jQuery from 'jquery';
import { tracked } from "@glimmer/tracking";


export default class InternalPopoverComponent extends Component {
  tagName = '';
  layout = template;

  @service('ember-bscomponents@tooltip-box-manager') tooltipBoxManager;
  @alias('data.title') title;
  @alias('data.content') content;
  @tracked receivedContent = false;
  @tracked resized = 0;
  @readOnly('animation') fade;
  @readOnly('receivedContent') in;
  delay = 0;
  animation = true;
  $element = null;
  tipElement = null;

  get placement() {
    return (this.data && this.data.placement) || 'top';
  }

  get $tip() {
    return this._tipElement;
  }
  set $tip(v) {
    return this._tipElement = jQuery(v);
  }

  get style() {
    let actualHeight, actualWidth, calculatedOffset, opacity, placement, pos;
    if (!this.$tip) {
      return htmlSafe('');
    }
    opacity = this.receivedContent ? 1 : 0;
    this.$tip.css({
      top: 0,
      left: 0,
      display: 'block'
    }).addClass(this.realPlacement);

    placement = this.realPlacement;
    pos = this.getPosition();
    actualWidth = this.$tip[0].offsetWidth;
    actualHeight = this.$tip[0].offsetHeight;
    calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
    return htmlSafe(`top: ${calculatedOffset.top}px; left: ${calculatedOffset.left}px; display: block; opacity: ${opacity}`);
  }

  didInsertElement() {
    let ref = this.get('data.trigger');
    this.$element = jQuery(this.data.target);
    if ((ref === 'hover' || !ref) && this.get('data.sticky')) {
      jQuery(this.element).on('mouseenter', () => {
        clearTimeout(this.get('tooltipBoxManager.timeout'));
      });
      jQuery(this.element).on('mouseleave', () => {
        this.get('tooltipBoxManager').removeTip(this.get('tip_id'));
      });
    }
    this.didInsertElementCallback();
  }

  didInsertElementCallback() {}

  @action
  afterResize() {
    if (this.isDestroyed) {
      return;
    }
    this.resized += 1;
    return this.receivedContent = true;
  }

  realPlacement() {
    let actualHeight, actualWidth, autoPlace, autoToken, docScroll, parentHeight, parentLeft,
      parentWidth, placement, pos;
    if (!this.$tip) {
      return null;
    }
    placement = this.placement || '';
    autoToken = /\s?auto?\s?/i;
    autoPlace = autoToken.test(placement);
    if (autoPlace) {
      placement = placement.replace(autoToken, '') || 'top';
    }
    pos = this.getPosition();
    actualWidth = this.$tip[0].offsetWidth;
    actualHeight = this.$tip[0].offsetHeight;
    if (autoPlace) {
      docScroll = document.documentElement.scrollTop || document.body.scrollTop;
      parentWidth = window.innerWidth;
      parentHeight = window.innerHeight;
      parentLeft = 0;
      placement = (placement === 'bottom' && pos.top + pos.height + actualHeight - docScroll > parentHeight ? 'top' : (placement === 'top' && pos.top - docScroll - actualHeight < 0 ? 'bottom' : (placement === 'right' && pos.right + actualWidth > parentWidth ? 'left' : (placement === 'left' && pos.left - actualWidth < parentLeft ? 'right' : placement))));
    }
    return placement;
  }

  getPosition() {
    let el, pos;
    el = this.$element[0];
    pos = jQuery.extend({}, ((typeof el.getBoundingClientRect === 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }), this.$element.offset());
    return pos;
  }

  getCalculatedOffset(placement, pos, actualWidth, actualHeight) {
    if (placement === 'bottom') {
      return {
        top: pos.top + pos.height,
        left: pos.left + pos.width / 2 - actualWidth / 2
      };
    } else if (placement === 'top') {
      return {
        top: pos.top - actualHeight,
        left: pos.left + pos.width / 2 - actualWidth / 2
      };
    } else if (placement === 'left') {
      return {
        top: pos.top + pos.height / 2 - actualHeight / 2,
        left: pos.left - actualWidth
      };
    } else {
      return {
        top: pos.top + pos.height / 2 - actualHeight / 2, // placement == 'right'
        left: pos.left + pos.width
      };
    }
  }

  @action
  close() {
    this.tooltipBoxManager.removeTip(this.tip_id);
  }
}

