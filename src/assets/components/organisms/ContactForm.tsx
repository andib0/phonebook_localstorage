import { FC, useEffect } from "react";
import { ContactFormData, contactSchema } from "../../../schema/contactSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

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
      email: "",
      phoneNumber: "",
    },
  });

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
        email: "",
        phoneNumber: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 p-4 gap-4">
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

          <Input
            id="email"
            label="Email"
            type="email"
            {...register("email")}
            placeholder="Email"
            error={errors.email?.message}
          />

          <Input
            id="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />
        </div>

        {/* <button
          type="submit"
          className="px-4 py-2 border-2 border-[#64FFDA] text-[#64FFDA] rounded hover:bg-blue-700 w-fit h-fit"
        >
          {initialData ? "Update Contact" : "Add Contact"}
        </button> */}
        <Button
          title={initialData ? "Update Contact" : "Add Contact"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default ContactForm;
