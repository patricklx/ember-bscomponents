import Component from '@glimmer/component';
import template from './template';
import {defaultArgs} from '../../decorators';

export default class BsPill extends Component {
  layout = template;

  @defaultArgs
  args = {
    content: null
  }
}
