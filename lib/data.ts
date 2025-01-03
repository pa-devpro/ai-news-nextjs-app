interface IMenuItem {
  title: string;
  href: string;
}

export const menuItems: IMenuItem[] = [
  {
    title: "News",
    href: "/topic/news",
  },
  {
    title: "Reviews",
    href: "/topic/reviews",
  },
  {
    title: "Best",
    href: "/topic/best",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const siteInfo = {
  title: "News AI",
  description: "Understand and question the news by talking with the article directly",
};
