import { useForm, DefaultValues, FieldValues } from "react-hook-form";

function useGenerateForm <F extends FieldValues>(defaultValues: DefaultValues<F>, values?: F | undefined) {
  const form = useForm<F>({
    defaultValues,
    values
  });

  const commonProps = {
    register: form.register,
    errors: form.formState.errors,
  };

  return {
    ...form,
    commonProps,
  }
};

export default useGenerateForm;

