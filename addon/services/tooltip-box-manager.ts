import { addObserver } from '@ember/object/observers';
import Service from '@ember/service';
import { later, next, scheduleOnce } from '@ember/runloop';
import EmberObject, { set, get } from '@ember/object';
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
  @tracked showing: Record<string, any> = {};
  timeout = null;

  get tooltips() {
    return Object.values(this.showing).filter(v => v.type === 'tooltip');
  }

  get popovers() {
    return Object.values(this.showing).filter(v => v.type === 'popover');
  }

  unregisterTip(id) {
    if (!id || !this.registeredTips[id]) {
      return;
    }
    const pop = this.registeredTips[id];
    this.removeTip(id);
    pop.element.removeEventListener('click', pop.toggle);
    pop.element.removeEventListener('mouseenter', pop.show);
    pop.element.removeEventListener('mouseleave', pop.hide);
    pop.element.removeEventListener('focusin', pop.show);
    pop.element.removeEventListener('focusout', pop.hide);
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
        elem = pop.element;
        switch (pop.eventName) {
          case 'click':
            elem.addEventListener('click', pop.toggle);
            break;
          case 'hover':
            elem.addEventListener('mouseenter', pop.show);
            elem.addEventListener('mouseleave', pop.hide);
            break;
          case 'focus':
            elem.addEventListener('focusin', pop.show);
            elem.addEventListener('focusout', pop.hide);
            break;
          case 'manual':
            // eslint-disable-next-line ember/no-observers
            addObserver(pop, 'data.show', pop, function(sender, key) {
              next(() => {
                const value = get(sender, key);
                if (value) {
                  pop.show();
                } else {
                  pop.hide();
                }
              })
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
      const obj = EmberObject.create({
        data: data,
        tip_id: id,
        type,
        removed: false,
        didInsert: (elem) => {
          set(view, 'wormholeId', elem);
        },
        didRemove: () => {
          obj.removed = true;
          if (!view.isDestroyed) {
            return set(view, 'wormholeId', null);
          }
        }
      } as any);
      this.showing[id] = obj;
      this.showing = { ...this.showing }
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
    const pop = this.showing[id];
    if (pop) {
      pop.didRemove();
    }
    next(() => {
      delete this.showing[id];
      this.showing = { ...this.showing }
    });
    return pop;
  }
}

export default TooltipBoxManager;
