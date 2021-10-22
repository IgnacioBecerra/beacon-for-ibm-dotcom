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
  title: 'Carbon Design System typography tokens are not being overwritten.',
  failureTitle: 'Carbon Design System typography tokens are being overwritten.',
  description:
    'Typography token values must adhere to the guidelines specified by the Carbon Design System. [Learn more](https://www.carbondesignsystem.com/guidelines/typography/overview)',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const textStyles = {
  '--cds-body-short-01-font-size': ['1rem', '0.875rem'],
  '--cds-body-short-01-font-weight': ['400'],
  '--cds-body-short-01-line-height': ['1.375rem', '1.125rem'],
  '--cds-body-short-01-letter-spacing': ['0', '0.16px'],
  '--cds-body-long-01-font-size': ['1rem', '0.875rem'],
  '--cds-body-long-01-font-weight': ['400'],
  '--cds-body-long-01-line-height': ['1.5rem', '1.25rem'],
  '--cds-body-long-01-letter-spacing': ['0', '0.16px'],
  '--cds-label-01-font-size': ['0.875rem', '0.75rem'],
  '--cds-label-01-font-weight': ['400'],
  '--cds-label-01-line-height': ['1.125rem', '1rem'],
  '--cds-label-01-letter-spacing': ['0.16px', '0.32px'],
  '--cds-caption-01-font-size': ['0.875rem', '0.75rem'],
  '--cds-caption-01-font-weight': ['400'],
  '--cds-caption-01-line-height': ['1.125rem', '1rem'],
  '--cds-caption-01-letter-spacing': ['0.16px', '0.32px'],
  '--cds-code-01-font-family': [
    '"IBM Plex Mono","Menlo","DejaVu Sans Mono","Bitstream Vera Sans Mono",Courier,monospace',
  ],
  '--cds-code-01-font-size': ['0.875rem', '0.75rem'],
  '--cds-code-01-font-weight': ['400'],
  '--cds-code-01-line-height': ['1.25rem', '1rem'],
  '--cds-code-01-letter-spacing': ['0', '0.32px'],
  '--cds-code-02-font-family': [
    '"IBM Plex Mono","Menlo","DejaVu Sans Mono","Bitstream Vera Sans Mono",Courier,monospace',
  ],
  '--cds-code-02-font-size': ['1rem', '0.875rem'],
  '--cds-code-02-font-weight': ['400'],
  '--cds-code-02-line-height': ['1.5rem', '1.25rem'],
  '--cds-code-02-letter-spacing': ['0', '0.32px'],
  '--cds-helper-text-01-font-size': ['0.875rem', '0.75rem'],
  '--cds-helper-text-01-font-weight': ['400'],
  '--cds-helper-text-01-line-height': ['1.125rem', '1rem'],
  '--cds-helper-text-01-letter-spacing': ['0.16px', '0.32px'],
  '--cds-heading-01-font-size': ['1rem', '0.875rem'],
  '--cds-heading-01-font-weight': ['600'],
  '--cds-heading-01-line-height': ['1.375rem', '1.125rem'],
  '--cds-heading-01-letter-spacing': ['0', '0.16px'],
  '--cds-productive-heading-01-font-size': ['1rem', '0.875rem'],
  '--cds-productive-heading-01-font-weight': ['600'],
  '--cds-productive-heading-01-line-height': ['1.375rem', '1.125rem'],
  '--cds-productive-heading-01-letter-spacing': ['0', '0.16px'],
  '--cds-expressive-heading-01-font-size': ['0.875rem'],
  '--cds-expressive-heading-01-font-weight': ['600'],
  '--cds-expressive-heading-01-line-height': ['1.25rem'],
  '--cds-expressive-heading-01-letter-spacing': ['0.16px'],
  '--cds-body-short-02-font-size': ['1rem'],
  '--cds-body-short-02-font-weight': ['400'],
  '--cds-body-short-02-line-height': ['1.375'],
  '--cds-body-short-02-letter-spacing': ['0'],
  '--cds-body-long-02-font-size': ['1rem'],
  '--cds-body-long-02-font-weight': ['400'],
  '--cds-body-long-02-line-height': ['1.5'],
  '--cds-body-long-02-letter-spacing': ['0'],
  '--cds-heading-02-font-size': ['1rem'],
  '--cds-heading-02-font-weight': ['600'],
  '--cds-heading-02-line-height': ['1.375'],
  '--cds-heading-02-letter-spacing': ['0'],
  '--cds-productive-heading-02-font-size': ['1rem'],
  '--cds-productive-heading-02-font-weight': ['600'],
  '--cds-productive-heading-02-line-height': ['1.375'],
  '--cds-productive-heading-02-letter-spacing': ['0'],
  '--cds-productive-heading-03-font-size': ['1.25rem'],
  '--cds-productive-heading-03-font-weight': ['400'],
  '--cds-productive-heading-03-line-height': ['1.4'],
  '--cds-productive-heading-03-letter-spacing': ['0'],
  '--cds-productive-heading-04-font-size': ['1.75rem'],
  '--cds-productive-heading-04-font-weight': ['400'],
  '--cds-productive-heading-04-line-height': ['1.29'],
  '--cds-productive-heading-04-letter-spacing': ['0'],
  '--cds-productive-heading-05-font-size': ['2rem'],
  '--cds-productive-heading-05-font-weight': ['400'],
  '--cds-productive-heading-05-line-height': ['1.25'],
  '--cds-productive-heading-05-letter-spacing': ['0'],
  '--cds-productive-heading-06-font-size': ['2.625rem'],
  '--cds-productive-heading-06-font-weight': ['300'],
  '--cds-productive-heading-06-line-height': ['1.199'],
  '--cds-productive-heading-06-letter-spacing': ['0'],
  '--cds-productive-heading-07-font-size': ['3.375rem'],
  '--cds-productive-heading-07-font-weight': ['300'],
  '--cds-productive-heading-07-line-height': ['1.19'],
  '--cds-productive-heading-07-letter-spacing': ['0'],
  '--cds-expressive-heading-02-font-size': ['1rem'],
  '--cds-expressive-heading-02-font-weight': ['600'],
  '--cds-expressive-heading-02-line-height': ['1.5'],
  '--cds-expressive-heading-02-letter-spacing': ['0'],
  '--cds-expressive-heading-03-font-size': ['1.25rem'],
  '--cds-expressive-heading-03-font-weight': ['400'],
  '--cds-expressive-heading-03-line-height': ['1.4'],
  '--cds-expressive-heading-03-letter-spacing': ['0'],
  '--cds-expressive-heading-04-font-size': ['1.75rem'],
  '--cds-expressive-heading-04-font-weight': ['400'],
  '--cds-expressive-heading-04-line-height': ['1.29'],
  '--cds-expressive-heading-04-letter-spacing': ['0'],
  '--cds-expressive-heading-05-font-size': ['2rem'],
  '--cds-expressive-heading-05-font-weight': ['400'],
  '--cds-expressive-heading-05-line-height': ['1.25'],
  '--cds-expressive-heading-05-letter-spacing': ['0'],
  '--cds-expressive-heading-06-font-size': ['2rem'],
  '--cds-expressive-heading-06-font-weight': ['600'],
  '--cds-expressive-heading-06-line-height': ['1.25'],
  '--cds-expressive-heading-06-letter-spacing': ['0'],
  '--cds-expressive-paragraph-01-font-size': ['1.5rem'],
  '--cds-expressive-paragraph-01-font-weight': ['300'],
  '--cds-expressive-paragraph-01-line-height': ['1.334'],
  '--cds-expressive-paragraph-01-letter-spacing': ['0'],
  '--cds-quotation-01-font-size': ['1.25rem'],
  '--cds-quotation-01-font-weight': ['400'],
  '--cds-quotation-01-line-height': ['1.3'],
  '--cds-quotation-01-letter-spacing': ['0'],
  '--cds-quotation-02-font-size': ['2rem'],
  '--cds-quotation-02-font-weight': ['300'],
  '--cds-quotation-02-line-height': ['1.25'],
  '--cds-quotation-02-letter-spacing': ['0'],
  '--cds-display-01-font-size': ['2.625rem'],
  '--cds-display-01-font-weight': ['300'],
  '--cds-display-01-line-height': ['1.19'],
  '--cds-display-01-letter-spacing': ['0'],
  '--cds-display-02-font-size': ['2.625rem'],
  '--cds-display-02-font-weight': ['600'],
  '--cds-display-02-line-height': ['1.19'],
  '--cds-display-02-letter-spacing': ['0'],
  '--cds-display-03-font-size': ['2.625rem'],
  '--cds-display-03-font-weight': ['300'],
  '--cds-display-03-line-height': ['1.19'],
  '--cds-display-03-letter-spacing': ['0'],
  '--cds-display-04-font-size': ['2.625rem'],
  '--cds-display-04-font-weight': ['600'],
  '--cds-display-04-line-height': ['1.19'],
  '--cds-display-04-letter-spacing': ['0'],
};

