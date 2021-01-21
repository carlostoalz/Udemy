import { 
    OBTENER_LOGO,
    OBTENER_LOGO_EXITO,
    OBTENER_LOGO_ERROR,
    OBTENER_BANNER,
    OBTENER_BANNER_EXITO,
    OBTENER_BANNER_ERROR,
    OBTENER_ICONOS,
    OBTENER_ICONOS_EXITO,
    OBTENER_ICONOS_ERROR
} from '../types/index';
import { Dispatch } from 'redux';
import useLogo from '../../hooks/use-logo';
import useBanner from '../../hooks/use-banner';
import useIconos from '../../hooks/use-iconos';
import { IAction } from '../../interfaces/IAction';
import { ILogo } from '../../interfaces/ILogo';
import { IBanner } from '../../interfaces/IBanner';
import { IIcono } from '../../interfaces/IIcono';

export const obtenerLogoAction = () => {
    return (dispatch: Dispatch) => {
        dispatch( obtenerLogo() );

        try {
            const logo = useLogo();
            dispatch( obtenerLogoExito(logo) );
        } catch (error) {
            dispatch( obtenerLogoError( true ) );
            console.error(error);
        }
    }
};

const obtenerLogo = () => ({
    type: OBTENER_LOGO,
    payload: true
} as IAction);

const obtenerLogoExito = (logo: ILogo) => ({
    type: OBTENER_LOGO_EXITO,
    payload: logo
} as IAction);

const obtenerLogoError = (estado: boolean) => ({
    type: OBTENER_LOGO_ERROR,
    payload: estado
} as IAction);

export const obtenerBannerAction = () => {
    return (dispatch: Dispatch) => {
        dispatch( obtenerBanner() );

        try {
            const banner: IBanner = useBanner();
            dispatch( obtenerBannerExito(banner) );
        } catch (error) {
            dispatch( obtenerBannerError( true ) );
            console.error(error);
        }
    }
};

const obtenerBanner = () => ({
    type: OBTENER_BANNER,
    payload: true
} as IAction);

const obtenerBannerExito = (banner: IBanner) => ({
    type: OBTENER_BANNER_EXITO,
    payload: banner
} as IAction);

const obtenerBannerError = (estado: boolean) => ({
    type: OBTENER_BANNER_ERROR,
    payload: estado
} as IAction);

export const obtenerIconosAction = () => {
    return (dispatch: Dispatch) => {
        dispatch( obtenerIconos() );

        try {
            const iconos: IIcono[] = useIconos();
            dispatch( obtenerIconosExito(iconos) );
        } catch (error) {
            dispatch( obtenerIconosError( true ) );
            console.error(error);
        }
    }
};

const obtenerIconos = () => ({
    type: OBTENER_ICONOS,
    payload: true
} as IAction);

const obtenerIconosExito = (iconos: IIcono[]) => ({
    type: OBTENER_ICONOS_EXITO,
    payload: iconos
} as IAction);

const obtenerIconosError = (estado: boolean) => ({
    type: OBTENER_ICONOS_ERROR,
    payload: estado
} as IAction);