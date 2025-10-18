import React from "react";
import * as Yup from "yup";
import FormContainer, {FormField} from "../common/formContainer";
import { mockSubscriptions, mockTenants } from "../../../data/mockData";

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Tenant", value: "tenant" },
];

const initialValues = {
  tenantId: "",
  role: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  tenant: Yup.string().required("Tenant name is required"),
  SubscriptionType: Yup.string().required("Subscription Type is required"),
});

const fields: FormField[] = [
  {
    name: "tenant",
    label: "Tenant Name",
    type: "text",
    placeholder:"e.g. University Of Khartoum",
    grid: "col-span-2",
  },
  {
    name: "subscriptionType",
    label: "Subscription Type",
    type: "select",
    grid: "col-span-2",
    options: mockSubscriptions.map((t) => ({ label: t.plan, value: t.id })),
  },
  
];

const TenantForm: React.FC = () => {
  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form Submitted:", values);
  };

  return (
    <FormContainer
      title="Create a New User Account"
      description="Fill in the details below to create a new user."
      initialValues={initialValues}
      validationSchema={validationSchema}
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Create Account"
    />
  );
};

export default TenantForm;
