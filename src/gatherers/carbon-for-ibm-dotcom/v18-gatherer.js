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
 * Gets the v18 scripts and classes that are loaded on the page
 *
 * @returns {Array} array of v18 classes loaded on the page
 */
function getScriptsInDom() {
  // @ts-expect-error - getElementsInDocument put into scope via stringification
  const scriptsElements = getElementsInDocument(`script`); // eslint-disable-line no-undef
  // @ts-expect-error - getElementsInDocument put into scope via stringification
  const classElements = getElementsInDocument(`[class^='ibm-']`); // eslint-disable-line no-undef
  const components = [];
  const classes = [];

  const jsScript = '//1.www.s81c.com/common/v18/js/www.js';
  const cssScript = '//1.www.s81c.com/common/v18/css/www.css';

  for (const element of scriptsElements) {
    if (!(element instanceof HTMLElement)) continue;

    const src = element.src;

    if (src.includes(jsScript) || src.includes(cssScript)) {
      components.push({
        src: src,
      });
    }
  }

  for (const element of classElements) {
    if (!(element instanceof HTMLElement)) continue;
    classes.push({
      // @ts-expect-error - put into scope via stringification
      // eslint-disable-next-line no-undef
      snippet: getNodeDetails(element).snippet,
    });
  }

  return !components ? null : classes;
}

/**
 * Gatherer to return Northstar v18 classes loaded on the page
 */
class CheckV18 extends Gatherer {
  /**
   * @param {object} passContext passContext object
   * @returns {Promise} promise of elements from DOM
   */
  static getScriptsInDom(passContext) {
    // We'll use evaluateAsync because the `node.getAttribute` method doesn't actually normalize
    // the values like access from JavaScript does.
    return passContext.driver.executionContext.evaluate(getScriptsInDom, {
      args: [],
      useIsolation: true,
      deps: [
        pageFunctions.getNodeDetailsString,
        pageFunctions.getElementsInDocument,
      ],
    });
  }

  /**
   * @param {object} options Gatherer options
   * @returns {*} Gatherer artifact
   */
  async afterPass(options) {
    const driver = await CheckV18.getScriptsInDom(options);
    return driver;
  }
}

module.exports = CheckV18;
