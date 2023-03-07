var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import EmberObject, { action, setProperties } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';
class BsPopoverComponent extends Component {
    constructor(...args) {
        super(...args);
        this.wormholeId = null;
        this.parentElement = null;
        this.type = 'popover';
        this._options = EmberObject.create({});
        registerDestructor(this, () => this.doDestroy);
    }
    setParent(elem) {
        this.siblingUpElement = elem.previousElementSibling;
        this.siblingDownElement = elem.nextElementSibling;
        this.parentElement = elem.parentElement;
        elem.remove();
        this.addTooltip();
    }
    getTargetElement() {
        if (this.args.targetSibling) {
            if (this.args.targetSibling === 'up') {
                return this.siblingUpElement;
            }
            if (this.args.targetSibling === 'down') {
                return this.siblingDownElement;
            }
        }
        if (this.args.targetId) {
            return document.getElementById(this.args.targetId);
        }
        if (this.args.targetElement) {
            return this.args.targetElement;
        }
        return this.parentElement;
    }
    updateOptions() {
        setProperties(this._options, {
            trigger: this.args.triggerOn,
            sticky: this.args.sticky,
            title: this.args.title,
            show: this.args.show,
            content: this.args.content,
            placement: this.args.placement
        });
    }
    addTooltip() {
        if (this.currentTarget === this.getTargetElement()) {
            return;
        }
        if (this.popoverId) {
            this.tooltipBoxManager.unregisterTip(this.popoverId);
            this.popoverId = null;
        }
        if (!this.getTargetElement())
            return;
        this.currentTarget = this.getTargetElement();
        this.popoverId = this.tooltipBoxManager.registerTip(this.type, this._options, this.getTargetElement(), this);
    }
    doDestroy() {
        this.wormholeId = null;
        this.tooltipBoxManager.unregisterTip(this.popoverId);
    }
}
__decorate([
    service('ember-bscomponents@tooltip-box-manager')
], BsPopoverComponent.prototype, "tooltipBoxManager", void 0);
__decorate([
    tracked
], BsPopoverComponent.prototype, "wormholeId", void 0);
__decorate([
    tracked
], BsPopoverComponent.prototype, "parentElement", void 0);
__decorate([
    action
], BsPopoverComponent.prototype, "setParent", null);
__decorate([
    action
], BsPopoverComponent.prototype, "updateOptions", null);
__decorate([
    action
], BsPopoverComponent.prototype, "addTooltip", null);
export default BsPopoverComponent;
