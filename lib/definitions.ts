export type NavLinks = {
  logo: {
    url: string;
    alternativeText: string;
  };
  website_name: string;
  home: string;
  service: string;
  about_us: string;
  contact_us: string;
};

export type SocialMedias = {
  name: string;
  platform: string;
  url: string;
  image: {
    url: string;
  };
}[];

export type Services = {
  name: string;
  description: string;
  slug: string;
}[];

export type MetaTag = {
  meta_title: string;
  meta_description: string;
};
