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
  title: 'Carbon for IBM.com Card Group uses the recommended number of cards.',
  failureTitle:
    'Carbon for IBM.com Card Group does not use the recommended number of cards.',
  description:
    'The Card Group component has a recommended min/max number of cards to be included in the component. [Learn more](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/components/card-group).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const minCardTotal = 2;
const maxCardTotal = 6;

/**
 * @file Audits if page's Card Group has recommended item limit
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'card-group-number-audit',
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
    const loadItems = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--card-group-item';
    });

    if (!loadItems[0]) {
      return {
        notApplicable: true,
        score: Number(0),
      };
    }

    const totalItems = loadItems.length;

    // binary scoring
    const score =
      minCardTotal <= totalItems && totalItems <= maxCardTotal ? 1 : 0;

    return {
      rawValue: totalItems,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
