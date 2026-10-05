import { useState } from "react";
import { Card, Form, Button, Table, Modal } from "react-bootstrap";

const dataUsers = [
  {
    name: "Haekal",
    email: "arhaekalb@gmail.com",
    password: "123456",
  },
  {
    name: "Blake",
    email: "arhaekalb@gmail.com",
    password: "123456",
  },
  {
    name: "Fryd",
    email: "arhaekalb@gmail.com",
    password: "123456",
  },
];
const ListUser = () =>
{
  const _initForm = {
    id: "null",
    name: "",
    email: "",
    password: "",
    status: "Active",
  }

  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(dataUsers);
  const [formData, setFormData] = useState(_initForm);

  const handleOpenModal = () =>
  {
    setShowModal(true);
  };

  const handleCloseModal = () =>
  {
    setShowModal(false);
  };

  const handleChange = (e) =>
  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const newUser = {
      ...formData,
      id: Date.now(),
    };

    setUsers([...users, newUser]);
    setShowModal(false);
  };

  return (
    <>
      <Card className="shadow-sm border-0">
        <Card.Body>
          <div className="d-flex justify-content=between align-items-center mb-3"></div>
          <h4 className="mb-0 fw-bold">ALL USER DATA'S</h4>
          <div align="right">
            <Button variant="primary mt-2 mb-2" onClick={handleOpenModal}>
              Create New User
            </Button>
          </div>
          <Table responsive hover className="align-midlle mb-0">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>Active</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}


            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Input Your Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter your name" required value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter your password" required value={formData.password} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};




export default ListUser;