class ItemHelper {
    static formatSize(sizeString) {
        if (sizeString < 1024) {
            return sizeString + ' bytes';
        } else if (sizeString < 1024000) {
            return Math.round(sizeString / 1000) + ' KB';
        } else {
            return Math.round(sizeString / 1000000) + ' MB';
        }
    }
}

export = ItemHelper;