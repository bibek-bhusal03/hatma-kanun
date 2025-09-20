import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoClose } from "react-icons/io5";

// ✅ Validation Schemas
const applicantSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  citizenship: yup
    .string()
    .matches(/^[0-9]+$/, "Must be a number")
    .required("Citizenship No. is required"),
  address: yup.string().required("Address is required"),
  contact: yup
    .string()
    .matches(
      /^([0-9]{10}|[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+)$/,
      "Enter valid phone or email"
    )
    .required("Phone or Email is required"),
});

const requestSchema = yup.object().shape({
  office: yup.string().required("Government Office is required"),
  description: yup.string().required("Request description is required"),
});

const fileSchema = yup.object().shape({
  files: yup
    .mixed()
    .test(
      "required",
      "At least one file is required",
      (value) => value?.length > 0
    ),
});

const declarationSchema = yup.object().shape({
  agree: yup.bool().oneOf([true], "You must accept the declaration"),
});

export default function RtiRequestForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const schemas = [
    applicantSchema,
    requestSchema,
    fileSchema,
    declarationSchema,
  ];
  const currentSchema = schemas[step - 1];

  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(currentSchema),
    mode: "onBlur",
  });

  // ✅ Navigation between steps
  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  // ✅ Submit final data
  const onSubmit = (data) => {
    const formData = {
      ...getValues(),
      files: getValues("files")
        ? Array.from(getValues("files")).map((f) => f.name)
        : [],
    };
    console.log("📤 Sending data to DB:", formData);

    // TODO: replace with API call to DB later
    // await fetch("/api/submit-rti", { method: "POST", body: JSON.stringify(formData) });

    setSubmitted(true);
  };

  return (
    <div className="max-w-lg mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg">
      {/* ✅ Top Bar with arrow and close */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-800"
        >
          <IoArrowBack size={24} />
        </button>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          RTI Request
        </h2>
        <button
          onClick={() => navigate("/")}
          className="text-gray-500 hover:text-gray-700"
        >
          <IoClose size={22} />
        </button>
      </div>

      {/* Progress Info */}
      <div className="flex justify-between items-center mb-6">
        {["Applicant", "Request", "Files", "Declaration"].map((label, i) => {
          const stepNum = i + 1;
          return (
            <div key={label} className="flex flex-col items-center flex-1">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center text-sm font-semibold ${
                  step >= stepNum
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {stepNum}
              </div>
              <span
                className={`text-xs mt-1 ${
                  step >= stepNum ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 */}
        {step === 1 && (
          <>
            <h3 className="font-semibold mb-4 text-gray-700">
              1. Applicant Details
            </h3>
            <input
              {...register("fullName")}
              placeholder="Full Name"
              className="input"
            />
            <p className="error">{errors.fullName?.message}</p>

            <input
              {...register("fatherName")}
              placeholder="Father / Mother Name (Optional)"
              className="input"
            />

            <input
              {...register("citizenship")}
              placeholder="Citizenship No."
              className="input"
            />
            <p className="error">{errors.citizenship?.message}</p>

            <input
              {...register("address")}
              placeholder="Address"
              className="input"
            />
            <p className="error">{errors.address?.message}</p>

            <input
              {...register("contact")}
              placeholder="Phone / Email"
              className="input"
            />
            <p className="error">{errors.contact?.message}</p>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h3 className="font-semibold mb-4 text-gray-700">
              2. Information Request
            </h3>
            <input
              {...register("office")}
              placeholder="Government Office / Agency"
              className="input"
            />
            <p className="error">{errors.office?.message}</p>

            <textarea
              {...register("description")}
              placeholder="Detailed Request / Description"
              className="input h-24"
            />
            <p className="error">{errors.description?.message}</p>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h3 className="font-semibold mb-4 text-gray-700">
              3. Attach Supporting Files
            </h3>
            <Controller
              name="files"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  multiple
                  onChange={(e) => field.onChange(e.target.files)}
                  className="input"
                />
              )}
            />
            <p className="error">{errors.files?.message}</p>
          </>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <>
            <h3 className="font-semibold mb-4 text-gray-700">4. Declaration</h3>
            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input type="checkbox" {...register("agree")} className="mt-1" />
              <span>
                I declare that the information requested is for personal or
                public interest and understand the provisions of RTI Act, 2064.
              </span>
            </label>
            <p className="error">{errors.agree?.message}</p>
          </>
        )}

        {/* ✅ Success Message */}
        {submitted && (
          <p className="text-green-600 text-center mt-4 font-medium">
            ✅ Application submitted successfully!
          </p>
        )}

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
            >
              ← Back
            </button>
          ) : (
            <div></div>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// ✅ Tailwind helper styles
const styles = `
.input {
  @apply w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400;
}
.error {
  @apply text-red-500 text-sm mb-2;
}
`;
