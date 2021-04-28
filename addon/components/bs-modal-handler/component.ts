import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import ModalManager from "../../services/modal-manager";


class BsModalHandlerComponent extends Component {
  @service('ember-bscomponents@modal-manager') modalManager: ModalManager;

  get currentModal() {
    return this.modalManager.modal;
  }
}

export default BsModalHandlerComponent;
