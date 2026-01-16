"use client";

import { type Control, Controller, type FieldErrors } from "react-hook-form";
import type { ReviewOption } from "@/features/review/common/constants";
import { FormLabel } from "@/shared/components/custom";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";

type ReviewFormData = {
  forehand: number;
  backhand: number;
  serve: number;
  volley: number;
  return: number;
  serve_in: number;
  return_in: number;
  review_memo: string;
};

interface ReviewRadioGroupFieldProps {
  name: keyof Pick<
    ReviewFormData,
    "forehand" | "backhand" | "serve" | "volley" | "return"
  >;
  label: string;
  options: ReviewOption[];
  control: Control<ReviewFormData>;
  errors: FieldErrors<ReviewFormData>;
  required?: boolean;
  disabled?: boolean;
  idPrefix?: string;
}

export function ReviewRadioGroupField({
  name,
  label,
  options,
  control,
  errors,
  required = true,
  disabled = false,
  idPrefix = "",
}: ReviewRadioGroupFieldProps) {
  const fieldName = name;
  const errorMessage = errors[fieldName]?.message as string | undefined;
  const requiredMessage = required
    ? `${label.replace("○", "")}を選択してください`
    : undefined;

  return (
    <div className="space-y-2">
      <FormLabel required={required}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{ required: requiredMessage }}
        render={({ field }) => (
          <RadioGroup
            value={field.value?.toString()}
            onValueChange={(value) => field.onChange(Number(value))}
            className="flex flex-row gap-4"
            disabled={disabled}
          >
            {options
              .slice()
              .reverse()
              .map((option) => {
                const id = idPrefix
                  ? `${idPrefix}-${name}-${option.value}`
                  : `${name}-${option.value}`;
                return (
                  <div
                    key={option.value}
                    className="flex items-center space-x-4"
                  >
                    <RadioGroupItem
                      value={option.value.toString()}
                      id={id}
                      disabled={disabled}
                    />
                    <label
                      htmlFor={id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                );
              })}
          </RadioGroup>
        )}
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
