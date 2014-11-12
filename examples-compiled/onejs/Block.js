var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './DomUtils', './List', './EventGroup'], function(require, exports, DomUtils, List, EventGroup) {
    ;

    var Binding = (function () {
        function Binding(id, element, desc) {
            this.id = id;
            this.element = element;
            this.desc = desc;
        }
        return Binding;
    })();
    exports.Binding = Binding;

    (function (BlockType) {
        BlockType[BlockType["Element"] = 0] = "Element";
        BlockType[BlockType["Text"] = 1] = "Text";
        BlockType[BlockType["Comment"] = 2] = "Comment";
        BlockType[BlockType["Block"] = 3] = "Block";
        BlockType[BlockType["IfBlock"] = 4] = "IfBlock";
        BlockType[BlockType["RepeaterBlock"] = 5] = "RepeaterBlock";
        BlockType[BlockType["View"] = 6] = "View";
    })(exports.BlockType || (exports.BlockType = {}));
    var BlockType = exports.BlockType;

    var Block = (function () {
        function Block(view, parent) {
            this.children = [];
            this.bindings = [];
            this._lastValues = {};
            this.events = new EventGroup(this);
            this.view = view;
            this.parent = parent;
        }
        Block.prototype.render = function () {
            if (!this.elements) {
                this.elements = renderNodes(this, this.template);
            }
            this.children.forEach(function (child) {
                child.render();
            });
        };

        Block.prototype.bind = function () {
            this._bindEvents();

            this.children.forEach(function (child) {
                child.bind();
            });
        };

        Block.prototype.update = function () {
            var _this = this;
            this.bindings.forEach(function (binding) {
                for (var bindingType in binding.desc) {
                    if (bindingType != 'events') {
                        if (bindingType === 'text' || bindingType === 'html') {
                            _this._updateViewValue(binding, bindingType, binding.desc[bindingType]);
                        } else {
                            for (var bindingDest in binding.desc[bindingType]) {
                                _this._updateViewValue(binding, bindingType, binding.desc[bindingType][bindingDest], bindingDest);
                            }
                        }
                    }
                }
            });

            this.children.forEach(function (child) {
                child.update();
            });
        };

        Block.prototype.dispose = function () {
            this.children.forEach(function (child) {
                child.dispose();
            });

            this.events.dispose();
        };

        Block.prototype.getValue = function (propertyName) {
            return this.view._getValue(propertyName, true, this);
        };

        Block.prototype.insertElements = function (elements, refElement) {
            var index = this.elements.indexOf(refElement);
            if (index >= 0) {
                var spliceArgs = [index + 1, 0];
                this.elements.splice.apply(this.elements, spliceArgs.concat(elements));
            }
            if (refElement.parentNode) {
                var lastElement = refElement;
                elements.forEach(function (element) {
                    insertAfter(element, lastElement);
                    lastElement = element;
                });
            }
        };

        Block.prototype.removeElements = function (elements) {
            //TODO: can we assume we are always removing contiguous elements?
            var index = this.elements.indexOf(elements[0]);
            if (index >= 0) {
                this.elements.splice(index, elements.length);
            }

            elements.forEach(function (element) {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
        };

        Block.prototype._updateViewValue = function (binding, bindingType, sourcePropertyName, bindingDest) {
            var key = binding.id + bindingType + (bindingDest ? ('.' + bindingDest) : '');
            var lastValue = this._lastValues[key];
            var currentValue = this.getValue(sourcePropertyName);

            if (lastValue != currentValue) {
                this._lastValues[key] = currentValue;

                var el = binding.element;

                switch (bindingType) {
                    case 'text':
                        el.textContent = currentValue;
                        break;

                    case 'html':
                        el.innerHTML = currentValue;
                        break;

                    case 'css':
                        el.style[bindingDest] = currentValue;
                        break;

                    case 'className':
                        DomUtils.toggleClass(el, bindingDest, currentValue);
                        break;

                    case 'attr':
                        if (bindingDest === "value" || bindingDest === 'checked') {
                            el[bindingDest] = currentValue;
                        } else if (currentValue) {
                            el.setAttribute(bindingDest, currentValue);
                        } else {
                            el.removeAttribute(bindingDest);
                        }
                        break;
                }
            }
        };

        Block.prototype._bindExternalModel = function (propName) {
            // We need to observe an external viewmodel, so set it on the current.
            var propTarget = this.view._getPropTarget(propName);

            if (propTarget.viewModel) {
                var data = {};

                data['extern__' + propName.substr(0, propName.indexOf('.'))] = propTarget.viewModel;
                this.view.viewModel.setData(data, false);
            }
        };

        Block.prototype._bindEvents = function () {
            var _this = this;

            for (var i = 0; i < _this.bindings.length; i++) {
                var binding = _this.bindings[i];
                var targetElement = binding.element;
                var source;
                var propTarget;

                for (var bindingType in binding.desc) {
                    if (bindingType != 'events' && bindingType != 'id') {
                        var bindingSource = binding.desc[bindingType];

                        if (bindingType === 'text' || bindingType === 'html') {
                            this._bindExternalModel(bindingSource);
                        } else {
                            for (var bindingDest in bindingSource) {
                                this._bindExternalModel(bindingSource[bindingDest]);
                            }
                        }
                    }
                }

                if (binding.desc.events) {
                    for (var eventName in binding.desc.events) {
                        var targetList = binding.desc.events[eventName];

                        _this._bindEvent(targetElement, eventName, targetList);
                    }
                }

                _this._bindInputEvent(targetElement, binding);
            }
        };

        Block.prototype._bindInputEvent = function (element, binding) {
            var _this = this;
            if (binding.desc.attr && (binding.desc.attr['value'] || binding.desc.attr['checked'])) {
                this.events.on(element, 'input,change', function () {
                    var source = binding.desc.attr['value'] ? 'value' : 'checked';
                    var newValue = element[source];
                    var key = binding.id + 'attr.' + source;

                    _this._lastValues[key] = newValue;
                    _this.view.setValue(binding.desc.attr[source], newValue);

                    return false;
                });
            }
        };

        Block.prototype._bindEvent = function (element, eventName, targetList) {
            var _this = this;
            if (eventName.indexOf('$view.') == 0) {
                eventName = eventName.substr(6);
                element = this.view;
            }

            this.events.on(element, eventName, function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                var returnValue;

                for (var targetIndex = 0; targetIndex < targetList.length; targetIndex++) {
                    var target = targetList[targetIndex];

                    returnValue = _this.view._getValueFromFunction(target, args, _this);
                }

                return returnValue;
            });
        };

        Block.prototype._processBinding = function (spec, element) {
            if (spec.binding) {
                var binding = new Binding(this.bindings.length.toString(), element, spec.binding);
                this.bindings.push(binding);
            }

            return element;
        };
        return Block;
    })();
    exports.Block = Block;

    function renderNodes(block, nodes) {
        if (nodes) {
            return nodes.map(function (node) {
                if (node.type === 0 /* Element */) {
                    var children = renderNodes(block, node.children);
                    return block._processBinding(node, createElement(node.tag, node.attr, children));
                } else if (node.type === 1 /* Text */) {
                    return createText(node.value);
                } else if (node.type === 2 /* Comment */) {
                    var c = createComment(node.value);
                    if (node.owner) {
                        node.owner.placeholder = c;
                    }
                    return c;
                } else if (node.type === 6 /* View */) {
                    return block._processBinding(node, block.view[node.name].render());
                }
            });
        }
    }

    var IfBlock = (function (_super) {
        __extends(IfBlock, _super);
        function IfBlock(view, parent, source) {
            _super.call(this, view, parent);
            this.inserted = false;
            this.rendered = false;
            this.bound = false;

            this.source = source;
        }
        IfBlock.prototype.render = function () {
            if (!this.rendered && this.getValue(this.source)) {
                _super.prototype.render.call(this);
                this.insert();
                this.rendered = true;
                if (this.bound) {
                    _super.prototype.bind.call(this);
                }
            }
        };

        IfBlock.prototype.bind = function () {
            this.bound = true;
            if (this.rendered) {
                _super.prototype.bind.call(this);
            }
        };

        IfBlock.prototype.update = function () {
            var condition = this.getValue(this.source);

            if (condition && !this.inserted) {
                if (this.rendered) {
                    this.insert();
                } else {
                    this.render();
                }
            } else if (!condition && this.inserted) {
                this.remove();
            }

            if (condition) {
                _super.prototype.update.call(this);
            }
        };

        IfBlock.prototype.insert = function () {
            if (!this.inserted) {
                this.inserted = true;
                this.parent.insertElements(this.elements, this.placeholder);
            }
        };

        IfBlock.prototype.remove = function () {
            if (this.inserted) {
                this.inserted = false;
                this.parent.removeElements(this.elements);
            }
        };
        return IfBlock;
    })(Block);
    exports.IfBlock = IfBlock;

    function insertAfter(newChild, sibling) {
        var parent = sibling.parentNode;
        var next = sibling.nextSibling;
        if (next) {
            // IE does not like undefined for refChild
            parent.insertBefore(newChild, next);
        } else {
            parent.appendChild(newChild);
        }
    }

    var RepeaterBlock = (function (_super) {
        __extends(RepeaterBlock, _super);
        function RepeaterBlock(view, parent, source, iterator, blockTemplate) {
            _super.call(this, view, parent);
            this.bound = false;
            this.rendered = false;
            this._currentList = new List();
            this.source = source;
            this.iterator = iterator;
            this.blockTemplate = blockTemplate;
        }
        RepeaterBlock.prototype.render = function () {
            this.rendered = true;
            this._reload();
        };

        RepeaterBlock.prototype.bind = function () {
            this.bound = true;
            var list = this.getList();
            if (list.wasList) {
                this.events.on(list.list, 'change', this.onChange.bind(this));
            }
            _super.prototype.bind.call(this);
        };

        RepeaterBlock.prototype.update = function () {
            var previous = this._lastList;
            var list = this.getList();

            if (previous !== list.list) {
                if (list.wasList) {
                    this.events.on(list.list, 'change', this.onChange.bind(this));
                }

                if (previous && previous.isList) {
                    this.events.off(previous, 'change');
                }

                this._reload();
            }

            _super.prototype.update.call(this);
        };

        RepeaterBlock.prototype.onChange = function (args) {
            var changeType = args ? args.type : 'reset';

            switch (changeType) {
                case 'insert':
                    this._insertChild(args.item, args.index);
                    break;

                case 'remove':
                    this._removeChild(args.index);
                    break;

                default:
                    this._reload();
                    break;
            }

            this.update();
        };

        RepeaterBlock.prototype.getList = function () {
            var list = this.getValue(this.source);
            this._lastList = list;
            var wasList = true;

            if (!list) {
                list = new List();
                wasList = false;
            }

            if (!list.isList) {
                if (!Array.isArray(list)) {
                    list = [list];
                }
                list = new List(list);
                wasList = false;
            }

            return {
                list: list,
                wasList: wasList
            };
        };

        RepeaterBlock.prototype._insertChild = function (item, index) {
            var previousIndex = index - 1;
            var precedingElement;
            if (previousIndex < 0) {
                precedingElement = this.placeholder;
            } else {
                var previousBlockElements = this.children[previousIndex].elements;
                precedingElement = previousBlockElements[previousBlockElements.length - 1];
            }

            this._currentList.insertAt(index, item);
            var child = new Block(this.view, this);
            this.children.splice(index, 0, child);
            child.scope = {};
            child.scope[this.iterator] = item;
            child.template = processTemplate(child, this.blockTemplate);
            if (this.rendered) {
                child.render();
            }
            if (this.bound) {
                child.bind();
            }

            this.parent.insertElements(child.elements, precedingElement);
        };

        RepeaterBlock.prototype._removeChild = function (index) {
            var child = this.children.splice(index, 1)[0];
            this._currentList.removeAt(index);
            child.dispose();
            this.parent.removeElements(child.elements);
            child.parent = null;
            child.view = null;
        };

        RepeaterBlock.prototype._updateChild = function (index, item) {
            var child = this.children[index];
            child.scope[this.iterator] = item;
            child.update();
        };

        RepeaterBlock.prototype._reload = function () {
            var newList = this.getList().list;
            var currentList = this._currentList;

            var count = newList.getCount();

            for (var i = 0; i < count; i++) {
                var newItem = newList.getAt(i);
                var currentItem = currentList.getAt(i);

                var newKey = (newItem.key = newItem.key || i);
                var currentKey = currentItem ? (currentItem.key = currentItem.key || i) : null;

                if (newItem && !currentItem) {
                    this._insertChild(newItem, i);
                } else if (newKey !== currentKey) {
                    if (currentList.findBy('key', newKey) === -1) {
                        this._insertChild(newItem, i);
                    } else {
                        this._removeChild(i--);
                    }
                } else {
                    this._updateChild(i, newItem);
                }
            }

            while (currentList.getCount() > newList.getCount()) {
                this._removeChild(i);
            }
        };
        return RepeaterBlock;
    })(Block);
    exports.RepeaterBlock = RepeaterBlock;

    function fromSpec(view, spec) {
        var block;
        if (spec.type === 0 /* Element */ || spec.type === 1 /* Text */ || spec.type === 6 /* View */) {
            block = new Block(view, null);
            block.template = processTemplate(block, [spec]);
        } else {
            block = createBlock(view, null, spec);
            block.template = processTemplate(block, spec.children);
        }

        return block;
    }
    exports.fromSpec = fromSpec;

    function createBlock(view, parent, spec) {
        var block;
        switch (spec.type) {
            case 3 /* Block */:
                block = new Block(view, parent);
                break;
            case 4 /* IfBlock */:
                block = new IfBlock(view, parent, spec.source);
                break;
            case 5 /* RepeaterBlock */:
                block = new RepeaterBlock(view, parent, spec.source, spec.iterator, spec.children);
                break;
        }

        return block;
    }

    function processTemplate(parent, template) {
        return template.map(function (spec) {
            if (spec.type === 0 /* Element */) {
                if (spec.children) {
                    // allow two repeaters to share the same blockTemplate
                    spec = {
                        type: 0 /* Element */,
                        tag: spec.tag,
                        attr: spec.attr,
                        binding: spec.binding,
                        // children has to be unique per repeater since blocks
                        // are processed into comments
                        children: processTemplate(parent, spec.children)
                    };
                }
            } else if (spec.type === 3 /* Block */ || spec.type === 4 /* IfBlock */ || spec.type === 5 /* RepeaterBlock */) {
                var block = createBlock(parent.view, parent, spec);
                if (spec.type !== 5 /* RepeaterBlock */) {
                    block.template = processTemplate(block, spec.children);
                }
                parent.children.push(block);
                spec = {
                    type: 2 /* Comment */,
                    owner: block,
                    value: 'block'
                };
            }
            return spec;
        });
    }

    function createElement(tagName, attributes, children) {
        var el = document.createElement(tagName);

        if (attributes) {
            Object.keys(attributes).forEach(function (attribute) {
                el.setAttribute(attribute, attributes[attribute]);
            });
        }

        if (children) {
            children.forEach(function (child) {
                el.appendChild(child);
            });
        }

        return el;
    }

    function createText(value) {
        return document.createTextNode(value);
    }

    function createComment(value) {
        return document.createComment(value);
    }
});
