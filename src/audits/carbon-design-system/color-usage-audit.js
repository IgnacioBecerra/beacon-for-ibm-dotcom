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
	 title: 'Link to IBM Accessibility exists.',
	 failureTitle: 'Link to IBM Accessibility does not exist.',
	 description:
		 'This is automatically included as part of the IBM Footer, but in case a custom implementation exists, this would potentially be omitted by the application team.',
 };
 
 const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);
 
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
			 requiredArtifacts: ['CheckStyles', 'CSSUsage'],
		 };
	 }
 
	 /**
		* @param {object} artifacts Audit artifacts
		* @returns {*} Audit artifacts
		*/
	 static audit(artifacts) {
		const loadMetrics = artifacts.CSSUsage;

		let tokenArray = [];

		// loadMetrics has all the stringified stylesheets from the page
		console.log(loadMetrics)

		loadMetrics.stylesheets.forEach( rules => {
			const filteredStyles = rules.content.split(';').filter(e => e.startsWith('--cds'));

			filteredStyles.forEach(style => {
				const str = style.split(':');
				tokenArray[str[0]] = !str[1].startsWith('var') ? str[1] : str[1].match(/\,(.*)\)/)[1];
			})
		})


		 // binary scoring
		 const score = loadMetrics ? 1 : 0;
 
		 return {
			 rawValue: loadMetrics,
			 score: Number(score),
		 };
	 }
 }
 
 module.exports = ColorUsageAudit;
 