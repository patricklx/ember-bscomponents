import '@ember/service';
import ModalManager from "ember-bscomponents/addon/services/modal-manager";
import TooltipBoxManager from "ember-bscomponents/addon/services/tooltip-box-manager";

declare module '@ember/service' {
  interface Registry {
    'ember-bscomponents@tooltip-box-manager': TooltipBoxManager;
    'ember-bscomponents@modal-manager': ModalManager;
  }
}
