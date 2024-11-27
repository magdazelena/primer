// fragments.js
'use strict';

module.exports = {
  contentSections: {
    picture: {
      fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
    },
    buttons: {
      populate: true,
    },
    feature: {
      fields: ['title', 'description', 'showLink', 'newTab', 'url', 'text'],
      media: {
        fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
      },
    },
    testimonials: {
      picture: {
        fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
      },
    },
    cards: {
      coverImage: {
        fields: ['url', 'alternativeText', 'caption', 'width', 'height'],
      },
      link: {
        populate: true,
      },
    },
    plans: {
      fields: ['product_features'],
    },
    submitButton: {
      populate: true,
    },
  },
  seo: {
    fields: ['metaTitle', 'metaDescription', 'shareImage'],

  },
};