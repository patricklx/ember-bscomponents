import EmberObject from '@ember/object';
import Component from '@glimmer/component';
export declare type Args = {
    targetId?: string;
    title?: string;
    content?: string;
    triggerOn?: 'click';
    sticky?: boolean;
    placement?: 'top' | 'bottom' | 'right' | 'left';
    targetSibling?: 'up' | 'down';
    targetElement?: Element;
    show?: boolean;
};
declare class BsPopoverComponent<T extends Args> extends Component<T> {
    tooltipBoxManager: any;
    wormholeId: any;
    parentElement: Element;
    type: string;
    _options: EmberObject & Partial<import("@ember/object/-private/types").UnwrapComputedPropertySetters<EmberObject>> & {
        [key: string]: any;
    };
    private currentTarget;
    private popoverId;
    siblingUpElement: Element;
    siblingDownElement: Element;
    constructor(...args: [any, any]);
    setParent(elem: Element): void;
    getTargetElement(): Element;
    updateOptions(): void;
    addTooltip(): void;
    doDestroy(): void;
}
export default BsPopoverComponent;
