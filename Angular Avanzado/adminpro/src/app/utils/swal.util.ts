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

    Alerta( titulo: string, text: string ){
        Swal.fire({
            title: titulo,
            text: text,
            icon: "warning"
        });
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

    Exitoso( titulo: string, text: string ){
        return Swal.fire({
            title: titulo,
            text: text,
            icon: 'success'
        });
    }
}