import Component from '@glimmer/component';
import ModalManager from "../../services/modal-manager";
declare class BsModalHandlerComponent extends Component {
    modalManager: ModalManager;
    get currentModal(): any;
}
export default BsModalHandlerComponent;
