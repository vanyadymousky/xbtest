/**
 * Utilities module
 */
define(
    'utils',
    function () {
        // Static object
        Utils = {

            /**
             * Computes difference between two numbers
             * E.g.:
             * -124, 56 = 180
             * 4, 6 = 2
             * 59, -12 = 71
             */
            numberDiff: function (left, right) {
                // Considering negative values
                return (left > right) ? left - right : right - left;
            },

            /**
             * Computes correct geolocation difference between latitude points (substract from 180 if we have more
             * than 90 degrees latitude difference)
             *
             * @param lat1
             * @param lat2
             * @returns {number}
             */
            geoLatitudeDistance: function (lat1, lat2) {
                var diff = Utils.numberDiff(lat1, lat2);
                return diff > 90 ? 180 - diff : diff;
            },

            /**
             * Computes correct geolocation difference between longitude points (substract from 360 if we have more
             * than 180 degrees longitude difference)
             *
             * @param lng1
             * @param lng2
             * @returns {number}
             */
            geoLongitudeDistance: function (lng1, lng2) {
                var diff = Utils.numberDiff(lng1, lng2);
                return diff > 180 ? 360 - diff : diff;
            },

            /**
             * Computes geolocation difference between two points. Difference is counted as a sum of lat and lng
             * distance diffs
             *
             * @param lat1
             * @param lat2
             * @param lng1
             * @param lng2
             * @returns {number}
             */
            geoDistance: function (lat1, lat2, lng1, lng2) {
                return Utils.geoLatitudeDistance(lat1, lat2) + Utils.geoLongitudeDistance(lng1, lng2)
            },

            /**
             * Calculate direct distance from the point to the city
             * (This is simple formula, can't be used for all cases)
             *
             * @param lat1
             * @param lat2
             * @param lng1
             * @param lng2
             * @returns {number}
             */
            directGeoDistance: function (lat1, lat2, lng1, lng2) {
                return Math.sqrt((lat1 - lat2) * (lat1 - lat2) + (lng1 - lng2) * (lng1 - lng2));
            }
        };

        /**
         * @export object Utils
         */
        return Utils;
    }
);
