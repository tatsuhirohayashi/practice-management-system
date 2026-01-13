"use client";

import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { FormLabel } from "@/shared/components/custom";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import type { ConditionOption } from "@/features/condition/common/constants";

type ConditionFormData = {
  musle_pain: number;
  motivation: number;
  feeling: number;
  tired: number;
  condition_memo: string;
};

interface ConditionRadioGroupFieldProps {
  name: keyof Pick<
    ConditionFormData,
    "musle_pain" | "motivation" | "feeling" | "tired"
  >;
  label: string;
  options: ConditionOption[];
  control: Control<ConditionFormData>;
  errors: FieldErrors<ConditionFormData>;
  required?: boolean;
  disabled?: boolean;
  idPrefix?: string;
}

export function ConditionRadioGroupField({
  name,
  label,
  options,
  control,
  errors,
  required = true,
  disabled = false,
  idPrefix = "",
}: ConditionRadioGroupFieldProps) {
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
            {options.map((option) => {
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
      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

