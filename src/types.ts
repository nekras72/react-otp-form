import { InputHTMLAttributes } from "react";

export type OtpFormProps = {
    inputsAmount: number;
    handleSubmit: (values: string) => void;
    customFulfillErrorMessage?: string;
    errorMessage?: string;
    errorMessagePos?: 'top' | 'bottom';
    isLoading?: boolean;
    btnText?: 'string'
    triggerSubmitOnFulfill?: boolean;
    // class names
    formClassName?: string;
    loaderContainerClassName?: string;
    errorContainerClassName?: string;
    formButtonClassName?: string
    formButtonContainerClassName?: string
    // input class names
    inputClassName?: string;
    inputFilledClassName?: string;
    inputErrorClassName?: string;
    // custom components
    separator?: JSX.Element;
    CustomLoader?: JSX.Element;
    CustomSubmitBtn?: JSX.Element;
}

export type FormValues = {
    [key: string]: string;
}

export interface OtpInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    inputClassName?: string;
    inputFilledClassName?: string;
    inputErrorClassName?: string;
    value: string;
    hasError: boolean;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    resetInternalError: () => void;
}

export type HandleKeyDownArgType = {
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
    inputsAmount: number,
    inputsRefs: React.MutableRefObject<(HTMLInputElement | null)[]>,
    formValues: FormValues,
    setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
}