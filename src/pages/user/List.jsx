import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/AppModal";
import { Label } from "@/components/ui/label";

const dataUsers = [
  {
    id: 1,
    name: "Reza",
    email: "ribrahim50@gmail.com",
    password: 12345678,
  },
  {
    id: 2,
    name: "Budi",
    email: "budi@gmail.com",
    password: 12345678,
  },
];

const ListUser = () =>
{
  const _initForm = {
    id: null,
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
    console.log(user);
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
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="">
            <CardTitle className="text-xl font-bold"> Data User</CardTitle>
          </div>
          <Button onClick={handleOpenModal}>Create New User</Button>
        </CardHeader>
        <CardContent>
          {/* <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Data User</h4>
            </div>
            <Button className="border-border " variant="primary" onClick={handleOpenModal}>
              Create New User
            </Button>
          </div> */}
          <table responsive hover className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td className="px-4 py-6 text-right whitespace-nowrap">
                      <Button onClick={() => handleEditModal(user)} variant="warning" size="sm" className="me-2">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(user.id)} variant="danger" size="sm" className="me-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    Belum ada data user
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AppModal
        show={showModal}
        onClose={handleCloseModal}
        title={isEdit ? "Edit User" : "Create New User"}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? "Save Change" : "Save"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 required"
              placeholder="Enter Your Name"
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* <div>
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select One</option>
              <option value="Active">Active</option>
              <option value="In Active">In Active</option>
            </select>
          </div> */}
        </div>
      </AppModal>
    </>
  );
};
export default ListUser;