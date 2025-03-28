import { FC, useEffect } from "react";
import { ContactFormData, contactSchema } from "../../../schema/contactSchema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { toast } from "react-toastify";

type ContactFormProps = {
  initialData: ContactFormData | null;
  setInitialData: (data: ContactFormData | null) => void;
  onAdd: (data: ContactFormData) => void;
  onUpdate: (data: ContactFormData) => void;
  onCancel?: () => void;
  setVisible: (visible: boolean) => void;
};

const ContactForm: FC<ContactFormProps> = ({
  initialData,
  setInitialData,
  onAdd,
  onUpdate,
  setVisible,
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      email: [""],
      phoneNumber: [""],
    },
  });

  //Show a toast error based on error key from zod
  toast.error(Object.keys(errors)[0]);

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({ control, name: "email" as never });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: "phoneNumber" as never });

  const onSubmit = (data: ContactFormData) => {
    if (initialData) {
      onUpdate(data);
      setInitialData(null);
      reset({});
    } else {
      onAdd({ id: Date.now().toString(), ...data });
      reset({});
    }
    setVisible(false);
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        email: [""],
        phoneNumber: [""],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 w-full align-middle justify-center place-items-center">
          <Input
            id="firstName"
            label="First Name"
            {...register("firstName")}
            placeholder="First Name"
            error={errors.firstName?.message}
          />

          <Input
            id="lastName"
            label="Last Name"
            {...register("lastName")}
            placeholder="Last Name"
            error={errors.lastName?.message}
          />

          <Input
            id="address"
            label="Address"
            {...register("address")}
            placeholder="Address"
            error={errors.address?.message}
          />

          <Input
            id="city"
            label="City"
            {...register("city")}
            placeholder="City"
            error={errors.city?.message}
          />

          <Input
            id="country"
            label="Country"
            {...register("country")}
            placeholder="Country"
            error={errors.country?.message}
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col">
                {emailFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="col-span-2 flex gap-2 items-end"
                  >
                    <Input
                      id="email"
                      label={`Email ${index + 1}`}
                      {...register(`email.${index}`)}
                      error={errors.email?.[index]?.message}
                    />
                    {emailFields.length > 1 && (
                      <Button
                        title="Remove"
                        type="button"
                        onClick={() => removeEmail(index)}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Button
                title="✚"
                type="button"
                onClick={() => appendEmail("")}
                fullyRounded
              />
            </div>

            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col">
                {phoneFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="col-span-2 flex gap-2 items-end "
                  >
                    <Input
                      key={field.id}
                      id="phoneNumber"
                      label={`Phone Number ${index + 1}`}
                      {...register(`phoneNumber.${index}`)}
                      error={errors.phoneNumber?.[index]?.message}
                    />
                    {phoneFields.length > 1 && (
                      <Button
                        title="Remove"
                        type="button"
                        onClick={() => removePhone(index)}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Button
                title="✚"
                type="button"
                onClick={() => appendPhone("")}
                fullyRounded
              />
            </div>
          </div>

          <Button
            title={initialData ? "Update Contact" : "Add Contact"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
