import Component from '@glimmer/component';
declare type Args = {
    dismissAfter: number;
    dismissible: boolean;
    message: string;
    show: boolean;
    type: 'info' | 'warning' | 'danger' | 'success';
    onDismiss: () => null | Promise<any>;
    onAutoDismiss: () => null;
};
declare class BsAlertComponent extends Component<Args> {
    internalShow: any;
    get show(): any;
    set show(v: any);
    setupDismiss(): void;
    dismiss(event: any): Promise<any>;
}
export default BsAlertComponent;
