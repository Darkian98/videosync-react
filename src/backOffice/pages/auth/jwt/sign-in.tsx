import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/backOffice/config/global-config';

import { JwtSignInView } from 'src/backOffice/auth/view/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JwtSignInView />
    </>
  );
}
