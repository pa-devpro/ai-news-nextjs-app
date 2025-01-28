interface IMenuItem {
  title: string;
  href: string;
}

export const menuItems: IMenuItem[] = [
  {
    title: 'News',
    href: '/topic/news',
  },
  {
    title: 'Reviews',
    href: '/topic/reviews',
  },
  {
    title: 'Best',
    href: '/topic/best',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];
