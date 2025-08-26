const ROOTS = {
  AUTH: '/es/auth',
  DASHBOARD: '/es/dashboard',
  CHECKOUT: '/checkout',
  sync: '/sync'
};

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    two: `${ROOTS.DASHBOARD}/two`,
    //   three: `${ROOTS.DASHBOARD}/three`,
    //   group: {
    //     root: `${ROOTS.DASHBOARD}/group`,
    //     five: `${ROOTS.DASHBOARD}/group/five`,
    //     six: `${ROOTS.DASHBOARD}/group/six`,
    //   },
  },
  checkout: {
    root: ROOTS.CHECKOUT
  }
};
