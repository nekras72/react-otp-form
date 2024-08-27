import React from 'react';
import styles from './otpInput.module.css' with {type: 'css'};
import { OtpInputProps } from '../types';

const OtpInput =
    React.forwardRef<HTMLInputElement, OtpInputProps>(({
        value,
        handleKeyDown,
        handleOnChange,
        inputClassName,
        inputFilledClassName,
        inputErrorClassName,
        hasError,
        resetInternalError,
    }, ref) => {
        const getInputClassName = () => {
            if (value === '' && !hasError) return inputClassName ?? styles.formInput;
            if (value !== '' && !hasError) return `${inputClassName ?? styles.formInput} ${inputFilledClassName ?? styles.fulfilled}`;
            if (hasError) return `${inputClassName ?? styles.formInput} ${inputErrorClassName ?? styles.error}`;
        }
        return (
            <input
                value={value}
                ref={ref}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                    const isValidValue = !isNaN(Number(e.target.value));
                    if (isValidValue) {
                        handleOnChange(e);
                    }
                }}
                onFocus={(e) => {
                    resetInternalError();
                    e.target.select();
                }}
                className={getInputClassName()}
                type="text"
            />
        )
    });

export default OtpInput
