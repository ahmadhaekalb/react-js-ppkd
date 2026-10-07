// import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import AppModal from "@/components/AppModal";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dataUsers = [
  {
    id: 1,
    name: "a",
    email: "a",
    password: "a",
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
  };

  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState(dataUsers);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenModal = () =>
  {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  };

  const handleEditModal = (user) =>
  {
    setShowModal(true);
    setIsEdit(true);
    setFormData(user);
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

    //jika data diedit

    if (isEdit) {
      setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
    } else {
      const newUser = {
        ...formData,
        id: Date.now(),
      };

      setUsers([...users, newUser]);
      setFormData(_initForm);
    }
    setShowModal(false);
  };

  const handleDelete = (id) =>
  {
    window.confirm('Are you sure you want to delete this user?');
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardContent className="p-0">
          <div className="d-flex justify-content=between align-items-center mb-3">
            <h4 className="mb-0 fw-bold">ALL USER DATA'S</h4>
          </div>
          <div align="right">
            <Button variant="primary mt-2 mb-2" onClick={handleOpenModal}>
              Create New User
            </Button>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">No.</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user, index) =>
              {
                <tr key={index} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>Active</td>
                  <td className="px-4 py-6 text-right whitespace-nowrap">
                    <Button onClick={() => handleEditModal(user)} variant="warning" size="sm" className="me-2" >
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(user.id)} variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>;

              })}

            </tbody>
          </table>
        </CardContent>
      </Card>

      <AppModal open={show} onClose={handleCloseModal}
        title={isEdit ? "Edit User" : "Create New User"}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? 'Save Changes' : 'Save'}>

        {/* <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" required placeholder="Enter your name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" required placeholder="Enter your email" value={formData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" required placeholder="Enter your password" value={formData.password} onChange={handleChange} />
          </Form.Group>
        </Form> */}

      </AppModal>
      {/* <Modal show={showModal} onHide={handleCloseModal}>
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
      </Modal> */}


    </>
  );
};


export default ListUser;