import { Formik, Form, Field } from "formik";
import { object, string } from "yup";

import "./index.scss";

const EditSchema = object().shape({
  password: string().required("Campo obrigatório"),
  email: string().required("Campo obrigatório"),
});

const FormLogin = ({ login, makeLogin, btnRef }) => {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={login}
        validationSchema={EditSchema}
        onSubmit={(values) => {
          console.log("values", values);
          makeLogin(values);
        }}
      >
        {({ handleSubmit, errors }) => (
          <>
            <Form>
              <div className="wrapper-form">
                <div className="field">
                  <label>Email</label>
                  <Field type="text" name="email" />
                  {errors.email}
                </div>
                <div className="field">
                  <label>Senha</label>
                  <Field type="text" name="password" />
                  {errors.password}
                </div>
              </div>

              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={handleSubmit}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default FormLogin;
