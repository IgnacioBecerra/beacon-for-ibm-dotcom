/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
 'use strict';

 const Gatherer = require('lighthouse').Gatherer;
 const pageFunctions = require('../../../node_modules/lighthouse/lighthouse-core/lib/page-functions.js');
 
 /**
	* Gatherer to return Legal links from Footer
	*/
 class CheckStyles extends Gatherer {
 
	 /**
		* @param {object} options Gatherer options
		* @returns {*} Gatherer artifact
		*/
	 async afterPass(options) {
		 const driver = options.driver;
		 return (
      driver
        .evaluateAsync('[...document.styleSheets]')
        // Ensure returned value is what we expect.
        .then((loadMetrics) => {
          if (!loadMetrics) {
            throw new Error('Unable to find load metrics in page');
          }
          return loadMetrics;
        })
    );
	 }
 }
 
 module.exports = CheckStyles;
 