"use client";

import { useForm } from "react-hook-form";
import { useClientListQuery } from "@/features/user/hooks/coach/useClientListQuery";
import { useCreateClientMutation } from "@/features/user/hooks/coach/useCreateClientMutation";

type ClientFormData = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export function useClientManagement() {
  const { data, isLoading } = useClientListQuery();
  const createMutation = useCreateClientMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    },
  });

  const onSubmit = async (formData: ClientFormData) => {
    try {
      await createMutation.mutateAsync({
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
      });
      reset();
    } catch (error) {
      console.error("クライアント作成エラー:", error);
    }
  };

  return {
    clients: data?.data ?? [],
    isLoading,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}

