# OneJS ListView

A reusable control for displaying a list of items. Written using the OneJS control framework.

The ListView is comprised of these concepts:

* Layout - The definition of where things go
* List - The collection of items representing the things to render
* ListProvider - The provider of the list to render, allows for abstraction on changing the list out for sorting and filtering.
* ListView - The ui control which monitors visual window, renders cells, creates promise chains to render ahead, and removes elements outside of the visual window.

# Including on a page

The ListView is distrubted as a set of AMD modules, a set of CommonJS modules, and a pre-bundled script that can simply be included on the page.

TODO: publish bundle for easy consumption.

# Usage

To render a simple list:

```javascript
var listView = new ListView();
var list = [
    { key: '0', name: 'Joe', age: 22 }, 
    { key: '1', name: 'Jane', age: 28 }];

listView.setData({ list: list });
document.body.appendChild(listView.render());
listView.activate();
```

## Layouts

The list view by default renders DetailsLayout, but comes pre-bundled with two layouts, DetailsLayout and GridLayout. Switching between them is as providing a new layout! Example:

```javascript
var detailsLayout = new DetailsLayout();
var gridLayout = new GridLayout();
var useDetails = true;

// On clicking a myButton element, we swap out a layout.
$('#myButton').click(function() {
    useDetails = !useDetails;
    listView.setData({ layout: useDetails ? detailsLayout : gridLayout });
});
```

## Customizing item cells

In order to customize item cells, you can extend a given layout and provide your own overrides.

The following overrides are available:

#### getHeaderLayout(firstItem): ICellDefinition
Defines an optional cell layout for the header, which always renders at the top of the list for this layout.

#### getPreItemLayout(item, previousItem, index): ICellDefinition
Defines an optional cell layout for an entry before the current item. Allows line breaks and grouping headers to be inserted as appropriate.

#### getItemLayout(item, previousItem, index): ICellDefinition
Defines a given item's cell layout.

Each method returns an optional ICellDefinition implementation, which defines a cell's details:

```typescript
interface ICellDefinition {
	key: string;
	
	viewType: any;
	viewData: any;

	width: number;
	height: number;	

	lineBreak?: boolean;
}
```

Example of a custom layout which renders a "MyRowControl" IView implementation.

```
class MyLayout extends DetailsLayout {
    getItemLayout(item, previousItem, index): ICellDefinition {
        return {
            key: item.key,
            viewType: MyRowControl,
            viewData: { item: item },
            width: 99999,
            height: (this.viewport.width < 500) ? 60 : 30
        };
    }
}
```

## Selection

A Selection object can be assigned to the list. Item tiles can then access the selection by refering to findValue.

```
TODO: Example.
```

## Sorting and filtering

## Scrolling to an item

# Development


To develop locally, run the following commands:

    $ npm install
    $ pushd ./node_modules/onejs
    $ npm install
    $ gulp
    $ popd
    $ gulp

Then run the tests...

In console 1

    $ ./node_modules/.bin/karma start

In console 2

    $ ./node_modules/.bin/karma run

# Examples

The `examples` directory contains a number of examples. To build them, run

	$ gulp examples

Then open the `examples-compiled` directory and open `index.html`.
