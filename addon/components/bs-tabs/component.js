import Component from '@glimmer/component';
import { action } from '@ember/object';
import template from './template';
import { defaultArgs } from '../../decorators';

export default class BsTabs extends Component {
  layout = template;

  @defaultArgs
  args = {
    onItemSelected: function () {},
    contentPath: '',
    selected: null,
    content: null
  };
}
