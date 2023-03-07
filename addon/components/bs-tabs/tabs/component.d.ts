import Component from '@glimmer/component';
declare type Args = {
    content: any[];
    selected: any;
    contentPath: string;
    onItemSelected(): void;
};
export default class BsTabs extends Component<Args> {
}
export {};
