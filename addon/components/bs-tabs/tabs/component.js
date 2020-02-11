import Component from '@glimmer/components';
import template from './template';
import {defaultArgs} from '../../../decorators';

export default class BsTabs extends Component {
  layout = template;

  @defaultArgs
  args = {
    content: []
  };
}
