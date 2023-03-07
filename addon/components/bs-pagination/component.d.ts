import Component from '@glimmer/component';
declare type Args = {
    totalLength: number;
    itemsPerPage: number;
    itemsPerGroup: number;
    onItemSelected(item: number): void;
};
declare class BsPagination extends Component<Args> {
    selected: number;
    currentPageGroup: number;
    private rendered;
    updateSelectedItem(): void;
    get content(): number[];
    changeCurrentGroup(item: any): any;
    onItemSelect(item: any): void;
    didInsert(): void;
}
export default BsPagination;
