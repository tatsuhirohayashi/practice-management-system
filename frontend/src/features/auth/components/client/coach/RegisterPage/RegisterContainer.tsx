"use client";

import { RegisterPresenter } from "./RegisterPresenter";
import { useRegister } from "./useRegister";

export function RegisterContainer() {
  const { register, handleSubmit, errors, onSubmit } = useRegister();

  return (
    <RegisterPresenter
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
}
