export interface IPagina {
    titulo: string;
    contenido: string;
    imagen: { 
        fluid: { 
            base64: string; 
            aspectRatio:number; 
            src: string;
            srcSet: string; 
            sizes: string;
        } 
    };
    slug: string;
}