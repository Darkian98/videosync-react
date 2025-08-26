import { Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ITicket, TLanguageCode } from "src/backOffice/config/tickets";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditableDiv from 'src/backOffice/components/tickets/editable';
import EditIcon from '@mui/icons-material/Edit';
import { GridCheckIcon, GridClearIcon } from "@mui/x-data-grid";
import { ModalTitleTicket } from "./modals/modal-title-ticket";

interface ICardTicket {
    ticket: ITicket,
    languageCode: TLanguageCode,
    setData: any
}

export const CardTicket: FC<ICardTicket> = ({ ticket, languageCode, setData }) => {
    const languages = ["es", "de", "en", "fr", "it", "nl", "pt"];
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [errors, setErrors] = useState<any>({});
    const [textsTitles, setTextsTitles] = useState<any>({
        de: ticket["de"].name,
        en: ticket["en"].name,
        es: ticket["es"].name,
        fr: ticket["fr"].name,
        it: ticket["it"].name,
        nl: ticket["nl"].name,
        pt: ticket["pt"].name,
    });

    const handleSave = () => {
        const newErrors: any = {};
        languages.forEach((lang: any) => {
            if (!textsTitles[lang].trim()) newErrors[lang] = true;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert("Todos los idiomas deben tener texto antes de cerrar.");
        } else {
            setData((prevData: any) =>
                prevData.map((item: any) => {
                    if (item.id !== ticket.id) return item; // <-- mantener el ticket original si no es el que estamos editando
                    const updatedTicket = { ...item };
                    Object.keys(textsTitles).forEach(lang => {
                        const code = lang as TLanguageCode;
                        updatedTicket[code] = {
                            ...item[code],
                            name: textsTitles[code]
                        };
                    });
                    return updatedTicket;
                })
            );
            setErrors({});
            setOpen(false);
            setShow(true);
        }
    };

    return (
        <>
            <div className="max-w-lg w-full min-w-full">
                <div className="flex justify-between rounded-t-xl bg-[#011b34] text-white/90 px-2 py-3">
                    <div className="w-4/6">
                        <h3 className="font-bold leading-tight">
                            {ticket[languageCode].name}
                            <button onClick={handleOpen} className='cursor-pointer ml-1'>
                                <EditIcon sx={{ fontSize: 15 }} className='text-orange-300' />
                            </button>
                        </h3>
                    </div>
                    <div className="text-right min-w-0 flex-shrink-0">
                        <Typography fontSize={11} className="text-[#A2A9B3]" variant="body1">
                            Última modificación
                        </Typography>
                        <Typography fontSize="small" className="text-white/90" variant="body1">
                            17 de Octubre de 2022
                        </Typography>
                    </div>
                </div>
                <div className="border-b-2 border-l-2 border-r-2 border border-gray-200 px-4 py-2 ">
                    <div className="text-gray-800">
                        <Typography variant='h6'>Características</Typography>
                        <ul className="space-y-1 text-sm">
                            {ticket[languageCode].features.map((extra: string) => {
                                return (
                                    <li className="flex items-start hover:bg-green-100 cursor-pointer rounded-lg justify-between group">
                                        <div className='flex items-center'>
                                            <Typography variant='body2'><span className="text-green-500 mr-2 pl-1">•</span>{extra}</Typography>
                                        </div>
                                        <div className='pr-1 hidden group-hover:block animate-fade animate-duration-400'>
                                            <span className='text-green-800'>Remover</span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='flex justify-center my-1'>
                        <button name='add' type='button' className='hover:scale-125 transition-all cursor-pointer'>
                            <AddBoxIcon className='text-green-500' />
                        </button>
                    </div>
                    <hr className='text-gray-300 my-1' />
                    <div className='flex justify-end'>
                        <EditableDiv initialText={ticket.price} onTextChange={(e: any) => { console.log('grr', e); setShow(true) }}></EditableDiv>
                    </div>
                </div>

                <div
                    className={`border-b-2 border-l-2 border-r-2 border-dashed border-gray-200 overflow-hidden transition-all duration-300 transform origin-top ${show
                        ? 'max-h-10 opacity-100 scale-y-100 translate-y-0'
                        : 'max-h-0 opacity-0 scale-y-0 -translate-y-0'
                        }`}
                >
                    <div className="px-4 py-2.5 flex justify-between">
                        <div onClick={() => setShow(false)} className="cursor-pointer">
                            <span className="text-red-600 font-medium flex items-center"><GridClearIcon /> Cancelar</span>
                        </div>
                        <div className="cursor-pointer">
                            <span className="text-green-600 font-medium flex items-center"><GridCheckIcon /> Actualizar</span>
                        </div>

                    </div>
                </div>
            </div>
            <ModalTitleTicket
                open={open}
                handleClose={handleClose}
                languages={languages}
                setTextsTitles={setTextsTitles}
                textsTitles={textsTitles}
                errors={errors}
                setErrors={setErrors}
                handleSave={handleSave}
            />
        </>

    )
}