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
    'Carbon for IBM.com Leadspace heading uses the recommended character count.',
  failureTitle:
    'Carbon for IBM.com Leadspace heading does not use the recommended character count.',
  description:
    'The Leadspace component has a recommended max amount of characters to be used in the heading. [Learn more](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/components/leadspace#content-guidance).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const maxHeadingLength = 65;

/**
 * @file Audits if Leadspace heading uses recommended amount of characters
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'leadspace-heading-audit',
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
    const loadLeadspace = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--leadspace';
    });

    const loadHeading = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--leadspace-heading';
    });

    // Leadspace not found, audit not applicable
    if (!loadLeadspace[0]) {
      return {
        notApplicable: true,
        score: Number(0),
      };
    }

    const hasHeading = loadHeading.length !== 0;
    const heading = !hasHeading
      ? loadLeadspace[0].innerText.split('\n')[0]
      : loadHeading[0].innerText.length;

    // binary scoring
    const score = heading && heading <= maxHeadingLength ? 1 : 0;

    return {
      rawValue: hasHeading,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
