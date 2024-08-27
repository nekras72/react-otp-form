import React, { ReactNode, useEffect, useRef, useState } from 'react';
import OtpInput from './components/OtpInput';

import styles from './otpForm.module.css' with {type: 'css'};
import { FormValues, OtpFormProps } from './types';
import { buildFormValues, checkPreviousValuesAndUpdate, handleKeyDown, } from './utils';

const OtpForm: React.FC<OtpFormProps> = ({
  inputsAmount,
  handleSubmit,
  errorMessage,
  isLoading = false,
  btnText,
  triggerSubmitOnFulfill = true,
  errorMessagePos = 'bottom',
  customFulfillErrorMessage,
  // components
  separator,
  CustomLoader,
  CustomSubmitBtn,
  // style
  formClassName,
  formButtonClassName,
  formButtonContainerClassName,
  loaderContainerClassName,
  errorContainerClassName,
  // input style
  inputClassName,
  inputFilledClassName,
  inputErrorClassName,
}) => {

  const otpContainerClass = errorMessagePos === 'bottom' ? styles.otpContainer : styles.otpContainerReverse;
  const [formValues, setFormValues] = useState<FormValues>(buildFormValues(inputsAmount));
  const [internalError, setInternalError] = useState<string>('');

  const inputsRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleRef = (ref: HTMLInputElement | null) => {
    if (ref) {
      inputsRefs.current.push(ref);
    }
  };

  const hasError = ((errorMessage !== '' && errorMessage !== undefined) || internalError !== '');
  const resetInternalError = () => internalError && setInternalError('');

  const isFormFulfilled = Object.values(formValues).reduce((str, char) => (str + char), '').length === inputsAmount;

  const triggerSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (isFormFulfilled) {
      const formValuesStr = Object.values(formValues).reduce((str, char) => (str + char), '');
      handleSubmit(formValuesStr);
    } else {
      setInternalError(customFulfillErrorMessage ?? 'Please check entered code');
    }
  };

  const handleInputOnChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const handleFocus = (i: number, value: string) => {

      if (i < inputsAmount - 1) {
        inputsRefs.current[`${i + 1}`]?.focus();
      } else if (value !== '' && i === inputsAmount - 1) event.target.blur();
    }
    const inputValue = event.target.value;

    const inputValueLength = inputValue.length;
    let value: string;

    if (inputValueLength <= 1) {
      value = inputValue;
    } else value = inputValue.slice(inputValueLength - 1);

    checkPreviousValuesAndUpdate(
      index,
      value,
      formValues,
      setFormValues,
      handleFocus,
    );
  };

  const getInputsToRender = (inputsAmount: number) => {
    if (inputsAmount !== 0) {
      const inputsArray: JSX.Element | ReactNode[] = [];
      for (let index = 0; index < inputsAmount; index++) {
        inputsArray.push(
          <OtpInput
            hasError={hasError}
            resetInternalError={resetInternalError}
            handleKeyDown={(event) =>
              handleKeyDown({
                event,
                currentIndex: index,
                inputsAmount,
                inputsRefs,
                formValues,
                setFormValues
              })}
            inputClassName={inputClassName}
            inputFilledClassName={inputFilledClassName}
            inputErrorClassName={inputErrorClassName}
            key={`input-${index}`}
            value={formValues[`${index}`]}
            handleOnChange={(e) => handleInputOnChange(index, e)}
            ref={(ref: HTMLInputElement | null) => handleRef(ref)}
          />
        );
        if (separator && index !== inputsAmount - 1) {
          inputsArray.push(separator);
        }
      }
      return inputsArray;
    }
  };

  useEffect(() => {
    inputsRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (isFormFulfilled && triggerSubmitOnFulfill) {
      triggerSubmit();
    }
  }, [isFormFulfilled, triggerSubmitOnFulfill]);

  return (
    <div className={otpContainerClass}>
      {!isLoading ? (
        <>
          <form onSubmit={triggerSubmit} className={formClassName ?? styles.formContainer}>
            {getInputsToRender(inputsAmount)}
            {(!triggerSubmitOnFulfill || CustomSubmitBtn) && <div className={formButtonContainerClassName ?? styles.formButtonContainer}>
              {CustomSubmitBtn ?? <button
                className={formButtonClassName ?? styles.formButton}
                disabled={hasError}
                type='submit'>{btnText ?? 'Submit'}</button>}
            </div>}
          </form>
          <div className={errorContainerClassName ?? styles.errorContainer}>
            {(errorMessage || internalError) && <p>{errorMessage ?? internalError}</p>}
          </div>
        </>
      ) :
        (
          <div className={loaderContainerClassName ?? styles.loaderContainer}>
            {CustomLoader ?? <div className={styles.loader} />}
          </div>
        )}
    </div>
  );
}

export default OtpForm;
