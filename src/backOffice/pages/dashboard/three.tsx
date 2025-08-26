import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/backOffice/config/global-config';

import { BlankView } from 'src/backOffice/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BlankView title="Page three" />
    </>
  );
}
