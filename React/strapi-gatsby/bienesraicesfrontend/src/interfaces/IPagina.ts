export interface IPagina {
    id: string;
    nombre: string;
    contenido: string;
    imagen: {
        sharp: {
            fluid: {
                aspectRatio: number;
                base64: string;
                sizes: string;
                src: string;
                srcSet: string;
                srcSetWebp: string;
                srcWebp: string;
            }
        };
    }
}