import { FormValues, HandleKeyDownArgType } from "./types";
export declare const buildFormValues: (inputsAmount: number) => FormValues;
export declare const shiftIfNeeded: (obj: FormValues, index: number, inputsAmount: number) => FormValues;
export declare const checkPreviousValuesAndUpdate: (currentIndex: number, value: string, formValues: FormValues, setFormValues: (value: React.SetStateAction<FormValues>) => void, handleFocus: (index: number, value: string) => void) => void;
export declare const handleKeyDown: ({ event, currentIndex, inputsAmount, inputsRefs, formValues, setFormValues, }: HandleKeyDownArgType) => void;
