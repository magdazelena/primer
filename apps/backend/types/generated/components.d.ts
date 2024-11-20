import type { Struct, Schema } from '@strapi/strapi';

export interface MetaMetadata extends Struct.ComponentSchema {
  collectionName: 'components_meta_metadata';
  info: {
    name: 'Metadata';
    displayName: 'Metadata';
    icon: 'robot';
    description: '';
  };
  attributes: {
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsTestimonialsGroup extends Struct.ComponentSchema {
  collectionName: 'components_slices_testimonials_groups';
  info: {
    name: 'TestimonialsGroup';
    displayName: 'Testimonials group';
    icon: 'user-friends';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    testimonials: Schema.Attribute.Component<'elements.testimonial', true>;
  };
}

export interface SectionsRichText extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_texts';
  info: {
    name: 'RichText';
    displayName: 'Rich text';
    icon: 'text-height';
    description: '';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface SectionsLeadForm extends Struct.ComponentSchema {
  collectionName: 'components_sections_lead_forms';
  info: {
    name: 'Lead form';
    displayName: 'Lead form';
    icon: 'at';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    emailPlaceholder: Schema.Attribute.String;
    submitButton: Schema.Attribute.Component<'links.button', false>;
    location: Schema.Attribute.String;
    description: Schema.Attribute.Text;
  };
}

export interface SectionsLargeVideo extends Struct.ComponentSchema {
  collectionName: 'components_slices_large_videos';
  info: {
    name: 'LargeVideo';
    displayName: 'Large video';
    icon: 'play-circle';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.String;
    video: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
    poster: Schema.Attribute.Media<'images'>;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_slices_heroes';
  info: {
    name: 'Hero';
    displayName: 'Hero';
    icon: 'heading';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    picture: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    buttons: Schema.Attribute.Component<'links.button-link', true>;
    colorCode: Schema.Attribute.String;
    fullImage: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface SectionsHeading extends Struct.ComponentSchema {
  collectionName: 'components_sections_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.String;
  };
}

export interface SectionsCardGroup extends Struct.ComponentSchema {
  collectionName: 'components_sections_card_groups';
  info: {
    displayName: 'Card group';
  };
  attributes: {
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['large', 'medium', 'small']> &
      Schema.Attribute.DefaultTo<'medium'>;
    cards: Schema.Attribute.Component<'elements.card', true>;
  };
}

export interface SectionsBottomActions extends Struct.ComponentSchema {
  collectionName: 'components_slices_bottom_actions';
  info: {
    name: 'BottomActions';
    displayName: 'Bottom actions';
    icon: 'angle-double-right';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    buttons: Schema.Attribute.Component<'links.button-link', true>;
    description: Schema.Attribute.Text;
  };
}

export interface SharedVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_sections_video_embeds';
  info: {
    displayName: 'Video Embed';
    description: '';
  };
  attributes: {
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedText extends Struct.ComponentSchema {
  collectionName: 'components_shared_texts';
  info: {
    displayName: 'text';
    icon: 'feather';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    author: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
    description: '';
  };
  attributes: {
    file: Schema.Attribute.Media<'images'>;
  };
}

export interface LinksSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_links_social_links';
  info: {
    displayName: 'Social Link';
    description: '';
  };
  attributes: {
    url: Schema.Attribute.String & Schema.Attribute.Required;
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    social: Schema.Attribute.Enumeration<
      ['YOUTUBE', 'TWITTER', 'DISCORD', 'WEBSITE']
    >;
  };
}

export interface LinksLink extends Struct.ComponentSchema {
  collectionName: 'components_links_links';
  info: {
    name: 'Link';
    displayName: 'Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    url: Schema.Attribute.String & Schema.Attribute.Required;
    newtab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LinksButton extends Struct.ComponentSchema {
  collectionName: 'components_links_simple_buttons';
  info: {
    name: 'Button';
    displayName: 'Button';
    icon: 'fingerprint';
    description: '';
  };
  attributes: {
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface LinksButtonLink extends Struct.ComponentSchema {
  collectionName: 'components_links_buttons';
  info: {
    name: 'Button-link';
    displayName: 'Button link';
    icon: 'fingerprint';
    description: '';
  };
  attributes: {
    url: Schema.Attribute.String;
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: 'components_layout_navbars';
  info: {
    name: 'Navbar';
    displayName: 'Navbar';
    icon: 'map-signs';
    description: '';
  };
  attributes: {
    button: Schema.Attribute.Component<'links.button-link', false>;
    navbarLogo: Schema.Attribute.Component<'layout.logo', false>;
    menuItems: Schema.Attribute.Component<'links.link', true> &
      Schema.Attribute.Required;
  };
}

export interface LayoutLogo extends Struct.ComponentSchema {
  collectionName: 'components_layout_logos';
  info: {
    displayName: 'Logo';
    description: '';
  };
  attributes: {
    logoImg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    logoText: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
    description: '';
  };
  attributes: {
    footerLogo: Schema.Attribute.Component<'layout.logo', false>;
    menuLinks: Schema.Attribute.Component<'links.link', true>;
    legalLinks: Schema.Attribute.Component<'links.link', true>;
    socialLinks: Schema.Attribute.Component<'links.social-link', true>;
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
  };
}

export interface ElementsTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_slices_testimonials';
  info: {
    name: 'Testimonial';
    displayName: 'Testimonial';
    icon: 'user-check';
    description: '';
  };
  attributes: {
    picture: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    authorName: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsNotificationBanner extends Struct.ComponentSchema {
  collectionName: 'components_elements_notification_banners';
  info: {
    name: 'NotificationBanner';
    displayName: 'Notification banner';
    icon: 'exclamation';
    description: '';
  };
  attributes: {
    type: Schema.Attribute.Enumeration<['alert', 'info', 'warning']> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    show: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.Component<'links.link', false>;
  };
}

export interface ElementsLogos extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    name: 'logos';
    displayName: 'Logos';
    icon: 'apple-alt';
  };
  attributes: {
    title: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
  };
}

export interface ElementsFooterSection extends Struct.ComponentSchema {
  collectionName: 'components_links_footer_sections';
  info: {
    name: 'FooterSection';
    displayName: 'Footer section';
    icon: 'chevron-circle-down';
  };
  attributes: {
    title: Schema.Attribute.String;
    links: Schema.Attribute.Component<'links.link', true>;
  };
}

export interface ElementsCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    title: Schema.Attribute.String;
    lead: Schema.Attribute.Text;
    link: Schema.Attribute.Component<'links.link', false> &
      Schema.Attribute.Required;
    coverImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'meta.metadata': MetaMetadata;
      'sections.testimonials-group': SectionsTestimonialsGroup;
      'sections.rich-text': SectionsRichText;
      'sections.lead-form': SectionsLeadForm;
      'sections.large-video': SectionsLargeVideo;
      'sections.hero': SectionsHero;
      'sections.heading': SectionsHeading;
      'sections.card-group': SectionsCardGroup;
      'sections.bottom-actions': SectionsBottomActions;
      'shared.video-embed': SharedVideoEmbed;
      'shared.text': SharedText;
      'shared.slider': SharedSlider;
      'shared.seo': SharedSeo;
      'shared.rich-text': SharedRichText;
      'shared.quote': SharedQuote;
      'shared.media': SharedMedia;
      'links.social-link': LinksSocialLink;
      'links.link': LinksLink;
      'links.button': LinksButton;
      'links.button-link': LinksButtonLink;
      'layout.navbar': LayoutNavbar;
      'layout.logo': LayoutLogo;
      'layout.footer': LayoutFooter;
      'elements.testimonial': ElementsTestimonial;
      'elements.notification-banner': ElementsNotificationBanner;
      'elements.logos': ElementsLogos;
      'elements.footer-section': ElementsFooterSection;
      'elements.card': ElementsCard;
    }
  }
}
