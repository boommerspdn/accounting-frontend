export type NavLinks = {
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
