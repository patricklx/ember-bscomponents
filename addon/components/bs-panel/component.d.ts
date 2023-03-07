import Component from '@glimmer/component';
declare type Args = {
    type: "primary" | "success" | "info" | "warning" | "danger";
    collapsible: boolean;
    open: boolean;
    withTitle: boolean;
    onCollapse(): void;
    onOpen(): void;
    onToggleCollapse(isClosed: boolean): void;
};
export default class BsPanelComponent extends Component<Args> {
    toggleCollapsed(): void;
}
export {};
