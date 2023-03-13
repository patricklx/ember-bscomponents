import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

type Args = {
  onItemSelected(item: any): void
  contentPath: string
  selected: any
  content: any[]
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class BsTabsManager extends Component<Args> {
  @tracked _selected = null;
  @tracked tabs=[];

  get selected() {
    return this.args.selected ?? this._selected ?? this.args.content?.[0];
  }
  
  @action
  addTab(tab) {
    this.tabs = [...this.tabs, tab];
  }

  @action
  onItemSelected(item) {
    this.args.onItemSelected?.(item);
    this._selected = item;
  }
}
