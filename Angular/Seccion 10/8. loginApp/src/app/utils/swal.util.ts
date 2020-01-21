import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Errors } from '../enums/erros.enum';

export class SwalUtil {
    mostrarMenssaje(tittle: string, message?: string, isError: boolean = false, error?: string) {
        let options: SweetAlertOptions = {};

        if (isError) {
            switch (error) {
                case Errors.contrasena:
                    options = {
                        icon: 'error',
                        title: tittle,
                        text: 'Contraseña Invalida'
                    }
                    break;
                case Errors.usuarioExiste:
                    options = {
                        icon: 'error',
                        title: tittle,
                        text: 'Usuario ya existe'
                    }
                    break;
                default:
                    break;
            }
        } else {

        }

        Swal.fire(options);
    }

    mostrarLoading() {
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Espere por favor'
        });
        Swal.showLoading();
    }
}