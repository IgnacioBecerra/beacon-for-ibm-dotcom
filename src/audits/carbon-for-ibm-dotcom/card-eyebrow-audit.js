/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const Audit = require('lighthouse').Audit;
const constants = require('../../config/constants');
const i18n = require(constants.paths.i18n);

const UIStrings = {
  title:
    'The Carbon for IBM.com Card component is using the recommended character count for the eyebrow.',
  failureTitle:
    'The Carbon for IBM.com Card component is not using the recommended character count for the eyebrow.',
  description:
    'The Card component has a recommended maximum number of characters for the eyebrow. See [content guidance](https://www.ibm.com/standards/carbon/components/cards/#content-guidance-for-card) for more information.',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const maxEyebrowLength = 20;

/**
 * @file Audits the recommended amount of characters in the `card` component eyebrow.
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'card-eyebrow-audit',
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
    const loadCard = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--card';
    });

    const loadEyebrow = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--card-eyebrow';
    });

    // Card not found, audit not applicable
    if (!loadCard[0]) {
      return {
        notApplicable: true,
        score: Number(0),
      };
    }

    const hasEyebrow = loadEyebrow.length !== 0;
    const eyebrow = !hasEyebrow
      ? loadCard[0].innerText.length
      : loadEyebrow[0].innerText.length;

    // binary scoring
    const score = eyebrow <= maxEyebrowLength ? 1 : 0;

    return {
      rawValue: hasEyebrow,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
