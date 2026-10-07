import { useState } from "react";
import { Card, Form, Button, Table } from "react-bootstrap";
import AppModal from "../../components/AppModal";

const Products = () =>
{
  const daftarProducts = [
    {
      id: 1,
      name: "nasi goreng",
      deskripsi: "nasi goreng enak",
      harga: 15000,
    },
    {
      id: 2,
      name: "nasi kebuli",
      deskripsi: "nasi kebuli enak",
      harga: 25000,
    },
  ];

  const _initForm = {
    id: null,
    name: "",
    deskripsi: "",
    harga: 0,
  };

  const [products, setProducts] = useState(daftarProducts);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = () =>
  {
    setFormData(_initForm); // Reset form data
    setIsEdit(false);
    setShowModal(true);
  };

  const handleChange = (e) =>
  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditModal = (product) =>
  {
    setFormData(product);
    setIsEdit(true);
    setShowModal(true);
  };

  // Fungsi hapus data yang sebelumnya hilang
  const handleDelete = (id) =>
  {
    window.confirm('Are you sure you want to delete this user?');
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    if (isEdit) {
      // Perbaikan: gunakan `: product` bukan `: products`
      setProducts(
        products.map((product) =>
          product.id === formData.id ? formData : product
        )
      );
    } else {
      const newProducts = {
        ...formData,
        id: Date.now(),
      };

      setProducts([...products, newProducts]);
    }

    setFormData(_initForm);
    setShowModal(false);
  };

  return (
    <>
      <Card className="shadow-sm border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3"></div>
          <h4 className="mb-0 fw-bold">ALL USER DATA'S</h4>
          <div align="right">
            <Button variant="primary" className="mt-2 mb-2" onClick={handleOpenModal}>
              Create New User
            </Button>
          </div>
          <Table responsive hover className="align-middle mb-0">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Deskripsi</th>
                <th>Harga</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.deskripsi}</td>
                  <td>{product.harga}</td>
                  <td>
                    <Button
                      onClick={() => handleEditModal(product)}
                      variant="warning"
                      size="sm"
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <AppModal
        show={showModal}
        onClose={handleCloseModal}
        title={isEdit ? "Edit User" : "Create New User"}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Save Changes" : "Save"}
      >
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            type="text"
            name="deskripsi"
            placeholder="Enter your deskripsi"
            required
            value={formData.deskripsi}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Harga</Form.Label>
          <Form.Control
            type="number"
            name="harga"
            placeholder="Enter your price"
            required
            value={formData.harga}
            onChange={handleChange}
          />
        </Form.Group>
      </AppModal>
    </>
  );
};

export default Products;