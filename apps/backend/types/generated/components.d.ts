import type { Schema, Struct } from "@strapi/strapi";

export interface ElementsCard extends Struct.ComponentSchema {
  collectionName: "components_elements_cards";
  info: {
    displayName: "Card";
  };
  attributes: {
    coverImage: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    lead: Schema.Attribute.Text;
    link: Schema.Attribute.Component<"links.link", false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface ElementsFooterSection extends Struct.ComponentSchema {
  collectionName: "components_links_footer_sections";
  info: {
    displayName: "Footer section";
    icon: "chevron-circle-down";
    name: "FooterSection";
  };
  attributes: {
    links: Schema.Attribute.Component<"links.link", true>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsLogos extends Struct.ComponentSchema {
  collectionName: "components_elements_logos";
  info: {
    displayName: "Logos";
    icon: "apple-alt";
    name: "logos";
  };
  attributes: {
    logo: Schema.Attribute.Media<"images">;
    title: Schema.Attribute.String;
  };
}

export interface ElementsNotificationBanner extends Struct.ComponentSchema {
  collectionName: "components_elements_notification_banners";
  info: {
    description: "";
    displayName: "Notification banner";
    icon: "exclamation";
    name: "NotificationBanner";
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.Component<"links.link", false>;
    show: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<["alert", "info", "warning"]> &
      Schema.Attribute.Required;
  };
}

export interface ElementsTestimonial extends Struct.ComponentSchema {
  collectionName: "components_slices_testimonials";
  info: {
    description: "";
    displayName: "Testimonial";
    icon: "user-check";
    name: "Testimonial";
  };
  attributes: {
    authorName: Schema.Attribute.String & Schema.Attribute.Required;
    picture: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: "components_layout_footers";
  info: {
    description: "";
    displayName: "Footer";
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      "oneToMany",
      "api::category.category"
    >;
    footerLogo: Schema.Attribute.Component<"layout.logo", false>;
    legalLinks: Schema.Attribute.Component<"links.link", true>;
    menuLinks: Schema.Attribute.Component<"links.link", true>;
    socialLinks: Schema.Attribute.Component<"links.social-link", true>;
  };
}

export interface LayoutLogo extends Struct.ComponentSchema {
  collectionName: "components_layout_logos";
  info: {
    description: "";
    displayName: "Logo";
  };
  attributes: {
    logoImg: Schema.Attribute.Media<"images" | "files" | "videos" | "audios"> &
      Schema.Attribute.Required;
    logoText: Schema.Attribute.String;
  };
}

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: "components_layout_navbars";
  info: {
    description: "";
    displayName: "Navbar";
    icon: "map-signs";
    name: "Navbar";
  };
  attributes: {
    button: Schema.Attribute.Component<"links.button-link", false>;
    menuItems: Schema.Attribute.Component<"links.link", true> &
      Schema.Attribute.Required;
    navbarLogo: Schema.Attribute.Component<"layout.logo", false>;
  };
}

export interface LinksButton extends Struct.ComponentSchema {
  collectionName: "components_links_simple_buttons";
  info: {
    description: "";
    displayName: "Button";
    icon: "fingerprint";
    name: "Button";
  };
  attributes: {
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<["primary", "secondary"]>;
  };
}

export interface LinksButtonLink extends Struct.ComponentSchema {
  collectionName: "components_links_buttons";
  info: {
    description: "";
    displayName: "Button link";
    icon: "fingerprint";
    name: "Button-link";
  };
  attributes: {
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<["primary", "secondary"]>;
    url: Schema.Attribute.String;
  };
}

export interface LinksLink extends Struct.ComponentSchema {
  collectionName: "components_links_links";
  info: {
    description: "";
    displayName: "Link";
    icon: "link";
    name: "Link";
  };
  attributes: {
    newtab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LinksSocialLink extends Struct.ComponentSchema {
  collectionName: "components_links_social_links";
  info: {
    description: "";
    displayName: "Social Link";
  };
  attributes: {
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    social: Schema.Attribute.Enumeration<
      ["YOUTUBE", "TWITTER", "DISCORD", "WEBSITE"]
    >;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MetaMetadata extends Struct.ComponentSchema {
  collectionName: "components_meta_metadata";
  info: {
    description: "";
    displayName: "Metadata";
    icon: "robot";
    name: "Metadata";
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBottomActions extends Struct.ComponentSchema {
  collectionName: "components_slices_bottom_actions";
  info: {
    description: "";
    displayName: "Bottom actions";
    icon: "angle-double-right";
    name: "BottomActions";
  };
  attributes: {
    buttons: Schema.Attribute.Component<"links.button-link", true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCardGroup extends Struct.ComponentSchema {
  collectionName: "components_sections_card_groups";
  info: {
    displayName: "Card group";
  };
  attributes: {
    cards: Schema.Attribute.Component<"elements.card", true>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<["large", "medium", "small"]> &
      Schema.Attribute.DefaultTo<"medium">;
  };
}

export interface SectionsHeading extends Struct.ComponentSchema {
  collectionName: "components_sections_headings";
  info: {
    displayName: "Heading";
  };
  attributes: {
    description: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: "components_slices_heroes";
  info: {
    description: "";
    displayName: "Hero";
    icon: "heading";
    name: "Hero";
  };
  attributes: {
    buttons: Schema.Attribute.Component<"links.button-link", true>;
    colorCode: Schema.Attribute.String;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    fullImage: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    picture: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsLargeVideo extends Struct.ComponentSchema {
  collectionName: "components_slices_large_videos";
  info: {
    displayName: "Large video";
    icon: "play-circle";
    name: "LargeVideo";
  };
  attributes: {
    description: Schema.Attribute.String;
    poster: Schema.Attribute.Media<"images">;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Media<"videos"> & Schema.Attribute.Required;
  };
}

export interface SectionsLeadForm extends Struct.ComponentSchema {
  collectionName: "components_sections_lead_forms";
  info: {
    description: "";
    displayName: "Lead form";
    icon: "at";
    name: "Lead form";
  };
  attributes: {
    description: Schema.Attribute.Text;
    emailPlaceholder: Schema.Attribute.String;
    location: Schema.Attribute.String;
    submitButton: Schema.Attribute.Component<"links.button", false>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsRichText extends Struct.ComponentSchema {
  collectionName: "components_sections_rich_texts";
  info: {
    description: "";
    displayName: "Rich text";
    icon: "text-height";
    name: "RichText";
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface SectionsTestimonialsGroup extends Struct.ComponentSchema {
  collectionName: "components_slices_testimonials_groups";
  info: {
    description: "";
    displayName: "Testimonials group";
    icon: "user-friends";
    name: "TestimonialsGroup";
  };
  attributes: {
    description: Schema.Attribute.Text;
    testimonials: Schema.Attribute.Component<"elements.testimonial", true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: "components_shared_media";
  info: {
    description: "";
    displayName: "Media";
    icon: "file-video";
  };
  attributes: {
    file: Schema.Attribute.Media<"images">;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: "components_shared_quotes";
  info: {
    description: "";
    displayName: "Quote";
    icon: "indent";
  };
  attributes: {
    author: Schema.Attribute.String;
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: "components_shared_rich_texts";
  info: {
    description: "";
    displayName: "Rich text";
    icon: "align-justify";
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: "components_shared_seos";
  info: {
    description: "";
    displayName: "Seo";
    icon: "allergies";
    name: "Seo";
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<"images">;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: "components_shared_sliders";
  info: {
    description: "";
    displayName: "Slider";
    icon: "address-book";
  };
  attributes: {
    files: Schema.Attribute.Media<"images", true>;
  };
}

export interface SharedText extends Struct.ComponentSchema {
  collectionName: "components_shared_texts";
  info: {
    displayName: "text";
    icon: "feather";
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface SharedVideoEmbed extends Struct.ComponentSchema {
  collectionName: "components_sections_video_embeds";
  info: {
    description: "";
    displayName: "Video Embed";
  };
  attributes: {
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export namespace Public {
    export interface ComponentSchemas {
      "elements.card": ElementsCard;
      "elements.footer-section": ElementsFooterSection;
      "elements.logos": ElementsLogos;
      "elements.notification-banner": ElementsNotificationBanner;
      "elements.testimonial": ElementsTestimonial;
      "layout.footer": LayoutFooter;
      "layout.logo": LayoutLogo;
      "layout.navbar": LayoutNavbar;
      "links.button": LinksButton;
      "links.button-link": LinksButtonLink;
      "links.link": LinksLink;
      "links.social-link": LinksSocialLink;
      "meta.metadata": MetaMetadata;
      "sections.bottom-actions": SectionsBottomActions;
      "sections.card-group": SectionsCardGroup;
      "sections.heading": SectionsHeading;
      "sections.hero": SectionsHero;
      "sections.large-video": SectionsLargeVideo;
      "sections.lead-form": SectionsLeadForm;
      "sections.rich-text": SectionsRichText;
      "sections.testimonials-group": SectionsTestimonialsGroup;
      "shared.media": SharedMedia;
      "shared.quote": SharedQuote;
      "shared.rich-text": SharedRichText;
      "shared.seo": SharedSeo;
      "shared.slider": SharedSlider;
      "shared.text": SharedText;
      "shared.video-embed": SharedVideoEmbed;
    }
  }
}
