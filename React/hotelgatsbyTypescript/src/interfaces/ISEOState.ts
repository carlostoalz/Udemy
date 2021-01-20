import { ISEO } from './ISEO';
export interface ISEOState {
    SEO?: ISEO;
    loading: boolean;
    error: boolean | null;
}