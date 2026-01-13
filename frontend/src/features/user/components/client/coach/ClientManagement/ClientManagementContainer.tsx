"use client";

import { ClientManagementPresenter } from "./ClientManagementPresenter";
import { useClientManagement } from "./useClientManagement";

export function ClientManagementContainer() {
  const { clients, isLoading, register, handleSubmit, errors, onSubmit } =
    useClientManagement();

  return (
    <ClientManagementPresenter
      clients={clients}
      isLoading={isLoading}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
}

