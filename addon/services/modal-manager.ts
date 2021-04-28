import Service from '@ember/service';
import { next } from '@ember/runloop';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class ModalManager extends Service {
  @tracked modal = null;
  @tracked modalTarget = null;
  @tracked context =  null;
  @tracked properties = null;

  @action
  open(modal: string, target: any, properties: any) {
    next(() => {
      this.modalTarget = target;
      this.properties = properties;
      this.modal = modal;
    });
  }

  @action
  close() {
    this.modalTarget = null;
    this.properties = null;
    this.modal = null;
  }
}

export default ModalManager;
