'use strict';

/**
 * creator service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::creator.creator');
