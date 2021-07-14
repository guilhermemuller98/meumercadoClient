import { useEffect, useRef, useState } from "react";
import FormProduct from "../../components/FormProduct";

import "./index.scss";

import api from "../../service/api";

const initProduct = {
  id: "",
  nome: "",
  codigo: "",
  tipo: "",
  valor: 0,
  estoque: 0,
};

const ProductsPage = () => {
  const [error, setError] = useState(undefined);
  const [search, setSearch] = useState("");
  const [productForEdit, setProductForEdit] = useState(undefined);
  const [products, setProducts] = useState([]);

  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const fetchProducts = async () => {
    const { data } = await api.get("/product");

    setProducts(data.entities);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (search) {
        const filteredProducts = products.filter((product) => {
          return (
            product.nome
              .toLocaleUpperCase()
              .includes(search.toLocaleUpperCase()) ||
            product.tipo
              .toLocaleUpperCase()
              .includes(search.toLocaleUpperCase())
          );
        });

        setProducts(filteredProducts);
      } else {
        fetchProducts();
      }
    }, 500);
    return () => {
      clearTimeout(delaySearch);
    };
  }, [search]);

  const isValidUser = () => {
    const resultado = window.prompt("Digite sua senha");
    if (!resultado) {
      alert("Senha incorreta");
      return false;
    }

    if (resultado?.toString().toLocaleLowerCase() !== "admin") {
      alert("Senha incorreta");
    } else {
      return true;
    }
  };

  const saveProduct = async (values) => {
    if (isValidUser()) {
      try {
        if (!values.id) {
          await api.post("/product", values);
        } else {
          await api.put(`/product/${values.id}`, values);
        }

        setError(undefined);
        fetchProducts();
        setProductForEdit(undefined);
        alert("Produto salvo com sucesso");
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  const deleteProduct = async (productId) => {
    if (isValidUser()) {
      await api.delete(`/product/${productId}`);
      fetchProducts();
    }
  };

  const editProduct = (productId) => {
    const product = products.find((product) => product.id === productId);

    setProductForEdit(product);
  };

  return (
    <>
      <div className="wrapper">
        <div className="search">
          <label>Procurar</label>
          <input
            type="text"
            onChange={(event) => setSearch(event.target.value)}
            value={search}
          />
        </div>
        <FormProduct
          product={productForEdit || initProduct}
          btnRef={btnRef}
          saveProduct={saveProduct}
        />
        <button onClick={saveProductClick}>salvar</button>
      </div>

      <div className="error">
        {Array.isArray(error)
          ? error.map((err) => {
              return err;
            })
          : error}
      </div>

      <div className="wrapper-table">
        {products.length === 0 ? (
          "Nenhum produto cadastrado"
        ) : (
          <table>
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>NOME</th>
                <th>TIPO</th>
                <th>VALOR</th>
                <th>ESTOQUE</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.codigo}</td>
                    <td>{product.nome}</td>
                    <td>{product.tipo}</td>
                    <td>{product.valor}</td>
                    <td>{product.estoque}</td>
                    <td>
                      <div>
                        <button onClick={() => deleteProduct(product.id)}>
                          excluir
                        </button>
                        <button onClick={() => editProduct(product.id)}>
                          editar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
