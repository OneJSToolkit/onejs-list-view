import View = require('./View');
import IItem = require('./IItem');
import List = require('./List');
import EventGroup = require('./EventGroup');
export interface IBindingEventMap {
    [key: string]: string[];
}
export interface IBinding {
    className?: IMap;
    css?: IMap;
    text?: string;
    html?: string;
    attr?: IMap;
    events?: IBindingEventMap;
}
export declare class Binding {
    public id: string;
    public element: HTMLElement;
    public desc: IBinding;
    constructor(id: string, element: HTMLElement, desc: IBinding);
}
export declare enum BlockType {
    Element = 0,
    Text = 1,
    Comment = 2,
    Block = 3,
    IfBlock = 4,
    RepeaterBlock = 5,
    View = 6,
}
export interface IMap {
    [key: string]: string;
}
export interface IBlockSpec {
    type: BlockType;
    children?: IBlockSpec[];
    tag?: string;
    attr?: IMap;
    binding?: IBinding;
    value?: string;
    owner?: Block;
    source?: string;
    iterator?: string;
    name?: string;
}
export declare class Block {
    public parent: Block;
    public elements: HTMLElement[];
    public template: IBlockSpec[];
    public children: Block[];
    public view: View;
    public placeholder: Comment;
    public bindings: Binding[];
    public _lastValues: any;
    public scope: IMap;
    public events: EventGroup;
    constructor(view: View, parent: Block);
    public render(): void;
    public bind(): void;
    public update(): void;
    public dispose(): void;
    public getValue(propertyName: string): any;
    public insertElements(elements: HTMLElement[], refElement: HTMLElement): void;
    public removeElements(elements: HTMLElement[]): void;
    public _updateViewValue(binding: any, bindingType: any, sourcePropertyName: any, bindingDest?: any): void;
    public _bindExternalModel(propName: any): void;
    public _bindEvents(): void;
    public _bindInputEvent(element: HTMLElement, binding: Binding): void;
    public _bindEvent(element: any, eventName: any, targetList: any): void;
    public _processBinding(spec: IBlockSpec, element: HTMLElement): HTMLElement;
}
export declare class IfBlock extends Block {
    public source: string;
    public inserted: boolean;
    public rendered: boolean;
    public bound: boolean;
    constructor(view: View, parent: Block, source: string);
    public render(): void;
    public bind(): void;
    public update(): void;
    public insert(): void;
    public remove(): void;
}
export declare class RepeaterBlock extends Block {
    public source: string;
    public iterator: string;
    public blockTemplate: IBlockSpec[];
    public bound: boolean;
    public rendered: boolean;
    public _lastList: any;
    public _currentList: List<IItem>;
    constructor(view: View, parent: Block, source: string, iterator: string, blockTemplate: IBlockSpec[]);
    public render(): void;
    public bind(): void;
    public update(): void;
    public onChange(args?: any): void;
    public getList(): {
        list: List<IItem>;
        wasList: boolean;
    };
    public _insertChild(item: any, index: number): void;
    public _removeChild(index: number): void;
    public _updateChild(index: number, item: any): void;
    public _reload(): void;
}
export declare function fromSpec(view: View, spec: IBlockSpec): Block;
