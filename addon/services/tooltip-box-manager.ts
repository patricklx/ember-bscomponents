/* eslint-disable ember/no-jquery */
import { addObserver } from '@ember/object/observers';
import Service from '@ember/service';
import {later, next, scheduleOnce} from '@ember/runloop';
import EmberObject, { set, get } from '@ember/object';
import { A } from '@ember/array';
import jQuery from 'jquery';
import { tracked } from '@glimmer/tracking';
/*
The Manager is based on the code from the emberjs action helper.
the tooltip/popover helper sets the attribute TooltipBoxManager.attribute (currently: bootstrap-tip-id)
with an id that will be increased with each tip.
AfterRender the manager binds a function to each element containing the attribute 'bootstrap-tip-id'
and on 'willClearRender' it will be removed
*/

class TooltipBoxManager extends Service {
  uuid = 0;
  attribute = 'bootstrap-tip-id';
  willSetup = false;
  registeredTips = {};
  @tracked popovers = A<any>();
  @tracked tooltips = A<any>();
  showing = {};
  timeout = null;

  unregisterTip(id) {
    if (!id || !this.registeredTips[id]) {
      return;
    }
    const elem = this.registeredTips[id].element as Element;
    this.removeTip(id);
    jQuery(elem).off();
    delete this.registeredTips[id];
  }

  registerTip(type, object, target, view) {
    this.uuid += 1;
    const id = this.uuid;
    object.elementId = `bs-tip-${  id}`;
    object.target = target;
    this.registeredTips[id] = {
      id: id,
      view: view,
      element: target,
      data: object,
      eventName: object.trigger || (type === 'popover' ? 'click' : 'hover'),
      bound: false,
      type: type,
      sticky: object.sticky,
      show: () => {
        this.showTip(id);
      },
      hide: () => {
        this.hideTip(id, true);
      },
      toggle: () => {
        this.toggleTip(id);
      }
    };
    if (!this.willSetup) {
      this.willSetup = true;
      // eslint-disable-next-line ember/no-incorrect-calls-with-inline-anonymous-functions
      scheduleOnce('afterRender', this, () => {
        this.setupBindings();
      });
    }
    return id;
  }

  setupBindings() {
    let elem, i, pop;
    for (i in this.registeredTips) {
      pop = this.registeredTips[i];
      if (pop.bound === false) {
        pop.bound = true;
        elem = jQuery(pop.element);
        switch (pop.eventName) {
          case 'click':
            elem.on('click', $.proxy(pop.toggle, pop));
            break;
          case 'hover':
            elem.on('mouseenter', $.proxy(pop.show, pop));
            elem.on('mouseleave', $.proxy(pop.hide, pop));
            break;
          case 'focus':
            elem.on('focusin', $.proxy(pop.show, pop));
            elem.on('focusout', $.proxy(pop.hide, pop));
            break;
          case 'manual':
            // eslint-disable-next-line ember/no-observers
            addObserver(pop, 'data.show', pop, function(sender, key) {
              const value = get(sender, key);
              if (value) {
                pop.show();
              } else {
                pop.hide();
              }
            });
        }
        if (pop.data.show) {
          pop.show();
        }
      }
    }
    this.willSetup = false;
  }

  showTip(id) {
    const data = this.registeredTips[id].data;
    const type = this.registeredTips[id].type;
    const view = this.registeredTips[id].view;
    if (!this.showing[id]) {
      this.showing[id] = true;
      const obj = EmberObject.create({
        data: data,
        tip_id: id,
        removed: false,
        didInsert: () => {
          set(view, 'wormholeId', this.registeredTips[id].data.elementId);
        },
        didRemove: () => {
          obj.removed = true;
          if (!view.isDestroyed) {
            return set(view, 'wormholeId', null);
          }
        }
      });
      next(() => {
        if (obj.removed) return;
        if (type === 'tooltip') {
          this.tooltips.pushObject(obj);
        }
        else {
          this.popovers.pushObject(obj);
        }
      });
    }
  }
  hideTip(id, allowTimer?: boolean) {
    let data;
    if (this.showing[id]) {
      data = this.registeredTips[id].data;
      if (allowTimer && data.sticky) {
        this.timedRemove(id);
      } else {
        this.removeTip(id);
      }
    }
  }

  toggleTip(id) {
    if (this.showing[id]) {
      this.hideTip(id);
    } else {
      this.showTip(id);
    }
  }

  timedRemove(id) {
    this.timeout[id] = later(() => {
      delete this.timeout[id];
      this.removeTip(id);
    }, 100);
  }

  removeTip(id) {
    const pop = this.popovers.findBy('tip_id', id) || this.tooltips.findBy('tip_id');
    if (pop) {
      pop.didRemove();
    }
    next(() => {
      this.popovers.removeObject(pop);
      this.tooltips.removeObject(pop);
      delete this.showing[id];
    });
    return pop;
  }
}

export default TooltipBoxManager;
