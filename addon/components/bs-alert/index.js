var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from '@glimmer/component';
import { later } from '@ember/runloop';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
class BsAlertComponent extends Component {
    get show() {
        var _a;
        const s = (_a = this.internalShow) !== null && _a !== void 0 ? _a : this.args.show;
        if (s === undefined) {
            return true;
        }
        return s;
    }
    set show(v) {
        this.internalShow = v;
    }
    setupDismiss() {
        if (this.args.dismissAfter > 0) {
            const autoDismiss = () => {
                if (this.isDestroyed) {
                    return;
                }
                if (this.args.onAutoDismiss) {
                    this.args.onAutoDismiss();
                }
                this.show = false;
            };
            later(this, autoDismiss, this.args.dismissAfter * 1000);
        }
    }
    dismiss(event) {
        var _a;
        event.preventDefault();
        const p = (_a = this.args) === null || _a === void 0 ? void 0 : _a.onDismiss();
        return Promise.resolve(p).finally(() => {
            this.show = false;
        });
    }
}
__decorate([
    tracked
], BsAlertComponent.prototype, "internalShow", void 0);
__decorate([
    action
], BsAlertComponent.prototype, "setupDismiss", null);
__decorate([
    action
], BsAlertComponent.prototype, "dismiss", null);
export default BsAlertComponent;
