import BaseView = require('./BaseView');
import IView = require('./IView');
import IScopeObj = require('./IScopeObj');
import Block = require('./Block');
declare class View extends BaseView {
    public owner: any;
    public _lastValues: {};
    public _hasChanged: boolean;
    public _isEvaluatingView: boolean;
    public _spec: Block.IBlockSpec;
    public _root: Block.Block;
    public onRender(): HTMLElement;
    public onPostRender(): void;
    public onActivate(): void;
    public onViewModelInitialized(viewModel: any, oldViewModel: any): void;
    public onUpdate(): void;
    public onDispose(): void;
    public getValue(propertyName: string, expandObservables?: boolean): any;
    public _getValue(propertyName: string, expandObservables?: boolean, scopeSource?: IScopeObj): any;
    public findValue(args: any): void;
    public setValue(propertyName: string, propertyValue: any): void;
    public toggle(propertyName: string, allowPropogation?: boolean): boolean;
    public send(sourcePropertyName: any, destinationPropertyName: any): void;
    public _getPropTarget(propertyName: string, scopeSource?: IScopeObj): {
        target: any;
        viewModel: any;
        propertyName: string;
        args: any;
    };
    public _getRoot(): IView;
    public _getValueFromFunction(target: any, existingArgs?: any, scopeSource?: IScopeObj): string;
}
export = View;
