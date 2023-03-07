import Component from '@glimmer/component';
declare type Args = {
    type: 'primary' | 'default' | 'warning' | 'danger' | 'info' | 'success' | 'link';
    size: 'sm' | 'lg' | 'md' | 'xs';
    onClick(): Promise<any> | null;
};
export default class BsButtonComponent extends Component<Args> {
    isLoading: boolean;
    onClick(): void;
}
export {};
