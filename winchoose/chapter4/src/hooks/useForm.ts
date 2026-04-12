import { useCallback, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type FormValues = Record<string, string>;
type FormErrors<T extends FormValues> = Partial<Record<keyof T, string>>;
type FormTouched<T extends FormValues> = Partial<Record<keyof T, boolean>>;
type Validator<T extends FormValues> = (
  value: string,
  values: T,
) => string | undefined;
type Validators<T extends FormValues> = Partial<Record<keyof T, Validator<T>[]>>;

type UseFormOptions<T extends FormValues> = {
  initialValues: T;
  validators?: Validators<T>;
};

const getFieldError = <T extends FormValues>(
  fieldName: keyof T,
  value: string,
  values: T,
  validators?: Validators<T>,
) => {
  const fieldValidators = validators?.[fieldName] ?? [];

  for (const validator of fieldValidators) {
    const errorMessage = validator(value, values);

    if (errorMessage) {
      return errorMessage;
    }
  }

  return "";
};

const getAllErrors = <T extends FormValues>(
  values: T,
  validators?: Validators<T>,
) => {
  const nextErrors: FormErrors<T> = {};

  (Object.keys(values) as Array<keyof T>).forEach((fieldName) => {
    const errorMessage = getFieldError(
      fieldName,
      values[fieldName],
      values,
      validators,
    );

    if (errorMessage) {
      nextErrors[fieldName] = errorMessage;
    }
  });

  return nextErrors;
};

const getAllTouched = <T extends FormValues>(values: T) => {
  const nextTouched: FormTouched<T> = {};

  (Object.keys(values) as Array<keyof T>).forEach((fieldName) => {
    nextTouched[fieldName] = true;
  });

  return nextTouched;
};

const removeFieldError = <T extends FormValues>(
  errors: FormErrors<T>,
  fieldName: keyof T,
) => {
  const nextErrors = { ...errors };
  delete nextErrors[fieldName];
  return nextErrors;
};

const useForm = <T extends FormValues>({
  initialValues,
  validators,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<FormTouched<T>>({});

  const validateField = useCallback(
    (fieldName: keyof T, nextValues: T) => {
      return getFieldError(
        fieldName,
        nextValues[fieldName],
        nextValues,
        validators,
      );
    },
    [validators],
  );

  const setFieldValue = useCallback(
    (fieldName: keyof T, value: string) => {
      setValues((previousValues) => {
        const nextValues = {
          ...previousValues,
          [fieldName]: value,
        };

        setErrors((previousErrors) => {
          if (!touched[fieldName]) {
            return previousErrors;
          }

          const nextError = validateField(fieldName, nextValues);

          if (!nextError) {
            return removeFieldError(previousErrors, fieldName);
          }

          return {
            ...previousErrors,
            [fieldName]: nextError,
          };
        });

        return nextValues;
      });
    },
    [touched, validateField],
  );

  const handleBlur = useCallback(
    (fieldName: keyof T) => {
      setTouched((previousTouched) => ({
        ...previousTouched,
        [fieldName]: true,
      }));

      setErrors((previousErrors) => {
        const nextError = validateField(fieldName, values);

        if (!nextError) {
          return removeFieldError(previousErrors, fieldName);
        }

        return {
          ...previousErrors,
          [fieldName]: nextError,
        };
      });
    },
    [validateField, values],
  );

  const register = useCallback(
    (fieldName: keyof T) => ({
      name: String(fieldName),
      value: values[fieldName],
      onChange: (event: ChangeEvent<HTMLInputElement>) =>
        setFieldValue(fieldName, event.target.value),
      onBlur: () => handleBlur(fieldName),
    }),
    [handleBlur, setFieldValue, values],
  );

  const handleSubmit = useCallback(
    (onValid: (nextValues: T) => void | Promise<void>) => {
      return async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors = getAllErrors(values, validators);
        const hasError = Object.keys(nextErrors).length > 0;

        setErrors(nextErrors);
        setTouched(getAllTouched(values));

        if (hasError) {
          return;
        }

        await onValid(values);
      };
    },
    [validators, values],
  );

  const isValid = useMemo(() => {
    const nextErrors = getAllErrors(values, validators);

    return (
      Object.keys(nextErrors).length === 0 &&
      (Object.keys(values) as Array<keyof T>).every(
        (fieldName) => values[fieldName].trim() !== "",
      )
    );
  }, [validators, values]);

  return {
    values,
    errors,
    touched,
    isValid,
    register,
    handleSubmit,
    setErrors,
    setValues,
  };
};

export default useForm;
