/* eslint-disable ember/no-jquery */
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { cancel, bind } from '@ember/runloop';
import jQuery from 'jquery';
import { tracked } from "@glimmer/tracking";


export default class InternalPopoverComponent extends Component {
  @service('ember-bscomponents@tooltip-box-manager') tooltipBoxManager;
  @tracked receivedContent = false;
  @tracked resized = 0;
  fade = true;
  delay = 0;
  $element = null;
  tipElement = null;

  get title() {
    return this.args.data.title;
  }

  get content() {
    return this.args.data.content;
  }

  get in() {
    return this.receivedContent;
  }

  get placement() {
    return (this.args.data && this.args.data.placement) || 'top';
  }

  get $tip() {
    return this._tipElement;
  }
  set $tip(v) {
    return this._tipElement = jQuery(v);
  }

  get style() {
    if (!this.$tip) {
      return htmlSafe('');
    }
    const opacity = this.receivedContent ? 1 : 0;
    this.$tip.css({
      top: 0,
      left: 0,
      display: 'block'
    }).addClass(this.realPlacement);

    const placement = this.realPlacement;
    const pos = this.getPosition();
    const actualWidth = this.$tip[0].offsetWidth;
    const actualHeight = this.$tip[0].offsetHeight;
    const calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
    return htmlSafe(`top: ${calculatedOffset.top}px; left: ${calculatedOffset.left}px; display: block; opacity: ${opacity}`);
  }

  @action
  didInsert(elem) {
    this.$tip = elem;
    const ref = this.args.data.trigger;
    this.$element = jQuery(this.args.data.target);
    if ((ref === 'hover' || !ref) && this.args.data.sticky) {
      jQuery(this.element).on('mouseenter', () => {
        cancel(this.tooltipBoxManager.timeout);
      });
      jQuery(this.element).on(
        'mouseleave',
        bind(this.tooltipBoxManager, this.tooltipBoxManager.removeTip, this.args.tip_id)
      );
    }
    this.args.didInsertElementCallback?.();
  }

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

