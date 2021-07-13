import { Formik, Form, Field } from "formik";
import { object, string } from "yup";

import "./index.scss";

const EditSchema = object().shape({
  nome: string().required("Campo obrigatório"),
  codigo: string().required("Campo obrigatório"),
  tipo: string().required("Campo obrigatório"),
  valor: string().required("Campo obrigatório"),
  estoque: string().required("Campo obrigatório"),
});

const FormProduct = ({ product, saveProduct, btnRef }) => {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={EditSchema}
        onSubmit={(values, { resetForm }) => {
          saveProduct(values, resetForm);
        }}
      >
        {({ handleSubmit, errors }) => (
          <>
            <Form>
              <div className="wrapper-form">
                <div className="field">
                  <label>Nome</label>
                  <Field type="text" name="nome" />
                  {errors.nome}
                </div>
                <div className="field">
                  <label>Código</label>
                  <Field type="text" name="codigo" />
                  {errors.codigo}
                </div>
                <div className="field">
                  <label>Tipo</label>
                  <Field type="text" name="tipo" />
                  {errors.tipo}
                </div>
                <div className="field">
                  <label>Valor</label>
                  <Field type="number" name="valor" />
                  {errors.valor}
                </div>
                <div className="field">
                  <label>Estoque</label>
                  <Field type="number" name="estoque" />
                  {errors.estoque}
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

export default FormProduct;
