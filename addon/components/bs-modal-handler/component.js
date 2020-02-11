import Component from '@ember/component';
import { inject as service } from '@ember/service';
import template from './template';


class BsModalHandlerComponent extends Component {
  layout = template;
  tagName = '';

  @service('ember-bscomponents@modal-manager') modalManager;

  get currentModal() {
    return this.modalManager.modal;
  }
}

export default BsModalHandlerComponent;
