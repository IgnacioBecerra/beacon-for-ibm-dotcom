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
    'Carbon for IBM.com Content Block heading uses the recommended character count.',
  failureTitle:
    'Carbon for IBM.com Content Block heading does not use the recommended character count.',
  description:
    'The Content Block components have a recommended max amount of characters to be used in the heading. [Learn more](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/components/content-block-simple#content-guidance).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const maxHeadingLength = 40;

/**
 * @file Audits if Content Block heading uses recommended amount of characters.
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'content-block-heading-audit',
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
      return link.dataAutoid === 'dds--content-block__heading';
    });

    const hasContentBlockHeading = loadMetrics.length !== 0;
    if (!hasContentBlockHeading) {
      return {
        notApplicable: true,
        score: Number(0),
      };
    }
    const contentBlockHeading = loadMetrics[0].innerText.length;

    // binary scoring
    const score = contentBlockHeading <= maxHeadingLength ? 1 : 0;

    return {
      rawValue: hasContentBlockHeading,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
