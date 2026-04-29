import type { SignUpFormValues } from "./auth";

export interface StepProps {
  values: SignUpFormValues;
  errors: Partial<Record<keyof SignUpFormValues, string>>;
  touched: Partial<Record<keyof SignUpFormValues, Boolean>>;
  getInputProps: (field: keyof SignUpFormValues) => {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
}
