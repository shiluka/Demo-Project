/**

found a good JavaScript implementation of java.util.Map at

http://codyburleson.com/2014/06/02/javascript-map/

**/
function Map() {

    this.dict = {};

    /**
     * Returns the number of key-value mappings in this map.
     * @method
     */
    this.size = function() {
        return Object.keys(this.dict).length;
    };

    /**
     * Returns true if this map contains no key-value mappings.
     * @method
     */
    this.isEmpty = function() {
        return Object.keys(this.dict).length == 0;
    };

    /**
     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
     * @method
     */
    this.get = function(key) {
        return this.dict[key];
    };

    /**
     * Returns true if this map contains a mapping for the specified key.
     * @method
     */
    this.containsKey = function(key) {

        if (this.get(key) !== undefined) {
            return true;
        } else {
            return false;
        }

    };

    /**
     * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
     * @method
     */
    this.put = function(key, value) {
        this.dict[key] = value;
    };

    /**
     * Removes the mapping for the specified key from this map if present.
     * @method
     */
    this.remove = function(key) {
        'use strict';
        delete this.dict[key];
    };

    /**
     * Removes all of the mappings from this map. The map will be empty after this call returns.
     * @method
     */
    this.clear = function() {
        this.dict = {};
    };
    /**
     * Executes the given callback for each entry in this map until all entries have been processed.
     * The given callback will be passed a map entry as parameter. So, for example...
     *
     * function myCallback(mapEntryItem) {
     * console.log('I will process this item: ' + mapEntryItem.text);
     * }
     *
     * myMap.forEach(myCallback);
     *
     * @method
     */
    this.forEach = function(callback) {
        var len = this.size();
        for (i = 0; i < len; i++) {
            var item = this.get(Object.keys(this.dict)[i]);
            callback(item);
        }
    }

}