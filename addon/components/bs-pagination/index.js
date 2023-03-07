var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
class BsPagination extends Component {
    constructor() {
        super(...arguments);
        this.selected = 1;
        this.currentPageGroup = 0;
    }
    updateSelectedItem() {
        const last = this.content[this.content.length - 2];
        if (this.selected > last) {
            this.onItemSelect(last);
        }
    }
    get content() {
        const nItems = Math.ceil(this.args.totalLength / this.args.itemsPerPage);
        const start = this.args.itemsPerGroup * this.currentPageGroup;
        const items = [];
        if (start > 0) {
            items.push('«');
        }
        let i = 0;
        while (i < this.args.itemsPerGroup && (start + i < nItems)) {
            items.push(start + i + 1);
            i += 1;
        }
        if (start < nItems - this.args.itemsPerGroup) {
            items.push('»');
        }
        return items;
    }
    changeCurrentGroup(item) {
        const sp = item;
        const items = this.content;
        if (sp === '»') {
            this.currentPageGroup += 1;
            return items[items.length - 2] + 1;
        }
        if (sp === '«') {
            this.currentPageGroup -= 1;
            return items[1] - 1;
        }
        return item;
    }
    onItemSelect(item) {
        item = this.changeCurrentGroup(item);
        if (this.rendered) {
            return;
        }
        this.args.onItemSelected(item);
    }
    didInsert() {
        this.rendered = true;
    }
}
__decorate([
    tracked
], BsPagination.prototype, "selected", void 0);
__decorate([
    tracked
], BsPagination.prototype, "currentPageGroup", void 0);
__decorate([
    action
], BsPagination.prototype, "updateSelectedItem", null);
__decorate([
    action
], BsPagination.prototype, "changeCurrentGroup", null);
__decorate([
    action
], BsPagination.prototype, "onItemSelect", null);
__decorate([
    action
], BsPagination.prototype, "didInsert", null);
export default BsPagination;
