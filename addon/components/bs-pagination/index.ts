import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

type Args = {
  totalLength: number;
  itemsPerPage: number;
  itemsPerGroup: number;
  onItemSelected(item: number): void;
};

class BsPagination extends Component<Args> {

  @tracked selected = 1;
  @tracked currentPageGroup = 0;
  private rendered: boolean;

  @action
  updateSelectedItem() {
    const last = this.content[this.content.length - 2];
    if (this.selected > last) {
      this.onItemSelect(last);
    }
  }

  get content(): number[] {
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
    this.args.onItemSelected(item);
  }

  @action
  didInsert() {
    this.rendered = true;
  }
}

export default BsPagination;
