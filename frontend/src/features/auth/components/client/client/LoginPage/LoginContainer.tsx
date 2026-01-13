"use client";

import { LoginPresenter } from "./LoginPresenter";
import { useLogin } from "./useLogin";

export function LoginContainer() {
  const { register, handleSubmit, errors, onSubmit } = useLogin();

  return (
    <LoginPresenter
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
}
