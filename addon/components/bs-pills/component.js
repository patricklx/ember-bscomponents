import template from './template';
import {defaultArgs} from '../../decorators';
import Component from '@ember/component';

export default class BsPills extends Component {
  layout = template;

  @defaultArgs
  args = {
    onItemSelected: function () {},
    selected: null,
    content: null
  };
}
