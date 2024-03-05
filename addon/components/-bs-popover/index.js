/* eslint-disable ember/no-jquery */
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { cancel, bind, next } from '@ember/runloop';
import { tracked } from "@glimmer/tracking";


function offset(elem) {
  const rect = elem.getBoundingClientRect();
  const win = elem.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
}


export default class InternalPopoverComponent extends Component {
  @service('ember-bscomponents@tooltip-box-manager') tooltipBoxManager;
  @tracked receivedContent = false;
  @tracked resized = 0;
  @tracked _tipElement;
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

  /**
   *
   * @return {HTMLElement}
   */
  get $tip() {
    return this._tipElement;
  }
  set $tip(v) {
    return this._tipElement = v;
  }

  get style() {
    if (!this.$tip) {
      return htmlSafe('');
    }
    const opacity = this.receivedContent ? 1 : 0;
    Object.assign(this.$tip.style, {
      top: 0,
      left: 0,
      display: 'block'
    });
    this.$tip.classList.add(this.realPlacement)

    const placement = this.realPlacement;
    const pos = this.getPosition();
    const actualWidth = this.$tip.offsetWidth;
    const actualHeight = this.$tip.offsetHeight;
    if (actualHeight < 20) {
      return htmlSafe('');
    }
    const calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
    return htmlSafe(`top: ${calculatedOffset.top}px; left: ${calculatedOffset.left}px; display: block; opacity: ${opacity}`);
  }

  @action
  didInsert(elem) {
    next(() => {
      this.$tip = elem.parentElement;
      const ref = this.args.data.trigger;
      this.$element = this.args.data.target;
      if ((ref === 'hover' || !ref) && this.args.data.sticky) {
        this.element.addEventListener('mouseenter', () => {
          cancel(this.tooltipBoxManager.timeout);
        });
        this.element.addEventListener(
          'mouseleave',
          bind(this.tooltipBoxManager, this.tooltipBoxManager.removeTip, this.args.tip_id)
        );
      }
      this.args.didInsertElementCallback?.(elem);
      if (elem.innerHTML.length) {
        this.afterResize();
      }
    })
  }

  @action
  afterResize() {
    if (this.isDestroyed) {
      return;
    }
    this.resized += 1;
    return this.receivedContent = true;
  }

  get realPlacement() {
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
    actualWidth = this.$tip.offsetWidth;
    actualHeight = this.$tip.offsetHeight;
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
    el = this.$element;
    const clientRect =  el.getBoundingClientRect?.() || {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
    const { width, height } = clientRect;
    pos = Object.assign({}, { width, height }, offset(this.$element));
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

