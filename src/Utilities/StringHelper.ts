class StringHelper {
    // Concatenate an arbitrary number of strings
    static concatStrings() {
      var args = Array.prototype.slice.call(arguments, 0);
      return args.join('');
    }
}

export = StringHelper;