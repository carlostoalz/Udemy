export interface IHabitacion {
    id: string;
    titulo: string;
    contenido: string;
    slug: string;
    imagen: {
        fluid: {
            aspectRatio: number;
            base64: string;
            sizes: string;
            src: string;
            srcSet: string;
        }
    };
}