export const paths = {
  home: {
    getHref: () => '/',
  },

  app: {
    root: {
      getHref: () => '/',
    },
    dashboard: {
      getHref: () => '/dashboard',
    },
    users: {
      getHref: () => '/dashboard/users',
    },
    profile: {
      getHref: () => '/dashboard/profile',
    },
    newsArchive: {
      getHref: () => '/dashboard/news-archive',
    },
  },
} as const;
