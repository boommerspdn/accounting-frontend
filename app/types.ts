export type NameSlug = {
  name: string;
  slug: string;
};

export type ImageType = {
  url: string;
  alternativeText: string;
};

export interface SEOComponent {
  metaTitle?: string;
  metaDescription?: string;
}

export interface LayoutData {
  name: string;
  address: string;
  phone: string;
  email: string;
  facebook_link: string;
  line_link: string;
  copyright: string;
  logo: ImageType;
  favicon: ImageType;
  services: NameSlug[];
}

export interface HomePageData {
  banner_image: ImageType;
  banner_text: string;
  banner_description: string;
  banner_button: string;

  // Banner Section 1
  banner_section_title_1: string;
  banner_section_description_1: string;

  // Banner Section 2
  banner_section_title_2: string;
  banner_section_description_2: string;

  // Banner Section 3
  banner_section_title_3: string;
  banner_section_description_3: string;

  // Media & Promotion
  promotion_ads: ImageType[];

  // Section 1
  section_1_title: string;
  section_1_description: string;

  // Section 2
  section_2_title: string;
  section_2_body: string;
  section_2_image: ImageType;

  // Section 3
  section_3_title: string;
  section_3_body: string;
  section_3_button: string;
  section_3_button_url: string;

  services: { name: string; description: string; slug: string }[];
}
