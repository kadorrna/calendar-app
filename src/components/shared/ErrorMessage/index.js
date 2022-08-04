import { ErrorMessage as FormikErrorMessage } from "formik";

const ErrorMessage = ({ fieldError }) => (
  <FormikErrorMessage name={fieldError}>
    {(msg) => <div style={{ color: "red", textAlign: "left" }}>{msg}</div>}
  </FormikErrorMessage>
);

export default ErrorMessage;
