import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');

class ListViewModel extends ViewModel {
    /// <summary>
    /// View model class for defining the observable data contract for the ListView view.
    /// 
    /// This class is optional and can be removed if unnecessary. Remove the
    /// js-model attribute from the ListView.html template's root element if you do.
    /// </summary>

    exampleMessage = "This is the exampleMessage value in ListViewModel.ts.";
    isKittenVisible = true;
    names = new List([ 'Bob', 'Sue', 'Joe', 'Jane' ]);
    amount = '0';

    amountTimesThree() {
        return String(Number(this.amount) * 3);
    }

    addMessage() {
        this.names.push(this.exampleMessage);
    }

}

export = ListViewModel;