import { Typography } from "@mui/material"
import MaintenanceIllustration from "../assets/illustrations/maintenance-illustration"

export const MaintenanceVisualization = () => {
    return (
        <div className='space-y-12 [&>*]:flex [&>*]:justify-center px-2 md:px-0 '>
            <div className=''>
                <Typography variant='h4'>
                    Página en construcción
                </Typography>
            </div>
            <div className=''>
                <MaintenanceIllustration />
            </div>
            <div className=''>
                <Typography variant='body1' sx={{ fontSize: 20 }}>
                    🚧 ¡Estamos construyendo algo increíble!
                    Pronto podrás visitarlo. ¡Mantente atento!
                </Typography>
            </div>
        </div>
    )
}