import Swal from 'sweetalert2';

export class SwalUtil {
    Error(texto: string){
        Swal.fire({
            title: 'Error',
            text: texto,
            icon: "error"
        });
    }
}