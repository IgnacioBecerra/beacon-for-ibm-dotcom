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
  title: 'Northstar v18 not loaded in this page.',
  failureTitle: 'Northstar v18 found in this page.',
  description:
    'Northstar v18 is currently planned to be sunset by the end of 2021, please start preparing to migrate to using Carbon for IBM.com. [Learn more](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/about/).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/**
 * @file Audits if page contains Northstar v18 classes
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'v18-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CheckV18'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    if (!artifacts.CheckV18) {
      return {
        rawValue: true,
        score: Number(1),
      };
    }

    const totalClasses = artifacts.CheckV18.length;

    const score = !totalClasses ? 1 : 0;
    const displayString = totalClasses
      ? `${totalClasses} v18 classes found`
      : '';

    return {
      notApplicable: !artifacts.CheckV18,
      rawValue: artifacts.CheckV18,
      score: Number(score),
      displayValue: displayString,
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;
