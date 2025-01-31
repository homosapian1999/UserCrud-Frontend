"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { UserType, Interests } from "@/types/User";

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().int().positive().optional()
  ),
  mobile: z.preprocess(
    (val) => String(val),
    z.string().length(10, "Mobile number must be exactly 10 digits")
  ),
  interests: z
    .array(z.nativeEnum(Interests))
    .nonempty("At least one interest is required"),
});

export default function CreateUserPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<UserType>({
    resolver: zodResolver(createUserSchema),
    mode: "onChange", // Validate the form on change
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const createUserMutation = useMutation({
    mutationFn: async (newUser: UserType) => {
      const { data } = await axios.post(`${apiUrl}/create-user`, newUser);
      return data;
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  const onSubmit = (data: UserType) => {
    createUserMutation.mutate(data);
  };

  const interestsOptions = Object.values(Interests).map((interest) => ({
    value: interest,
    label: interest,
  }));

  interface CustomStyles {
    control: (base: any) => any;
    menu: (base: any) => any;
    menuList: (base: any) => any;
    multiValue: (base: any) => any;
    multiValueLabel: (base: any) => any;
  }

  const customStyles: CustomStyles = {
    control: (base) => ({
      ...base,
      minHeight: "36px",
      overflow: "visible",
    }),
    menu: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      zIndex: 9999, // Ensure it appears above other elements
      position: "absolute", // Position it absolutely
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      className: "custom-scrollbar",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#e2e8f0", // light gray
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#000", // black
    }),
  };

  return (
    <div className="flex flex-col items-center p-8 w-full max-w-3xl border border-gray-300 bg-gray-50 rounded-xl shadow-lg overflow-visible">
      <div className="w-full">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">Create User</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => router.push("/")}
          >
            Back
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-400 rounded-lg"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name?.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-400 rounded-lg"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email?.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-400 rounded-lg"
                {...register("age")}
              />
              {errors.age && (
                <p className="text-red-500 text-sm">
                  {errors.age?.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile No <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-400 rounded-lg"
                {...register("mobile")}
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm">
                  {errors.mobile?.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Interests
            </label>
            <Controller
              name="interests"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  closeMenuOnSelect={false}
                  options={interestsOptions}
                  className="w-full"
                  styles={customStyles}
                  value={interestsOptions.filter((option) =>
                    (field.value ?? []).includes(option.value)
                  )}
                  onChange={(selectedOptions) => {
                    const values = selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : [];
                    field.onChange(values);
                  }}
                />
              )}
            />
            {errors.interests && (
              <p className="text-red-500 text-sm">
                {errors.interests?.message as string}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
