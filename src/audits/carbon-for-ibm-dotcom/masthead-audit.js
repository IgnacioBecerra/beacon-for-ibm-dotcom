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
  title: 'Carbon for IBM.com Masthead component exists on the page',
  failureTitle:
    'Carbon for IBM.com Masthead component does not exist on the page.',
  description:
    'The Masthead component is a fundamental navigational component for IBM.com that displays consistently at the top of each page. [Learn more](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/components/masthead).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/**
 * @file Audits if page contains the IBM Digital Data Object (DDO)
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'masthead-audit',
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
      return link.dataAutoid === 'dds--masthead';
    });

    const hasMasthead = loadMetrics.length !== 0;

    // binary scoring
    const score = hasMasthead ? 1 : 0;

    return {
      rawValue: hasMasthead,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
