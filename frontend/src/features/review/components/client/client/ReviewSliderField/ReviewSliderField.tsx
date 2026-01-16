"use client";

import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { FormLabel } from "@/shared/components/custom";
import { Input } from "@/shared/components/ui/input";
import { Slider } from "@/shared/components/ui/slider";

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

interface ReviewSliderFieldProps {
  name: keyof Pick<ReviewFormData, "serve_in" | "return_in">;
  label: string;
  control: Control<ReviewFormData>;
  errors: FieldErrors<ReviewFormData>;
  required?: boolean;
  disabled?: boolean;
  sliderClassName?: string;
  inputClassName?: string;
  placeholder?: string;
}

export function ReviewSliderField({
  name,
  label,
  control,
  errors,
  required = true,
  disabled = false,
  sliderClassName = "w-full",
  inputClassName = "w-full",
  placeholder,
}: ReviewSliderFieldProps) {
  const fieldName = name;
  const errorMessage = errors[fieldName]?.message as string | undefined;
  const requiredMessage = required
    ? `${label.replace("○", "")}率は必須です`
    : undefined;

  return (
    <div className="space-y-2">
      <FormLabel required={required}>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{
          required: requiredMessage,
          min: { value: 0, message: "0以上で入力してください" },
          max: { value: 100, message: "100以下で入力してください" },
        }}
        render={({ field }) => {
          const isVerticalLayout =
            sliderClassName === "w-full" && inputClassName === "w-full";
          return (
            <div
              className={
                isVerticalLayout ? "space-y-2" : "flex items-center space-x-4"
              }
            >
              <Slider
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                min={0}
                max={100}
                step={1}
                className={sliderClassName}
                disabled={disabled}
              />
              <Input
                type="number"
                className={`${inputClassName} bg-white`}
                placeholder={placeholder}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                min={0}
                max={100}
                disabled={disabled}
              />
            </div>
          );
        }}
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
