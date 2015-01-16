/**
 * Main app script
 */
require(
    /**
     * We're going to use our custom object Map
     */
    ['map'],

    function (Map) {
        /**
         * Test lat and lng for task
         * @type {number}
         */
        var testLat = 33.22;
        var testLng = -87.61;

        // Define address data object
        var coordinates = [
            {address: 'Nashville, TN', lat: 36.17, lng: -86.78},
            {address: 'New York, NY', lat: 40.71, lng: -74.00},
            {address: 'Atlanta, GA', lat: 33.75, lng: -84.39},
            {address: 'Denver, CO', lat: 39.74, lng: -104.98},
            {address: 'Seattle, WA', lat: 47.61, lng: -122.33},
            {address: 'Los Angeles, CA', lat: 34.05, lng: -118.24},
            {address: 'Memphis, TN', lat: 35.15, lng: -90.05}
        ];

        // We're going to throw some errors if somebody wants to brake some rules
        try {
            // Create new Map instance
            var map = new Map(coordinates);

            /**
             * Return the name of the northernmost, easternmost, southernmost or westernmost city from the list,
             * as requested by the caller.
             */
            console.log(map.getNorthernmostCity());
            console.log(map.getEasternmostCity());
            console.log(map.getSouthernmostCity());
            console.log(map.getWesternmostCity());

            /**
             * Pass longitude and latitude as parameters, and return the name of the city that is closest to that
             * location.
             */
            console.log(map.getClosestCity(testLat, testLng));

            /**
             * Return a single string containing just the state abbreviations from the list of cities,
             * each separated by a space. The method should eliminate duplicate states.
             * The result string should not have leading or trailing spaces.
             */
            console.log(map.getStatesAsString());

            /**
             * Return an object where the member names in the object consist of the states from the city list.
             * Each of those state object members should contain an array of city names that belong to that state.
             * (in this test, most will only have one city). For extra credit: Pass a reference latitude and longitude
             * as parameters to this method, then calculate the variance of each city from the given latitude and
             * longitude and include it in the list of cities.  (for this test, this simple distance calculation
             * can be used:
             * Math.sqrt((citylat – reflat) * (citylat – reflat) + (citylong – reflong) * (citylong – reflong))   ).
             * Use 33.22 / -87.61 as the reference lat/long.
             */
            console.log(map.getStatesObject(testLat, testLng));

        } catch (ex) {
            console.log(ex);
        }
    }
);
