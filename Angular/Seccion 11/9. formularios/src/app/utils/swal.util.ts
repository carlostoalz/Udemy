import Swal from "sweetalert2";

export class SwalUtil {
    mostrarError( mensaje: string ){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje
        });
    }
}