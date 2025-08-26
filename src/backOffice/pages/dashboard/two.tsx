import {
  Box, Button, Modal, Typography, useMediaQuery, TextField,
  Tabs,
  Tab,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CSSTransition } from 'react-transition-group';
import MaintenanceIllustration from 'src/backOffice/assets/illustrations/maintenance-illustration';
import { MaintenanceVisualization } from 'src/backOffice/components/maintenance-visualization';
import { CardLoading } from 'src/backOffice/components/tickets/card-loading';
import "../../css/dashboard.css"
import { CONFIG } from 'src/backOffice/config/global-config';
import { LanguageSelector } from 'src/backOffice/components/tickets/language-selector';
import { useTheme } from "@mui/material/styles";
import { tickets } from 'src/backOffice/config/tickets';
import { CardTicket } from 'src/backOffice/components/tickets/card-ticket';


const metadata = { title: `Tickets | Dashboard - ${CONFIG.appName}` };

const languages: any = {
  es: 'Español',
  de: 'Deutsch',
  en: 'English',
  fr: 'France',
  it: 'Italian',
  nl: 'Netherlands',
  pt: 'Portuguese'
}


export default function Page() {
  const [languageCode, setLanguage] = useState<any>("es");
  const [data, setData] = useState<Array<any>>(tickets);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      {/* 
      <MaintenanceVisualization /> */}
      <div className='pl-2 pr-2 sm:pr-12 flex'>
        <LanguageSelector languageCode={languageCode} changer={setLanguage} />
        {!isSmallScreen && <Typography color="primary" variant='h4'>{languages[languageCode]}</Typography>}
      </div>

      <Box className="p-2  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

        {data.map(item => {
          return (
            <CardTicket languageCode={languageCode} ticket={item} setData={setData} />
          )
        })}
      </Box>
    </>
  )
}
