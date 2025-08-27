import { Typography } from "@mui/material"
import { FC, ReactNode, useState } from "react"

import { useCheckoutStore } from "src/store/useCheckoutStore/useSyncStore"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LanguageIcon from '@mui/icons-material/Language';

interface ILayoutSection {
    children: ReactNode
}

const LayoutSection: FC<ILayoutSection> = ({ children }) => {
    const [age, setAge] = useState("10");
    const languages = [
        { value: "10", label: "Español" },
        { value: "20", label: "Inglés" },
        { value: "30", label: "Italiano" },
    ];

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };


    return (
        <div className="bg-gray-800 w-full h-screen">
            {/* Grid principal */}
            <div className="grid grid-rows-[80px_1fr_80px] h-full text-white">

                {/* HEADER */}
                <div className="flex justify-between p-2 items-center bg-gray-900/80">
                    <div>
                        <Typography sx={{ letterSpacing: "2px" }} variant="h4">
                            MASTERSYNC
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: "14px" }} className="flex items-center gap-x-0.5">
                            <PlayCircleOutlineIcon /> Bienvenido al Palacio Real
                        </Typography>
                    </div>

                    <FormControl variant="standard" sx={{ p: 0 }} className="text-white">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Español"
                            onChange={handleChange}
                            disableUnderline
                            sx={{
                                color: "white",
                                "& fieldset": { border: "none" },
                                "& .MuiSelect-select": { mx: 2, py: 2 },
                            }}
                            renderValue={(selected) => {
                                const option = languages.find((lang: any) => lang.value === selected);
                                return (
                                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                        <LanguageIcon fontSize="small" />
                                        <Typography sx={{ letterSpacing: "0.2px" }} variant="h6">
                                            {option?.label}
                                        </Typography>
                                    </span>
                                );
                            }}
                        >
                            {languages.map((lang) => (
                                <MenuItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {/* BODY */}
                <div className="flex items-center justify-center w-full h-full overflow-hidden">
                    {/* Aquí puedes poner tu video o cualquier children */}
                    {children}
                </div>

                {/* FOOTER */}
                <div className="text-center flex items-center justify-center bg-gray-900/80">
                    <div>
                        <Typography sx={{ fontWeight: 500, fontSize: "1.3rem" }} variant="body1">
                            MUSEUMMATE
                        </Typography>
                        <Typography sx={{ fontWeight: 500, fontSize: "0.8rem" }} variant="body1">
                            Mobile Guides for All
                        </Typography>
                    </div>
                </div>
            </div>
            {/* Texto en los espacios laterales */}
            {/* Barras laterales */}
            {/* <div className="absolute top-0 left-0 bottom-0 w-[calc(50%-300px)] bg-gray-900/50"></div>
            <div className="absolute top-0 right-0 bottom-0 w-[calc(50%-300px)] bg-gray-900/50"></div> */}
        </div>
    )
}

export default LayoutSection;