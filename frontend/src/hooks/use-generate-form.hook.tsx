import { useForm, DefaultValues, FieldValues } from "react-hook-form";

function useGenerateForm <F extends FieldValues>(defaultValues: DefaultValues<F>, values?: F | undefined) {
  const form = useForm<F>({
    defaultValues,
    values
  });

  const commonProps = {
    register: form.register,
    errors: form.formState.errors,
    // isDirty: form.formState.isDirty
  };

  const controlledCommonProps = {
    ...commonProps,
    control: form.control
  };

  return {
    ...form,
    commonProps,
    controlledCommonProps,
  }
};

export default useGenerateForm;

