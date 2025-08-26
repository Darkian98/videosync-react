import { Box, Button, Modal, Tab, Tabs, TextField, Typography, useMediaQuery } from "@mui/material"
import { FC, useState } from "react";
import { useTheme } from "@mui/material/styles";


interface IModalTitleTicket {
    open: boolean;
    handleClose: () => any;
    languages: Array<string>;
    setTextsTitles: (e: any) => any;
    textsTitles: any;
    errors: any;
    setErrors: any;
    handleSave: () => any
}

export const ModalTitleTicket: FC<IModalTitleTicket> = ({ handleClose, setTextsTitles, textsTitles, open, languages, errors, setErrors, handleSave }) => {
    const [currentLang, setCurrentLang] = useState(0);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isSmallScreen ? "100%" : 300,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 2,
    };

    const handleTabChange = (event: any, newValue: any) => {
        setCurrentLang(newValue);
    };

    const handleChangeText = (lang: any, value: any) => {
        setTextsTitles((prev: any) => ({ ...prev, [lang]: value }));
        setErrors((prev: any) => ({ ...prev, [lang]: false }));
    };


    return (
        <Modal open={open} onClose={handleClose}>
            <Box className='sm:min-w-80 min-w-full' sx={style}>
                <Typography variant="h6" mb={2}>
                    Editar Texto en Múltiples Idiomas
                </Typography>

                <Tabs
                    value={currentLang}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ mb: 2 }}
                >
                    {languages.map((lang: any) => (
                        <Tab key={lang} label={lang.toUpperCase()} />
                    ))}
                </Tabs>

                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    value={textsTitles[languages[currentLang]]}
                    onChange={(e) =>
                        handleChangeText(languages[currentLang], e.target.value)
                    }
                    label={`Texto en ${languages[currentLang].toUpperCase()}`}
                    error={!!errors[languages[currentLang]]} // marca error si vacío
                    helperText={
                        errors[languages[currentLang]] ? "Este idioma es obligatorio" : ""
                    }
                />

                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button onClick={handleSave} variant="contained">
                        Guardar y Cerrar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}