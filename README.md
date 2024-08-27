# OtpForm Component

The `OtpForm` component is a customizable and flexible OTP (One-Time Password) input form built with React. It allows you to easily integrate an OTP input interface into your application, with various customization options for appearance and behavior.

## Installation

To install the component, use npm:

```bash
npm install otp-react-form
```

## Usage

```bash
import React from 'react';
import OtpForm from 'otp-form-component';

const MyComponent = () => {
const handleSubmit = (otpValue) => {
console.log('OTP Value:', otpValue);
};

return (
<OtpForm
      inputsAmount={6}
      handleSubmit={handleSubmit}
    />
);
};

export default MyComponent;
```

## API

```bash
inputsAmount (required)
Type: number
Description: The number of OTP input fields to render.

handleSubmit (required)
Type: (values: string) => void
Description: Function that handles the form submission. The OTP value is passed as a concatenated string.

customFulfillErrorMessage
Type: string
Description: Custom error message to display if the form is submitted before all input fields are filled.

errorMessage
Type: string
Description: Error message to display in the error container. If both errorMessage and customFulfillErrorMessage are provided, errorMessage takes precedence.

errorMessagePos
Type: 'top' | 'bottom'
Default: 'bottom'
Description: Position of the error message relative to the input fields.

isLoading
Type: boolean
Default: false
Description: When true, displays a loading indicator instead of the form.

btnText
Type: string
Default: 'Submit'
Description: Text to display on the submit button.

triggerSubmitOnFulfill
Type: boolean
Default: true
Description: When true, the form is automatically submitted when all input fields are filled.

formClassName
Type: string
Description: Custom CSS class name for the form container.

loaderContainerClassName
Type: string
Description: Custom CSS class name for the loader container.

errorContainerClassName
Type: string
Description: Custom CSS class name for the error message container.

formButtonClassName
Type: string
Description: Custom CSS class name for the submit button.

formButtonContainerClassName
Type: string
Description: Custom CSS class name for the submit button container.

inputClassName
Type: string
Description: Custom CSS class name for the input fields.

inputFilledClassName
Type: string
Description: Custom CSS class name for filled input fields.

inputErrorClassName
Type: string
Description: Custom CSS class name for input fields when an error is present.

separator
Type: JSX.Element
Description: Custom separator element to display between the OTP input fields.

CustomLoader
Type: JSX.Element
Description: Custom loader component to display when isLoading is true.

CustomSubmitBtn
Type: JSX.Element
Description: Custom submit button component. Replaces the default submit button when provided.
```
