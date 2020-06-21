import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import template from './template';
import { tracked } from "@glimmer/tracking";


class BsPagination extends Component {
  layout = template;
  tagName = '';

  @tracked totalLength = 0;
  @tracked itemsPerPage = 0;
  @tracked itemsPerGroup = 0;
  @tracked selected = 1;
  @tracked currentPageGroup = 0;

  @action
  updateSelectedItem() {
    const last = this.content[this.content.length - 2];
    if (this.selected > last) {
      this.onItemSelect(last);
    }
  }

  get content() {
    const nItems = Math.ceil(this.totalLength / this.itemsPerPage);
    const start = this.itemsPerGroup * this.currentPageGroup;
    const items = [];
    if (start > 0) {
      items.push('«');
    }
    let i = 0;
    while (i < this.itemsPerGroup && (start + i < nItems)) {
      items.push(start + i + 1);
      i++;
    }

    if (start < nItems - this.itemsPerGroup) {
      items.push('»');
    }

    return items
  }

  @action
  changeCurrentGroup(item) {
    const sp = item;
    const items = this.content;
    if (sp === '»') {
      this.currentPageGroup += 1;
      return items[items.length - 2] + 1;
    }
    if (sp === '«') {
      this.currentPageGroup -= 1;
      return items[1] - 1
    }
    return item;
  }

  @action
  onItemSelect(item) {
    item = this.changeCurrentGroup(item);
    if (this.rendered) {
      return;
    }
    this.attrs.onItemSelected(item);
  }

  @action
  didInsert() {
    this.rendered = true;
  }
}

export default BsPagination;
