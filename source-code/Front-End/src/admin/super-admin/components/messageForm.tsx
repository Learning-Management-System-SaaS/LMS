import React from "react";
import * as Yup from "yup";
import FormContainer, {FormField} from "../common/formContainer";
import { mockTenants } from "../../../data/mockData";

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Tenant", value: "tenant" },
];
const messageType = [
  { label: "Technical Issue", value: "technicalIssue" },
  { label: "Support", value: "support" },
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
  userType: Yup.string().required("User Type is required"),
  messageType: Yup.string().required("Message Type is required"),
  subject: Yup.string().required("Subject is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  
});

const fields: FormField[] = [
  {
    name: "messageType",
    label: "Message Type",
    type: "select",
    options: messageType
  },
  {
    name: "userType",
    label: "User Type",
    type: "select",
    options: roleOptions,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    grid: "col-span-2",
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    grid: "col-span-2",
  },
  {
    name: "content",
    label: "Content",
    type: "textarea",
    grid: "col-span-2",
  },
];

const MessageForm: React.FC = () => {
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

export default MessageForm;
