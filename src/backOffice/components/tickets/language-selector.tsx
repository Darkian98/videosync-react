import ES from '../../assets/svg/es.svg';
import IT from '../../assets/svg/it.svg';
import NL from '../../assets/svg/nl.svg';
import EN from '../../assets/svg/en.svg';
import FR from '../../assets/svg/fr.svg';
import DE from '../../assets/svg/de.svg';
import PT from '../../assets/svg/pt.svg';
import { useState } from 'react';

const flags = {
    es: ES,
    de: DE,
    en: EN,
    fr: FR,
    it: IT,
    nl: NL,
    pt: PT
}

export const LanguageSelector = ({ languageCode, changer }: any) => {

    return (
        <div className="flex w-full space-x-1 sm:space-x-4 justify-between sm:justify-start">
            {Object.entries(flags).map(([code, src]) => (
                <img
                    key={code}
                    src={src}
                    alt={code}
                    className="size-5 cursor-pointer"
                    style={{
                        filter: languageCode === code ? 'none' : 'grayscale(100%)',
                    }}
                    onClick={() => changer(code)}
                />
            ))}
        </div>
    );
}