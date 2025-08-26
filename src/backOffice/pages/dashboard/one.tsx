import { Box, Chip, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/backOffice/config/global-config';
import { DashboardContent } from 'src/backOffice/layouts/dashboard';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import BuildIcon from '@mui/icons-material/Build';
import Divider from '@mui/material/Divider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { GridCloseIcon } from '@mui/x-data-grid';

const metadata = { title: `Transacciones | Dashboard - ${CONFIG.appName}` };

interface ITransaction {
  data: any,
  status: number
}

export default function Page() {
  const mockClientEmails: ITransaction[] = [
    {
      data: {
        museum_name: "Museo del Prado",
        visit_date: "2025-08-10",
        visit_hour: "11:00",
        adultsId: 2,
        kidsId: 1,
        seniorId: 1,
        studentsId: 0,
        adultsBasic: 1,
        adultsPreferentSimple: 0,
        adultsPreferentComplete: 1,
        tickets_extra: 2,
        audioGuiaExtra: 1,
        name: "Carlos López",
        phone: "+34611222333",
        amount: "45.00",
        email: "carlos@example.com",
        email_admin: "admin@prado.com",
        PDF_MAP: "MAP001",
        cityRoutes: "RouteA",
        date: "2025-08-10",
        time: "11:00",
        ticket_name: "Entrada General",
        table: [
          { name: "Carlos López", id: "12345678A", birthday: "1985-06-15", confirm: "yes" },
          { name: "Ana Pérez", id: "87654321B", birthday: "1987-09-22", confirm: "yes" }
        ],
        stripe_confirm: true,
        linkAccess: "https://museumtickets.com/access/12345"
      },
      status: 0
    },
    {
      data: {
        museum_name: "Museo Reina Sofía",
        visit_date: "2025-08-12",
        visit_hour: "15:00",
        adultsId: 1,
        kidsId: 2,
        seniorId: 0,
        studentsId: 1,
        adultsBasic: 0,
        adultsPreferentSimple: 1,
        adultsPreferentComplete: 0,
        tickets_extra: 1,
        audioGuiaExtra: 0,
        name: "Laura Gómez",
        phone: "+34622334455",
        amount: "38.50",
        email: "laura@example.com",
        email_admin: "admin@reinasofia.com",
        PDF_MAP: "MAP002",
        cityRoutes: "RouteB",
        date: "2025-08-12",
        time: "15:00",
        ticket_name: "Entrada Familiar",
        table: [
          { name: "Laura Gómez", id: "11223344C", birthday: "1990-01-10", confirm: "yes" },
          { name: "Pedro Gómez", id: "55667788D", birthday: "2013-05-20", confirm: "yes" }
        ],
        stripe_confirm: true,
        linkAccess: "https://museumtickets.com/access/67890"
      },
      status: 1
    },
    {
      data: {
        museum_name: "Museo Thyssen",
        visit_date: "2025-08-15",
        visit_hour: "10:00",
        adultsId: 3,
        kidsId: 0,
        seniorId: 0,
        studentsId: 0,
        adultsBasic: 3,
        adultsPreferentSimple: 0,
        adultsPreferentComplete: 0,
        tickets_extra: 0,
        audioGuiaExtra: 3,
        name: "Miguel Sánchez",
        phone: "+34633445566",
        amount: "60.00",
        email: "miguel@example.com",
        email_admin: "admin@thyssen.com",
        PDF_MAP: "MAP003",
        cityRoutes: "RouteC",
        date: "2025-08-15",
        time: "10:00",
        table: [
          { name: "Miguel Sánchez", id: "99887766E", birthday: "1978-12-05", confirm: "yes" }
        ],
        stripe_confirm: "yes",
        linkAccess: "https://museumtickets.com/access/11223"
      },
      status: 2
    },
    {
      data: {
        museum_name: "Museo de Arte Moderno",
        visit_date: "2025-08-20",
        visit_hour: "17:00",
        adultsId: 2,
        kidsId: 0,
        seniorId: 2,
        studentsId: 1,
        adultsBasic: 0,
        adultsPreferentSimple: 2,
        adultsPreferentComplete: 0,
        tickets_extra: 1,
        audioGuiaExtra: 0,
        name: "Lucía Herrera",
        phone: "+34655667788",
        amount: "55.00",
        email: "lucia@example.com",
        email_admin: "admin@modernart.com",
        PDF_MAP: 101,
        cityRoutes: 202,
        date: "2025-08-20",
        time: "17:00",
        ticket_name: "Tour Guiado Senior",
        table: [
          { name: "Lucía Herrera", id: "33445566F", birthday: "1960-04-17", confirm: "yes" },
          { name: "María Herrera", id: "44556677G", birthday: "1949-08-09", confirm: "yes" }
        ],
        stripe_confirm: false,
        linkAccess: null
      },
      status: 3
    },

    // Aquí empiezan los 15 nuevos:

    {
      data: {
        museum_name: "Museo Arqueológico Nacional",
        visit_date: "2025-08-21",
        visit_hour: "14:00",
        adultsId: 2,
        kidsId: 1,
        seniorId: 0,
        studentsId: 0,
        adultsBasic: 1,
        adultsPreferentSimple: 0,
        adultsPreferentComplete: 1,
        tickets_extra: 0,
        audioGuiaExtra: 1,
        name: "Javier Morales",
        phone: "+34666778899",
        amount: "40.00",
        email: "javier@example.com",
        email_admin: "admin@arqueologico.com",
        PDF_MAP: "MAP004",
        cityRoutes: "RouteD",
        date: "2025-08-21",
        time: "14:00",
        ticket_name: "Entrada Básica",
        table: [
          { name: "Javier Morales", id: "55664433H", birthday: "1980-07-10", confirm: "yes" },
          { name: "Sara Morales", id: "66775544I", birthday: "1982-08-20", confirm: "yes" }
        ],
        stripe_confirm: true,
        linkAccess: "https://museumtickets.com/access/22334"
      },
      status: 0
    },
    {
      data: {
        museum_name: "Museo Sorolla",
        visit_date: "2025-08-22",
        visit_hour: "09:00",
        adultsId: 1,
        kidsId: 0,
        seniorId: 1,
        studentsId: 1,
        adultsBasic: 0,
        adultsPreferentSimple: 1,
        adultsPreferentComplete: 0,
        tickets_extra: 0,
        audioGuiaExtra: 0,
        name: "Marta Díaz",
        phone: "+34677889900",
        amount: "35.00",
        email: "marta@example.com",
        email_admin: "admin@sorolla.com",
        PDF_MAP: "MAP005",
        cityRoutes: "RouteE",
        date: "2025-08-22",
        time: "09:00",
        ticket_name: "Entrada Senior",
        table: [
          { name: "Marta Díaz", id: "77889900J", birthday: "1955-12-12", confirm: "yes" }
        ],
        stripe_confirm: false,
        linkAccess: null
      },
      status: 1
    },
    {
      data: {
        museum_name: "Museo Naval",
        visit_date: "2025-08-23",
        visit_hour: "13:30",
        adultsId: 4,
        kidsId: 2,
        seniorId: 0,
        studentsId: 0,
        adultsBasic: 4,
        adultsPreferentSimple: 0,
        adultsPreferentComplete: 0,
        tickets_extra: 3,
        audioGuiaExtra: 2,
        name: "Roberto Sánchez",
        phone: "+34688990011",
        amount: "90.00",
        email: "roberto@example.com",
        email_admin: "admin@naval.com",
        PDF_MAP: "MAP006",
        cityRoutes: "RouteF",
        date: "2025-08-23",
        time: "13:30",
        ticket_name: "Entrada Familiar",
        table: [
          { name: "Roberto Sánchez", id: "88990011K", birthday: "1975-03-14", confirm: "yes" },
          { name: "Luis Sánchez", id: "99001122L", birthday: "2000-07-22", confirm: "yes" },
          { name: "Ana Sánchez", id: "00112233M", birthday: "2003-11-30", confirm: "yes" }
        ],
        stripe_confirm: true,
        linkAccess: "https://museumtickets.com/access/33445"
      },
      status: 2
    },
    {
      data: {
        museum_name: "Museo Picasso",
        visit_date: "2025-08-24",
        visit_hour: "10:15",
        adultsId: 1,
        kidsId: 1,
        seniorId: 1,
        studentsId: 0,
        adultsBasic: 0,
        adultsPreferentSimple: 1,
        adultsPreferentComplete: 0,
        tickets_extra: 0,
        audioGuiaExtra: 1,
        name: "Elena Ruiz",
        phone: "+34699001122",
        amount: "42.00",
        email: "elena@example.com",
        email_admin: "admin@picasso.com",
        PDF_MAP: "MAP007",
        cityRoutes: "RouteG",
        date: "2025-08-24",
        time: "10:15",
        ticket_name: "Entrada Preferente",
        table: [
          { name: "Elena Ruiz", id: "11223344N", birthday: "1992-05-05", confirm: "yes" },
          { name: "Sergio Ruiz", id: "22334455O", birthday: "1993-06-15", confirm: "yes" }
        ],
        stripe_confirm: true,
        linkAccess: "https://museumtickets.com/access/44556"
      },
      status: 3
    },
    {
      data: {
        museum_name: "Museo Nacional de Ciencias Naturales",
        visit_date: "2025-08-25",
        visit_hour: "16:00",
        adultsId: 3,
        kidsId: 0,
        seniorId: 0,
        studentsId: 2,
        adultsBasic: 2,
        adultsPreferentSimple: 1,
        adultsPreferentComplete: 0,
        tickets_extra: 1,
        audioGuiaExtra: 1,
        name: "Carlos Fernández",
        phone: "+34700112233",
        amount: "58.00",
        email: "carlosf@example.com",
        email_admin: "admin@naturales.com",
        PDF_MAP: "MAP008",
        cityRoutes: "RouteH",
        date: "2025-08-25",
        time: "16:00",
        ticket_name: "Tour Estudiantes",
        table: [
          { name: "Carlos Fernández", id: "33445566P", birthday: "1987-02-28", confirm: "yes" },
          { name: "Laura Fernández", id: "44556677Q", birthday: "1990-07-12", confirm: "yes" }
        ],
        stripe_confirm: true,
        linkAccess: "https://museumtickets.com/access/55667"
      },
      status: 3
    },
    {
      data: {
        museum_name: "Museo Thyssen",
        visit_date: "2025-08-26",
        visit_hour: "11:45",
        adultsId: 2,
        kidsId: 1,
        seniorId: 1,
        studentsId: 0,
        adultsBasic: 1,
        adultsPreferentSimple: 1,
        adultsPreferentComplete: 0,
        tickets_extra: 0,
        audioGuiaExtra: 2,
        name: "Ana Martínez",
        phone: "+34711223344",
        amount: "50.00",
        email: "ana@example.com",
        email_admin: "admin@thyssen.com",
        PDF_MAP: "MAP009",
        cityRoutes: "RouteI",
        date: "2025-08-26",
        time: "11:45",
        ticket_name: "Entrada General",
        table: [
          { name: "Ana Martínez", id: "55667788R", birthday: "1983-10-01", confirm: "yes" },
          { name: "Jorge Martínez", id: "66778899S", birthday: "1985-03-25", confirm: "yes" }
        ],
        stripe_confirm: false,
        linkAccess: null
      },
      status: 3
    },
    {
      data: {
        museum_name: "Museo del Romanticismo",
        visit_date: "2025-08-27",
        visit_hour: "09:30",
        adultsId: 1,
        kidsId: 0,
        seniorId: 1,
        studentsId: 0,
        adultsBasic: 1,
        adultsPreferentSimple: 0,
        adultsPreferentComplete: 0,
        tickets_extra: 0,
        audioGuiaExtra: 0,
        name: "Pablo Jiménez",
        phone: "+34722334455",
        amount: "30.00",
        email: "pablo@example.com",
        email_admin: "admin@romanticismo.com",
        PDF_MAP: "MAP010",
        cityRoutes: "RouteJ",
        date: "2025-08-27",
        time: "09:30",
        ticket_name: "Entrada Básica",
        table: [
          { name: "Pablo Jiménez", id: "77889900T", birthday: "1969-11-11", confirm: "yes" }
        ],
        stripe_confirm: true,
        linkAccess: "https://museumtickets.com/access/66778"
      },
      status: 2
    },
    {
      data: {
        museum_name: "Museo Sorolla",
        visit_date: "2025-08-28",
        visit_hour: "14:15",
        adultsId: 2,
        kidsId: 1,
        seniorId: 0,
        studentsId: 2,
        adultsBasic: 1,
        adultsPreferentSimple: 1,
        adultsPreferentComplete: 0,
        tickets_extra: 1,
        audioGuiaExtra: 1,
        name: "Isabel Torres",
        phone: "+34733445566",
        amount: "65.00",
        email: "isabel@example.com",
        email_admin: "admin@sorolla.com",
        PDF_MAP: "MAP011",
        cityRoutes: "RouteK",
        date: "2025-08-28",
        time: "14:15",
        ticket_name: "Tour Guiado Familiar",
        table: [
          { name: "Isabel Torres", id: "88990011U", birthday: "1988-08-08", confirm: "yes" },
          { name: "Carlos Torres", id: "99001122V", birthday: "2015-09-09", confirm: "yes" },
          { name: "Marta Torres", id: "00112233W", birthday: "2017-10-10", confirm: "yes" }
        ],
        stripe_confirm: false,
        linkAccess: null
      },
      status: 3
    },
    {
      data: {
        museum_name: "Museo Naval",
        visit_date: "2025-08-29",
        visit_hour: "12:00",
        adultsId: 3,
        kidsId: 0,
        seniorId: 0,
        studentsId: 1,
        adultsBasic: 3,
        adultsPreferentSimple: 0,
        adultsPreferentComplete: 0,
        tickets_extra: 1,
        audioGuiaExtra: 1,
        name: "David Ruiz",
        phone: "+34744556677",
        amount: "55.00",
        email: "david@example.com",
        email_admin: "admin@naval.com",
        PDF_MAP: "MAP012",
        cityRoutes: "RouteL",
        date: "2025-08-29",
        time: "12:00",
        ticket_name: "Entrada Estudiantes",
        table: [
          { name: "David Ruiz", id: "11223344X", birthday: "1991-06-06", confirm: "yes" }
        ],
        stripe_confirm: true,
        linkAccess: "https://museumtickets.com/access/77889"
      },
      status: 1
    },
    {
      data: {
        museum_name: "Museo Picasso",
        visit_date: "2025-08-30",
        visit_hour: "10:30",
        adultsId: 2,
        kidsId: 1,
        seniorId: 1,
        studentsId: 0,
        adultsBasic: 1,
        adultsPreferentSimple: 1,
        adultsPreferentComplete: 0,
        tickets_extra: 0,
        audioGuiaExtra: 1,
        name: "Sandra Molina",
        phone: "+34755667788",
        amount: "52.00",
        email: "sandra@example.com",
        email_admin: "admin@picasso.com",
        PDF_MAP: "MAP013",
        cityRoutes: "RouteM",
        date: "2025-08-30",
        time: "10:30",
        ticket_name: "Entrada Preferente",
        table: [
          { name: "Sandra Molina", id: "22334455Y", birthday: "1986-04-04", confirm: "yes" },
          { name: "José Molina", id: "33445566Z", birthday: "1984-12-12", confirm: "yes" }
        ],
        stripe_confirm: true,
        linkAccess: "https://museumtickets.com/access/88990"
      },
      status: 0
    },
    {
      data: {
        museum_name: "Museo Nacional de Ciencias Naturales",
        visit_date: "2025-09-01",
        visit_hour: "16:30",
        adultsId: 1,
        kidsId: 0,
        seniorId: 1,
        studentsId: 0,
        adultsBasic: 1,
        adultsPreferentSimple: 0,
        adultsPreferentComplete: 0,
        tickets_extra: 0,
        audioGuiaExtra: 0,
        name: "Fernando Castillo",
        phone: "+34766778899",
        amount: "30.00",
        email: "fernando@example.com",
        email_admin: "admin@naturales.com",
        PDF_MAP: "MAP014",
        cityRoutes: "RouteN",
        date: "2025-09-01",
        time: "16:30",
        ticket_name: "Entrada Básica",
        table: [
          { name: "Fernando Castillo", id: "44556677AA", birthday: "1972-07-07", confirm: "yes" }
        ],
        stripe_confirm: true,
        linkAccess: "https://museumtickets.com/access/99001"
      },
      status: 0
    },
    {
      data: {
        museum_name: "Museo del Romanticismo",
        visit_date: "2025-09-02",
        visit_hour: "11:00",
        adultsId: 2,
        kidsId: 1,
        seniorId: 0,
        studentsId: 0,
        adultsBasic: 1,
        adultsPreferentSimple: 1,
        adultsPreferentComplete: 0,
        tickets_extra: 1,
        audioGuiaExtra: 0,
        name: "Ana López",
        phone: "+34777889900",
        amount: "45.00",
        email: "ana.lopez@example.com",
        email_admin: "admin@romanticismo.com",
        PDF_MAP: "MAP015",
        cityRoutes: "RouteO",
        date: "2025-09-02",
        time: "11:00",
        ticket_name: "Entrada Familiar",
        table: [
          { name: "Ana López", id: "55667788BB", birthday: "1988-02-02", confirm: "yes" },
          { name: "Juan López", id: "66778899CC", birthday: "2010-06-06", confirm: "yes" }
        ],
        stripe_confirm: false,
        linkAccess: null
      },
      status: 0
    }
  ];

  const statusCodes = [
    { code: 0, bg: "bg-green-700/65" },
    { code: 1, bg: "bg-orange-500/65", border: "border-orange-500/65", text: "text-orange-500/65", icon: <BuildIcon fontSize="medium" />, label: "Reintentar de forma automática" },
    { code: 2, bg: "bg-red-600/65", border: "border-red-600/65", text: "text-red-600/65", icon: <BuildIcon fontSize="medium" />, label: "Arreglar problema manual" },
    { code: 2, bg: "bg-blue-600/65", border: "border-blue-600/65", text: "text-blue-600/65", icon: <SendIcon fontSize="medium" />, label: "Pagar automáticamente" },
  ];

  const headerTable = ["nombre", "id_number", "birthday"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState(mockClientEmails);

  const debounced = useDebouncedCallback(
    (value: any) => {
      console.log(value);
    },
    800
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const [purchaseStart, setPurchaseStart] = useState<Dayjs | null>(null);
  const [purchaseEnd, setPurchaseEnd] = useState<Dayjs | null>(null);
  const [visitStart, setVisitStart] = useState<Dayjs | null>(null);
  const [visitEnd, setVisitEnd] = useState<Dayjs | null>(null);

  useEffect(() => {
    const lower = filterText.toLowerCase();

    const filtered = mockClientEmails.filter((item) => {
      const matchesText =
        item.data.name.toLowerCase().includes(lower) ||
        item.data.museum_name.toLowerCase().includes(lower) ||
        item.data.email.toLowerCase().includes(lower);

      const matchesStatus =
        statusFilter === '' || item.status === parseInt(statusFilter, 10);

      const purchaseDate = dayjs(item.data.date);
      const visitDate = dayjs(item.data.visit_date);

      const matchesPurchase =
        (!purchaseStart || purchaseDate.isAfter(purchaseStart.subtract(1, 'day'))) &&
        (!purchaseEnd || purchaseDate.isBefore(purchaseEnd.add(1, 'day')));

      const matchesVisit =
        (!visitStart || visitDate.isAfter(visitStart.subtract(1, 'day'))) &&
        (!visitEnd || visitDate.isBefore(visitEnd.add(1, 'day')));

      return matchesText && matchesStatus && matchesPurchase && matchesVisit;
    });

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [
    filterText,
    statusFilter,
    purchaseStart,
    purchaseEnd,
    visitStart,
    visitEnd
  ]);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl" className='space-y-2'>
        <section className="w-full px-2 sm:px-0">
          <Typography variant="h4" gutterBottom>
            Transacciones
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}

            gap={2} // espaciado entre columnas
          >
            <Box width={{ xs: '100%', sm: '50%' }}>
              <TextField
                label="Buscar por nombre, museo o email"
                value={filterText}
                onChange={(e) => {
                  setFilterText(e.target.value);
                  debounced(e.target.value);
                }}
                fullWidth
                margin="none"
              />
            </Box>

            <Box width={{ xs: '100%', sm: '50%' }}>
              <FormControl fullWidth margin="none">
                <InputLabel>Filtrar por estado</InputLabel>
                <Select
                  value={statusFilter}
                  label="Filtrar por estado"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="0">Pagado</MenuItem>
                  <MenuItem value="1">Precaución</MenuItem>
                  <MenuItem value="2">Fallido</MenuItem>
                  <MenuItem value="3">Pendiente</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={1}
              mt={0.5}
              flexWrap="wrap"
            >
              <Box width="100%" maxWidth={{ sm: '100%', md: '48%' }}>
                <Typography sx={{ color: 'text.secondary', mb: 1 }} variant="body1">
                  Fecha de Compra
                </Typography>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
                  <Box display="flex" alignItems="center" gap={0.5} flex={1}>
                    <DatePicker
                      label="Desde"
                      value={purchaseStart}
                      onChange={setPurchaseStart}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                    {purchaseStart && (
                      <IconButton onClick={() => setPurchaseStart(null)} size="small">
                        <GridCloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5} flex={1}>
                    <DatePicker
                      label="Hasta"
                      value={purchaseEnd}
                      onChange={setPurchaseEnd}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                    {purchaseEnd && (
                      <IconButton onClick={() => setPurchaseEnd(null)} size="small">
                        <GridCloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box width="100%" maxWidth={{ sm: '100%', md: '48%' }}>
                <Typography sx={{ color: 'text.secondary', mb: 1 }} variant="body1">
                  Fecha de Visita
                </Typography>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
                  <Box display="flex" alignItems="center" gap={0.5} flex={1}>
                    <DatePicker
                      label="Desde"
                      value={visitStart}
                      onChange={setVisitStart}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                    {visitStart && (
                      <IconButton onClick={() => setVisitStart(null)} size="small">
                        <GridCloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5} flex={1}>
                    <DatePicker
                      label="Hasta"
                      value={visitEnd}
                      onChange={setVisitEnd}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                    {visitEnd && (
                      <IconButton onClick={() => setVisitEnd(null)} size="small">
                        <GridCloseIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </LocalizationProvider>
        </section>
        <div className='min-h-72'>
          {currentItems.map((item, index) => {
            return (
              <div key={item.data.date + item.data.time} className='rounded-md  text-black border-gray-200 shadow-md flex my-1'>
                <div className={`${statusCodes[item.status]?.icon && "hover:min-w-6"} ${statusCodes[item.status]?.icon && "cursor-pointer"} min-w-3.5 transition-all rounded-l-sm z-10 shadow-md ${statusCodes[item.status]?.bg} items-center flex justify-center text-white group `}>
                  <div className={`hidden group-hover:block animate-jump text-center `}>
                    {statusCodes[item.status]?.icon}
                  </div>
                </div>
                <Box component={Paper} className="flex-1" sx={{ width: '100%' }}>
                  <Accordion
                    square={false}
                    disableGutters
                    sx={{
                      boxShadow: 'none',
                      border: 0,
                      borderRadius: 0,
                      '&:before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                        <Typography variant="body2">
                          <b>Ticket #{((index + 1) + ((currentPage - 1) * 5)).toString().padStart(6, '0')}</b>
                        </Typography>

                        <div>
                          <Typography className="flex flex-col text-left" variant="body2">
                            <b>Compra:</b> {item.data.date} {item.data.time}
                          </Typography>
                        </div>

                        <div>
                          <Typography className="flex flex-col text-left" variant="body2">
                            <b>Monumento:</b> {item.data.museum_name}
                          </Typography>
                        </div>

                        <div>
                          <Typography className="flex flex-col text-left" variant="body2">
                            <b>Nombre:</b> {item.data.name}
                          </Typography>
                        </div>

                        <div>
                          <Typography className="flex flex-col text-left" variant="body2">
                            <b>Correo:</b> {item.data.email}
                          </Typography>
                        </div>

                        <div>
                          <Typography className="flex flex-col text-left" variant="body2">
                            <b>Visita:</b> {item.data.visit_date} {item.data.visit_hour}
                          </Typography>
                        </div>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Divider>
                        <Chip label="Cantidad" size="small" />
                      </Divider>

                      <div className="flex flex-wrap gap-2 py-2">
                        <span><b>Adultos:</b> {item.data.adultsId}</span>
                        <span><b>Kids:</b> {item.data.kidsId}</span>
                        <span><b>EU senior +65:</b> {item.data.seniorId}</span>
                        <span><b>EU Student:</b> {item.data.studentsId}</span>
                      </div>

                      <Divider>
                        <Chip label="Datos de Visitantes" size="small" />
                      </Divider>

                      <TableContainer component={Paper}>
                        <Table size="small" aria-label="tabla de visitantes">
                          <TableHead>
                            <TableRow>
                              {headerTable.map((e) => (
                                <TableCell key={e}>{e}</TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {item.data.table.map((row: any) => (
                              <TableRow key={row.name}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.birthday}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Divider>
                        <Chip label="Datos de contacto" size="small" />
                      </Divider>

                      <div className="space-y-1 mt-2">
                        <div><b>Nombre:</b> {item.data.name}</div>
                        <div><b>Teléfono:</b> {item.data.phone}</div>
                        <div><b>Email:</b> {item.data.email}</div>
                        <div><b>Total Compra:</b> €{item.data.amount}</div>
                      </div>

                      {statusCodes[item.status]?.icon && (
                        <div className="flex justify-center mt-4">
                          <button
                            className={`${statusCodes[item.status]?.border} hover:scale-105 transition-all border-2 text-center cursor-pointer rounded-xl px-2 py-1 ${statusCodes[item.status]?.text}`}
                          >
                            {statusCodes[item.status]?.icon} {statusCodes[item.status]?.label}
                          </button>
                        </div>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Box>

              </div>
            )
          })}
        </div>
        <Box width="100%" display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, val) => setCurrentPage(val)}
            color="primary"
          />
        </Box>

      </DashboardContent >
    </>
  );
}
