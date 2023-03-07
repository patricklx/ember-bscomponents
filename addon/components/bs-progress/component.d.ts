import Component from '@glimmer/component';
declare type Args = {
    progress: number;
    stripped: boolean;
    type: 'info' | 'warn' | 'error' | 'success';
    animated: boolean;
};
export default class BsProgressComponent extends Component<Args> {
}
export {};
