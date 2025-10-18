import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

interface SectionField {
  label: string;
  name: string;
  type?: string;
}

interface Section {
  title: string;
  fields: SectionField[];
}

interface DetailsCardProps {
  title: string;
  description?: string;
  sections: Section[];
  initialValues: Record<string, string>;
  onSubmit: (values: Record<string, string>) => void;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
  title,
  description,
  sections,
  initialValues,
  onSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto mt-5 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && <p className="text-gray-500 mb-4">{description}</p>}

      {!isEditing ? (
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold border-b pb-2 mb-3">
                {section.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {section.fields.map((field) => (
                  <div key={field.name}>
                    <p className="text-sm text-gray-500">{field.label}</p>
                    <p className="font-medium">{initialValues[field.name]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6 text-right">
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Details
            </button>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit(values);
            setIsEditing(false);
          }}
        >
          {({ values }) => (
            <Form className="space-y-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-3">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {section.fields.map((field) => (
                      <div key={field.name}>
                        <label className="label">
                          <span className="label-text">{field.label}</span>
                        </label>
                        <Field
                          name={field.name}
                          type={field.type || "text"}
                          className="input input-bordered bg-gray-100 w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default DetailsCard;
