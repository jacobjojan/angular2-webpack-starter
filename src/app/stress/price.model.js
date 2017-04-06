export var PriceUpdate = (function () {
    function PriceUpdate(tileId, price) {
        this.tileId = tileId;
        this.price = price;
    }
    return PriceUpdate;
}());
export var TileModel = (function () {
    function TileModel(tileId, cross) {
        this.cross = 'EUR USD';
        this.currency1 = 'EUR';
        this.currency2 = 'USD';
        this.price = '95.11';
        this.tileId = tileId;
        this.cross = cross;
        this.currency1 = cross.split(' ')[0];
        this.currency2 = cross.split(' ')[1];
    }
    TileModel.prototype.updatePrice = function (update) {
        this.price = update.price;
        this.serverTileId = update.tileId;
    };
    return TileModel;
}());
//# sourceMappingURL=price.model.js.map