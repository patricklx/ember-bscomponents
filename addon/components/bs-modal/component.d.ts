import Component from '@glimmer/component';
import ModalManager from "../../services/modal-manager";
declare type Args = {
    backdrop: boolean;
    fade: boolean;
    action: () => null;
    onClose: (event?: Event) => null;
    allowClose: boolean;
    animation: boolean;
};
export default class BsModalComponent extends Component<Args> {
    modalManager: ModalManager;
    role: string;
    _isVis: boolean;
    _isVisible: boolean;
    modalBackdrop: string;
    private _backdrop;
    private _keyUpHandler;
    get styles(): import("@ember/template/-private/handlebars").SafeString;
    get isAriaHidden(): boolean;
    get isVis(): boolean;
    set isVis(val: boolean);
    get visible(): boolean;
    set visible(val: boolean);
    didInsert(): void;
    becameVisible(): void;
    becameHidden(): void;
    appendBackdrop(): void;
    show(): Promise<unknown>;
    hide(): Promise<unknown>;
    handleEscape(event: any): void;
    doClose(): void;
    removeHandlers(): void;
    setupBinders(): void;
}
export {};
