define(
    'map',
    ['underscore', 'utils'], // Dependencies
    function (_, Utils) {
        /**
         * Object Map
         *
         * @param coordinates { address, lat, lng }
         * @constructor
         */
        var Map = function (coordinates) {
            if (!(this instanceof Map)) {
                throw new TypeError("Map constructor cannot be called as a function.");
            }
            this.coordinates = coordinates;
        }

        /**
         * @returns {coordinates}
         */
        Map.prototype.getStatesObject = function (lat, lng) {
            // Check lat lng, throw error otherwise
            if (!lat || !lng) {
                throw new Error('Bad lat or lng params');
            }
            // Map through coordinates collection, adding variance to cities and removing lat, lng params,
            // as we don't need it
            var preparedObject = _.map(this.coordinates, function (coordinate) {
                coordinate.variance = Utils.directGeoDistance(lat, coordinate.lat, lng, coordinate.lng);
                return _.omit(coordinate, 'lat', 'lng');
            });
            // Group by states
            return _.groupBy(preparedObject, function (coordinate) {
                return coordinate.address.split(/,/)[1].trim(); // Retrieve state from coordinate address
            });
        };

        /**
         * Get all states from coordinates objects array and gets states together to string, divided by space
         * @returns {string}
         */
        Map.prototype.getStatesAsString = function () {
            // That's how we take states from address strings
            var getState = function (coordinate) {
                var state = coordinate.address.split(/,/)[1]; // Retrieve state from coordinate address
                return state.trim(); // Have no idea how many spaces there were between city and state
            };
            // Now apply this state-retriever method to our coordinates array and then remove duplicates
            var states = _.uniq(_.map(this.coordinates, getState));
            // Join by single space
            return states.join(' ');
        };

        /**
         * Returns closest city to point (defined by lat, lng)
         * Calculates overall distance from the point to the address
         * @param lat
         * @param lng
         * @returns {address}
         */
        Map.prototype.getClosestCity = function (lat, lng) {
            // Prepare params
            lat = parseFloat(lat);
            lng = parseFloat(lng);
            // Check they're good to proceed, throw error otherwise
            if (!lat || !lng) {
                throw new ReferenceError('Bad lat or lng params');
            }
            // We need to sort our coordinates array by distance, and closest city will trap to beginning of array
            this.coordinates.sort(function (left, right) {
                return (Utils.geoDistance(lat, left.lat, lng, left.lng))
                    - (Utils.geoDistance(lat, right.lat, lng, right.lng));
            });
            // Return first element - closest city
            return this.coordinates[0].address;
        };

        /**
         * Most western city - City with the lowest longitude
         */
        Map.prototype.getWesternmostCity = function () {
            return this._getUtmostCity(function (left, right) {
                // sort descending by longitude
                return left.lng - right.lng;
            });
        };

        /**
         * Most eastern city - City with the highest longitude
         */
        Map.prototype.getEasternmostCity = function () {
            return this._getUtmostCity(function (left, right) {
                // sort ascending by longitude
                return right.lng - left.lng;
            });
        };

        /**
         * Most southern city - City with the lowest latitude
         */
        Map.prototype.getSouthernmostCity = function () {
            return this._getUtmostCity(function (left, right) {
                // sort descending by latitude
                return left.lat - right.lat;
            });
        };

        /**
         * Most southern city - City with the highest latitude
         */
        Map.prototype.getNorthernmostCity = function () {
            return this._getUtmostCity(function (left, right) {
                // sort ascending by latitude
                return right.lat - left.lat;
            });
        };

        /**
         * Returns utmost city, based on passed in sorting function
         * @param sortFunction - specified sorting function
         * @returns {coordinates.address}
         * @private
         */
        Map.prototype._getUtmostCity = function (sortFunction) {
            // Sort coordinates, utmost city should trap to beginning of array
            this.coordinates.sort(sortFunction);
            // Get object from beginning of the sorted array and return it's city address
            return this.coordinates[0].address;
        };

        /**
         * @export object Map
         */
        return Map;
    }
);