/**
 * @file Audits if page contains the Accessibility legal link
 */
class TextUsageAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'text-usage-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CSSUsage'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    const loadMetrics = artifacts.CSSUsage;

    let tokenArray = [];
    loadMetrics.stylesheets.forEach((rules) => {
      const filteredStyles = rules.content
        .replace(/\n/g, '')
        .split(';')
        .filter((e) => e.trim().startsWith('--cds'));

      filteredStyles.forEach((style) => {
        const str = style.split(':');
        str[0] = str[0].trim();

        /* eslint-disable no-useless-escape */
        let tokenValue = !str[1].startsWith('var')
          ? str[1]
          : str[1].match(/\,(.*)\)/)[1];
        /* eslint-enable no-useless-escape */

        tokenValue = tokenValue.split('}')[0].trim();

        if (!tokenArray[str[0]]) tokenArray[str[0]] = [];

        if (tokenArray[str[0]].indexOf(tokenValue) === -1) {
          if (tokenValue[0] === '.') tokenValue = `0${tokenValue}`;
          tokenArray[str[0]].push(tokenValue);
        }
      });
    });

    let diffValues = 0;
    let tableRows = [];
    for (let key in tokenArray) {
      // eslint-disable-next-line no-prototype-builtins
      if (textStyles.hasOwnProperty(key)) {
        let difference = tokenArray[key].filter(
          (x) => !textStyles[key].includes(x)
        );

        if (difference.length > 0) {
          tableRows.push({
            name: key,
            'wrong-value': difference.toString(),
            'should-equal': textStyles[key].toString(),
          });
        }
        diffValues += difference.length;
      }
    }

    // binary scoring
    const score = diffValues.length ? 1 : 0;

    const displayString = diffValues
      ? `${diffValues} typograhy tokens with different values`
      : '';

    const headings = [
      { key: 'name', itemType: 'text', text: 'Token name' },
      { key: 'wrong-value', itemType: 'text', text: 'Wrong value' },
      { key: 'should-equal', itemType: 'text', text: 'Should equal' },
    ];
    const details = Audit.makeTableDetails(headings, tableRows);

    return {
      rawValue: loadMetrics,
      score: Number(score),
      displayValue: displayString,
      details,
    };
  }
}

module.exports = TextUsageAudit;
