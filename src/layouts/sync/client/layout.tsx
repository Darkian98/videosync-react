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
    children: (props: { language: string | undefined }) => React.ReactNode;
}

const LayoutSection: FC<ILayoutSection> = ({ children }) => {
    const [age, setAge] = useState("10");
    const languages = [
        { value: "10", label: "Español", code: "es-ES" },
        { value: "20", label: "Inglés", code: "it-IT" },
        { value: "30", label: "Italiano", code: "en-UK" },
    ];

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };


    return (
        <div className="w-full flex items-center justify-center bg-gray-800">
            <div className="sm:max-w-[600px] w-full h-screen bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOzR9EtNkxIk_1FsBfaZ0wbY4DxvvuDO-BTFGmXkkuMZlWfC-RRhx7x1-nUKyQT2tR7bo6Ox6c4aXMD_ngiJv0eTpe4OyxFkohD0wvRqMRQ3SvF-1YHJP1GhMuyBQTuQaNFjB5t1fmG189itvZtxVZR4pxPyOzvDyE18m6a1EIsj5Oh1efMSHS24vX6wKKoHp8e-POmCcbjBfO0esErxrEkk6kpDGAGMrsTgZGRgQkJW8Ypq1sT-b0b_QgWIq4mTUHqH0wzX0ppQ')] 
     bg-cover 
     bg-center 
     
">
                <div className="grid grid-rows-[80px_1fr_80px] h-dvh  text-white ">
                    <div className="flex justify-between p-2 items-center bg-gray-900/80">
                        <div>
                            <Typography sx={{ letterSpacing: "2px" }} variant='h4'>
                                MASTERSYNC
                            </Typography>
                            <div>
                                <Typography variant='caption' sx={{ fontSize: "14x" }} className="flex items-center gap-x-0.5">
                                    <PlayCircleOutlineIcon /> Bienvenido al Palacio Real
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <FormControl variant="standard" sx={{ p: 0 }} className=" text-white">
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Español"
                                    onChange={handleChange}
                                    disableUnderline
                                    sx={{
                                        color: "white",
                                        "& fieldset": { border: "none" }, // quita el borde del OutlinedInput
                                        "& .MuiSelect-select": { mx: 2, py: 2 },  // quita padding interno
                                    }}
                                    renderValue={(selected) => {
                                        const option = languages.find((lang: any) => lang.value === (selected));
                                        return (
                                            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                                <LanguageIcon fontSize="small" />
                                                <Typography sx={{ letterSpacing: "0.2px" }} variant='h6'> {option?.label}</Typography>

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
                    </div>

                    <div className="">
                        {children({ language: languages.find(e => e.value === age)?.code.toString() })}
                    </div>
                    <div className="text-center flex items-center justify-center bg-gray-900/80">
                        <div>
                            <Typography sx={{ fontWeight: "500", fontSize: "1.3rem" }} variant="body1">MUSEUMMATE</Typography>
                            <Typography sx={{ fontWeight: "500", fontSize: "0.8rem" }} variant="body1">Mobile Guides for All</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutSection;