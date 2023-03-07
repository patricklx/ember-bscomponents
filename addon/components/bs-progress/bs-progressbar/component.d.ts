import Component from '@glimmer/component';
declare type Args = {
    progress: number;
    type: 'info' | 'warn' | 'error' | 'success';
};
export default class BsProgressbarComponent extends Component<Args> {
    role: string;
    get style(): import("@ember/template/-private/handlebars").SafeString;
    get ariaValueNow(): number;
}
export {};
