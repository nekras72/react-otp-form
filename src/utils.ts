import { FormValues, HandleKeyDownArgType } from "./types";

export const buildFormValues = (inputsAmount: number): FormValues => {
  const newFormState: FormValues = {};
  for (let index = 0; index < inputsAmount; index++) {
    newFormState[`${index}`] = '';
  };
  return newFormState;
};

const shiftValues = (obj: FormValues, index: number, inputsAmount: number) => {
  obj[`${index}`] = '';
  const array = Object.values(obj).filter(el => el !== '');
  for (let index = 0; index < inputsAmount; index++) {
    if (index < array.length) {
      obj[`${index}`] = array[`${index}`];
    } else obj[`${index}`] = '';
  }
  return obj;
}

export const shiftIfNeeded = (obj: FormValues, index: number, inputsAmount: number): FormValues => {
  const isTheLast = index === inputsAmount - 1;
  if (!isTheLast) {
    const array = Object.values(obj).splice(index).filter(v => v !== '');
    if (array.length > 0) {
      return shiftValues(obj, index, inputsAmount);
    };
  } return obj;
}

const getCorrectIndex = (arr: string[], i: number): number => {
  let correctIndex = i;
  while (correctIndex > 0 && arr[correctIndex - 1] === '') {
    correctIndex--;
  }
  return correctIndex;
}

export const checkPreviousValuesAndUpdate = (
  currentIndex: number,
  value: string,
  formValues: FormValues,
  setFormValues: (value: React.SetStateAction<FormValues>) => void,
  handleFocus: (index: number, value: string) => void,
) => {
  // Copy the current form values to avoid direct mutation
  const newFormValues: FormValues = { ...formValues };

  // Determine the correct index to update
  let correctIndex = currentIndex;
  if (correctIndex !== 0 && newFormValues[`${correctIndex - 1}`] === '') {
    // Get the correct index if the previous index is empty
    correctIndex = getCorrectIndex(Object.values(newFormValues), correctIndex);
  }

  // Update the form value at the correct index
  newFormValues[`${correctIndex}`] = value;

  // Update the form values state
  setFormValues(newFormValues);

  // Handle focus with the correct index and new value
  handleFocus(correctIndex, value);
};

export const handleKeyDown = ({
  event,
  currentIndex,
  inputsAmount,
  inputsRefs,
  formValues,
  setFormValues,
}: HandleKeyDownArgType) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case ' ':
      event.preventDefault();
      break;
    case 'ArrowLeft':
      event.preventDefault();
      if (currentIndex > 0) {
        inputsRefs.current[`${currentIndex - 1}`]?.focus();
      }
      break;
    case 'ArrowRight':
      event.preventDefault();
      if (currentIndex < inputsAmount - 1) {
        inputsRefs.current[`${currentIndex + 1}`]?.focus();
      }
      break;
    case 'Delete':
    case 'Backspace':
      event.preventDefault();
      if (formValues[`${currentIndex}`]) {
        setFormValues((state) => (
          shiftIfNeeded({
            ...state,
            [`${currentIndex}`]: ''
          }, currentIndex, inputsAmount)));
      }
      if (currentIndex > 0) {
        inputsRefs.current[`${currentIndex - 1}`]?.focus();
      }
      break;

    default:
      break;
  }
};