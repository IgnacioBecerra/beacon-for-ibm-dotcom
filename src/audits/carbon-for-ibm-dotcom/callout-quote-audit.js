/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const Audit = require('lighthouse').Audit;
const i18n = require('../../../node_modules/lighthouse/lighthouse-core/lib/i18n/i18n.js');

const UIStrings = {
  title:
    'Carbon for IBM.com Callout Quote quote uses the recommended character count.',
  failureTitle:
    'Carbon for IBM.com Callout Quote quote does not use the recommended character count.',
  description:
    'The Callout Quote component has a recommended max amount of characters to be used in the quote. [Learn more](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/components/callout-quote#content-guidance).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const maxQuoteLength = 200;

/**
 * @file Audits if Callout Quote contains recommended amount of characters.
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'callout-quote-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CheckComponents'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    const loadMetrics = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--callout-quote';
    });

    const hasCalloutQuote = loadMetrics.length !== 0;

    // Callout Quote not found, audit not applicable
    if (!hasCalloutQuote) {
      return {
        notApplicable: true,
        rawValue: hasCalloutQuote,
        score: Number(0),
      };
    }
    const calloutQuoteText = loadMetrics[0].innerText
      .split('\n')
      .filter((e) => {
        return e !== '';
      });
    const quote = calloutQuoteText[0].length;

    // binary scoring
    const score = quote <= maxQuoteLength ? 1 : 0;

    return {
      rawValue: hasCalloutQuote,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
