import Swal, { SweetAlertResult } from "sweetalert2";

export class SwalUtil {
    Espere(){
        Swal.fire({
            title: 'Espere.',
            text: 'Guardando información.',
            icon: "info",
            allowOutsideClick: false
        });
        Swal.showLoading();
    }

    Error(texto: string){
        Swal.fire({
            title: 'Error',
            text: texto,
            icon: "error"
        });
    }

    Pregunta(pregunta: string, texto) : Promise<SweetAlertResult>{
        return Swal.fire({
            title: pregunta,
            text: texto,
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        });
    }
}