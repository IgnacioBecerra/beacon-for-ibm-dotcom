/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

/* eslint-disable max-len */

const constants = require('./constants.js');
// Provides localization of titles and descriptions.
const i18n = require('../../node_modules/lighthouse/lighthouse-core/lib/i18n/i18n.js');

const UIStrings = {
  digitalDataObjectGroupTitle: 'Digital Data Object',
  digitalDataObjectGroupDescription:
    'The Digital Data Object is required on every page on IBM.com. It contains key meta data for things such as localization and analytics. [Learn more](https://pages.github.ibm.com/digital-behavior/docs/stds-ddo.html).',
  /** Title of the Legal category of audits. This is displayed at the top of a list of audits focused on legal content compliance within a page. */
  legalContentCategoryTitle: 'IBM.com legal content',
  /** Description of the Legal category. This is displayed at the top of a list of audits focused on legal content compliance within a page. */
  legalContentCategoryDescription:
    'These checks ensure that your page contains certain legal content, such as links to the IBM privacy policy and terms of use, as well as cookie preferences.',
  /** Title of the Northstar category of audits. This is displayed at the top of a list of audits checking to see if the Northstar design system is being loaded. */
  northstarGroupTitle: 'IBM.com Northstar design system',
  /** Description of the Northstar category. This is displayed at the top of a list of audits checking to see if the Northstar design system is being loaded. */
  northstarGroupDescription:
    'These checks ensure that the Northstar design system is not being used on the page. These frameworks are incompatible and will result in numerous errors on the page. Northstar is scheduled to be sunset in 2021.',
  /** Title of IBM.com page content category audits. This is displayed at the top of a list of audits focused on content compliance within a page. */
  pageContentCategoryTitle: 'IBM.com page content',
  /** Description of IBM.com page content category. This is displayed at the top of a list of audits focused on content compliance within a page. */
  pageContentCategoryDescription:
    'These checks ensure compliance with certain content on your page, such as approved embedded videos and using the correct links in the masthead.',
  /** Title of IBM.com page data category audits. This is displayed at the top of a list of audits focused on IBM-specific meta data. */
  pageDataCategoryTitle: 'IBM.com page data',
  /** Description of IBM.com page data audits. This is displayed at the top of a list of audits focused on IBM-specific meta data. */
  pageDataCategoryDescription:
    'These checks ensure that key data is being set on your page, such as the Digital Data Object, locale, meta, analytics, and cookie data.',
  carbonForIBMDotcomTitle: 'Carbon for IBM.com',
  carbonForIBMDotcomDescription:
    'Carbon for IBM.com is the open source design system for IBM.com’s digital experiences. The system consists of working code, design tools, and resources and is tailored to IBM.com website page makers.',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['legal', 'page-data', 'carbon-for-ibm-dotcom', 'carbon-design-system'],
  },
  passes: [
    {
      passName: 'defaultPass',
      gatherers: [
        `${constants.paths.gatherer}/page-data/ddo/ddo-gatherer`,
        `${constants.paths.gatherer}/legal/legal-links-gatherer`,
        `${constants.paths.gatherer}/carbon-for-ibm-dotcom/components-gatherer`,
        `${constants.paths.gatherer}/carbon-for-ibm-dotcom/v18-gatherer`,
      ],
    },
  ],
  audits: [
    `${constants.paths.audit}/page-data/ddo/ddo-country-audit`,
    `${constants.paths.audit}/page-data/ddo/ddo-language-audit`,
    `${constants.paths.audit}/page-data/ddo/ddo-version-audit`,
    `${constants.paths.audit}/page-data/ddo/ddo-version-check-audit`,
    `${constants.paths.audit}/legal/cookie-preferences-audit`,
    `${constants.paths.audit}/legal/accessibility-link-audit`,
    `${constants.paths.audit}/legal/privacy-link-audit`,
    `${constants.paths.audit}/legal/terms-of-use-link-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/v18-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/masthead-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/footer-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/leadspace-heading-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/leadspace-description-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/content-block-heading-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/callout-quote-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/card-group-number-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/card-eyebrow-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/card-heading-audit`,
    `${constants.paths.audit}/carbon-for-ibm-dotcom/card-copy-audit`,
    `${constants.paths.audit}/carbon-design-system/color-usage-audit`,
  ],
  groups: {
    'digital-data-object': {
      title: UIStrings.digitalDataObjectGroupTitle,
      description: str_(UIStrings.digitalDataObjectGroupDescription),
    },
    legal: {
      title: UIStrings.legalContentCategoryTitle,
      description: str_(UIStrings.legalContentCategoryDescription),
    },
    northstar: {
      title: UIStrings.northstarGroupTitle,
      description: str_(UIStrings.northstarGroupDescription),
    },
    'carbon-for-ibm-dotcom': {
      title: UIStrings.carbonForIBMDotcomTitle,
      description: str_(UIStrings.carbonForIBMDotcomDescription),
    },
    'carbon-design-system': {
      title: "Carbon Design System",
      description: "Test" //TODO
    }
  },
  categories: {
    'page-data': {
      title: str_(UIStrings.pageDataCategoryTitle),
      auditRefs: [
        { id: 'ddo-country-audit', weight: 1, group: 'digital-data-object' },
        { id: 'ddo-language-audit', weight: 1, group: 'digital-data-object' },
        { id: 'ddo-version-audit', weight: 1, group: 'digital-data-object' },
        {
          id: 'ddo-version-check-audit',
          weight: 3,
          group: 'digital-data-object',
        },
      ],
    },
    legal: {
      title: str_(UIStrings.legalContentCategoryTitle),
      auditRefs: [
        {
          id: 'cookie-preferences-audit',
          weight: 1,
          group: 'legal',
        },
        {
          id: 'accessibility-link-audit',
          weight: 1,
          group: 'legal',
        },
        {
          id: 'privacy-link-audit',
          weight: 1,
          group: 'legal',
        },
        {
          id: 'terms-of-use-link-audit',
          weight: 1,
          group: 'legal',
        },
      ],
    },
    'carbon-for-ibm-dotcom': {
      title: UIStrings.carbonForIBMDotcomTitle,
      auditRefs: [
        { id: 'masthead-audit', weight: 1, group: 'carbon-for-ibm-dotcom' },
        { id: 'footer-audit', weight: 1, group: 'carbon-for-ibm-dotcom' },
        {
          id: 'leadspace-heading-audit',
          weight: 1,
          group: 'carbon-for-ibm-dotcom',
        },
        {
          id: 'leadspace-description-audit',
          weight: 1,
          group: 'carbon-for-ibm-dotcom',
        },
        {
          id: 'content-block-heading-audit',
          weight: 1,
          group: 'carbon-for-ibm-dotcom',
        },
        {
          id: 'callout-quote-audit',
          weight: 1,
          group: 'carbon-for-ibm-dotcom',
        },
        {
          id: 'card-group-number-audit',
          weight: 1,
          group: 'carbon-for-ibm-dotcom',
        },
        {
          id: 'card-eyebrow-audit',
          weight: 1,
          group: 'carbon-for-ibm-dotcom',
        },
        {
          id: 'card-heading-audit',
          weight: 1,
          group: 'carbon-for-ibm-dotcom',
        },
        {
          id: 'card-copy-audit',
          weight: 1,
          group: 'carbon-for-ibm-dotcom',
        },
        {
          id: 'v18-audit',
          weight: 3,
          group: 'carbon-for-ibm-dotcom',
        },
      ],
    },
    'carbon-design-system': {
      title: "Carbon Design System",
      auditRefs: [
        {
          id: 'color-usage-audit',
          weight: 1,
          group: 'carbon-design-system'
        }
      ]
    }
  },
};
