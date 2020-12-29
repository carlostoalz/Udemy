export interface IValidationHook<V extends object> {
    valores: V;
    errores: V;
    submitForm: boolean;
    handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: () => void;
}