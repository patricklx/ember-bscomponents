import { addObserver } from '@ember/object/observers';
import Service from '@ember/service';
import { next } from '@ember/runloop';
import { set, get } from '@ember/object';
import jQuery from 'jquery';
/*
The Manager is based on the code from the emberjs action helper.
the tooltip/popover helper sets the attribute TooltipBoxManager.attribute (currently: bootstrap-tip-id)
with an id that will be increased with each tip.
AfterRender the manager binds a function to each element containing the attribute 'bootstrap-tip-id'
and on 'willClearRender' it will be removed
*/
let instance;

instance = null;

class TooltipBoxManager extends Service {
  uuid = 0;
  attribute = 'bootstrap-tip-id';
  willSetup = false;
  registeredTips = {};
  init(...args) {
    instance = this;
    return super.init(...args);
  }
  unregisterTip(id) {
    var elem;
    if (!id || !this.registeredTips[id]) {
      return;
    }
    elem = this.registeredTips[id].element;
    this.removeTip(id);
    jQuery(elem).unbind();
    delete this.registeredTips[id];
  }

  registerTip(type, object, target, view) {
    var id, self;
    id = ++this.uuid;
    self = this;
    object.elementId = 'bs-tip-' + id;
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
      show: function() {
        self.showTip(id);
      },
      hide: function() {
        self.hideTip(id, true);
      },
      toggle: function() {
        self.toggleTip(id);
      }
    };
    if (!this.willSetup) {
      this.willSetup = true;
      Ember.run.scheduleOnce('afterRender', this, function() {
        self.setupBindings();
      });
    }
    return id;
  }

  setupBindings() {
    var elem, i, pop;
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
            addObserver(pop, 'data.show', pop, function(sender, key) {
              var value;
              value = get(sender, key);
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
  popovers = [];
  tooltips = [];
  showing = {};
  timeout = null;
  showTip(id) {
    var data, obj, type, view;
    data = this.registeredTips[id].data;
    type = this.registeredTips[id].type;
    view = this.registeredTips[id].view;
    if (!this.showing[id]) {
      this.showing[id] = true;
      obj = Ember.Object.create({
        data: data,
        tip_id: id,
        didInsert: () => {
          Ember.set(view, 'wormholeId', this.registeredTips[id].data.elementId);
        },
        didRemove: () => {
          if (!view.isDestroyed) {
            return set(view, 'wormholeId', null);
          }
        }
      });
      if (type === 'tooltip') {
        this.tooltips.pushObject(obj);
      } else {
        this.popovers.pushObject(obj);
      }
    }
  }
  hideTip(id, allowTimer) {
    var data;
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
    var self;
    self = this;
    this.timeout = setTimeout(function() {
      self.removeTip(id);
    }, 100);
  }

  removeTip(id) {
    var pop;
    pop = this.popovers.findBy('tip_id', id) || this.tooltips.findBy('tip_id');
    this.popovers.removeObject(pop);
    this.tooltips.removeObject(pop);
    delete this.showing[id];
    if (pop) {
      next(() => {
        return pop.didRemove();
      });
    }
    return pop;
  }
}

export default TooltipBoxManager;
