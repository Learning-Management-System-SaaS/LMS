import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

export type FieldType = "text" | "email" | "password" | "select" | "textarea";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[]; // For select fields
  grid?: string; // e.g. "col-span-2" or "col-span-1"
}

interface FormContainerProps<T> {
  title: string;
  description?: string;
  initialValues: T;
  validationSchema?: any;
  fields: FormField[];
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>;
  onCancel?: () => void;
  submitLabel?: string;
}

const FormContainer = <T extends Record<string, any>>({
  title,
  description,
  initialValues,
  validationSchema,
  fields,
  onSubmit,
  onCancel,
  submitLabel = "Submit",
}: FormContainerProps<T>) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>

      {/* Form Card */}
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 max-w-lg mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={`form-control mb-4 ${field.grid || "col-span-1"}`}
                  >
                    <label className="label">
                      <span className="label-text text-gray-700 font-medium">
                        {field.label}
                      </span>
                    </label>

                    {field.type === "select" ? (
                      <Field
                        as="select"
                        name={field.name}
                        className="select select-bordered w-full bg-white border-gray-400 text-gray-800"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Field>
                    ) : field.type === "textarea" ? (
                      <Field
                        as="textarea"
                        name={field.name}
                        className="textarea textarea-bordered w-full bg-white border-gray-400 text-gray-800"
                        placeholder={field.placeholder || ""}
                      />
                    ) : (
                      <Field
                        type={field.type}
                        name={field.name}
                        className="input input-bordered bg-white border-gray-400 w-full text-gray-800"
                        placeholder={field.placeholder || ""}
                      />
                    )}

                    <ErrorMessage
                      name={field.name}
                      component="p"
                      className="text-error text-sm mt-1"
                    />
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4">
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 normal-case text-base rounded-md w-full"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-sky-800 border-none hover:bg-sky-700 text-white normal-case text-base rounded-md w-full"
                >
                  {isSubmitting ? "Processing..." : submitLabel}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormContainer;
