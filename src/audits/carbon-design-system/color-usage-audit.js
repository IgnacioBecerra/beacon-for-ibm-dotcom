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
  title: 'Carbon Design System Color tokens are not being overwritten.',
  failureTitle: 'Carbon Design System Color tokens are being overwritten.',
  description:
    'The Carbon Design System Color token values must adhere to the specified guidelines for all themes. [Learn more](https://www.carbondesignsystem.com/guidelines/color/usage/)',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const colorJson = {
  '--cds-ui-background': ['#fff', '#f4f4f4', '#262626', '#161616'],
  '--cds-interactive-01': ['#0f62fe'],
  '--cds-interactive-02': ['#393939', '#6f6f6f'],
  '--cds-interactive-03': ['#0f62fe', '#fff'],
  '--cds-interactive-04': ['#0f62fe', '#4589ff'],
  '--cds-danger-01': ['#da1e28'],
  '--cds-danger-02': ['#da1e28', '#ff8389', '#fa4d56'],
  '--cds-ui-01': ['#f4f4f4', '#fff', '#393939', '#262626'],
  '--cds-ui-02': ['#fff', '#f4f4f4', '#525252', '#393939'],
  '--cds-ui-03': ['#e0e0e0', '#525252', '#393939'],
  '--cds-ui-04': ['#8d8d8d', '#6f6f6f'],
  '--cds-ui-05': ['#161616', '#f4f4f4'],
  '--cds-button-separator': ['#e0e0e0', '#161616'],
  '--cds-decorative-01': ['#e0e0e0', '#6f6f6f', '#525252'],
  '--cds-text-01': ['#161616', '#f4f4f4'],
  '--cds-text-02': ['#525252', '#c6c6c6'],
  '--cds-text-03': ['#a8a8a8', '#6f6f6f'],
  '--cds-text-04': ['#fff'],
  '--cds-text-05': ['#6f6f6f', '#8d8d8d'],
  '--cds-text-error': ['#da1e28', '#ffb3b8', '#ff8389'],
  '--cds-link-01': ['#0f62fe', '#78a9ff'],
  '--cds-link-02': ['#0043ce', '#a6c8ff'],
  '--cds-inverse-link': ['#78a9ff', '#0f62fe'],
  '--cds-icon-01': ['#161616', '#f4f4f4'],
  '--cds-icon-02': ['#525252', '#c6c6c6'],
  '--cds-icon-03': ['#fff'],
  '--cds-field-01': ['#f4f4f4', '#fff', '#393939', '#262626'],
  '--cds-field-02': ['#fff', '#f4f4f4', '#525252', '#393939'],
  '--cds-inverse-01': ['#fff', '#161616'],
  '--cds-inverse-02': ['#393939', '#f4f4f4'],
  '--cds-support-01': ['#da1e28', '#ff8389', '#fa4d56'],
  '--cds-support-02': ['#198038', '#42be65'],
  '--cds-support-03': ['#f1c21b'],
  '--cds-support-04': ['#0043ce', '#4589ff'],
  '--cds-inverse-support-01': ['#fa4d56', '#da1e28'],
  '--cds-inverse-support-02': ['#42be65', '#24a148'],
  '--cds-inverse-support-03': ['#f1c21b'],
  '--cds-inverse-support-04': ['#4589ff', '#0043ce'],
  '--cds-overlay-01': ['rgba(22,22,22,0.5)', 'rgba(22,22,22,0.7)'],
  '--cds-focus': ['#0f62fe', '#fff'],
  '--cds-inverse-focus-ui': ['#fff', '#0f62fe'],
  '--cds-hover-primary': ['#0353e9'],
  '--cds-hover-primary-text': ['#0043ce', '#a6c8ff'],
  '--cds-hover-secondary': ['#4c4c4c', '#606060'],
  '--cds-hover-tertiary': ['#0353e9', '#f4f4f4'],
  '--cds-hover-ui': ['#e5e5e5', '#4c4c4c', '#353535'],
  '--cds-hover-light-ui': ['#e5e5e5', '#656565', '#4c4c4c'],
  '--cds-hover-selected-ui': ['#cacaca', '#656565', '#4c4c4c'],
  '--cds-hover-danger': ['#ba1b23'],
  '--cds-hover-row': ['#e5e5e5', '#4c4c4c', '#353535'],
  '--cds-inverse-hover-ui': ['#4c4c4c', '#e5e5e5'],
  '--cds-active-primary': ['#002d9c'],
  '--cds-active-secondary': ['#6f6f6f', '#393939'],
  '--cds-active-tertiary': ['#002d9c', '#c6c6c6'],
  '--cds-active-ui': ['#c6c6c6', '#6f6f6f', '#525252'],
  '--cds-active-light-ui': ['#c6c6c6', '#8d8d8d', '#6f6f6f'],
  '--cds-active-danger': ['#750e13'],
  '--cds-selected-ui': ['#e0e0e0', '#525252', '#393939'],
  '--cds-selected-light-ui': ['#e0e0e0', '#6f6f6f', '#525252'],
  '--cds-highlight': ['#d0e2ff', '#edf5ff', '#002d9c', '#001d6c'],
  '--cds-skeleton-01': ['#e5e5e5', '#353535'],
  '--cds-skeleton-02': ['#c6c6c6', '#525252'],
  '--cds-visited-link': ['#8a3ffc', '#be95ff'],
  '--cds-disabled-01': ['#f4f4f4', '#fff', '#393939', '#262626'],
  '--cds-disabled-02': ['#c6c6c6', '#6f6f6f', '#525252'],
  '--cds-disabled-03': ['#8d8d8d', '#6f6f6f'],
};

/**
 * @file Audits if page contains the Accessibility legal link
 */
class ColorUsageAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'color-usage-audit',
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
        tokenValue = tokenValue.split('}')[0];
        /* eslint-enable no-useless-escape */

        if (!tokenArray[str[0]]) tokenArray[str[0]] = [];

        if (tokenArray[str[0]].indexOf(tokenValue) === -1) {
          tokenArray[str[0]].push(tokenValue);
        }
      });
    });

    let diffValues = 0;
    let tableRows = [];
    for (let key in tokenArray) {
      // eslint-disable-next-line no-prototype-builtins
      if (colorJson.hasOwnProperty(key)) {
        let difference = tokenArray[key].filter(
          (x) => !colorJson[key].includes(x)
        );

        if (difference.length > 0) {
          tableRows.push({
            name: key,
            'wrong-value': difference.toString(),
            'should-equal': colorJson[key].toString(),
          });
        }
        diffValues += difference.length;
      }
    }

    // binary scoring
    const score = diffValues.length ? 1 : 0;

    const displayString = diffValues
      ? `${diffValues} color tokens with different values`
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

module.exports = ColorUsageAudit;
