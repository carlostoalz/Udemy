import { IAlerta } from '../interfaces/IAlerta';
import { IResultado } from '../interfaces/IResultado';

export const handleError = ( error: any, dispatch: (value: any) => void ,type: string ) => {
    
    let alerta: IAlerta = {
        msg: '',
        categoria: 'alerta-error'
    };

    if (error) {        
        if (error.response) {
            if (error.response.data) {
                if (error.response.data.error) {
                    alerta.msg = (error.response.data as IResultado<null>).error?.mensaje as string;
                }
            }
        } else {
            alerta.msg = error.message;
        }
    }
    

    dispatch({
        type,
        payload: alerta
    } as any);

};