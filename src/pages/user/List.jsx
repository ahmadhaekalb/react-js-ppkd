import { useState, useEffect } from "react";
import { Card, CardContent, /*CardDescription, CardFooter,*/ CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/AppModal";
import api from "@/services/api.js";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// const dataUsers = [
//   {
//     id: 1,
//     name: "Reza",
//     email: "ribrahim50@gmail.com",
//     password: 12345678,
//   },
//   {
//     id: 2,
//     name: "Budi",
//     email: "budi@gmail.com",
//     password: 12345678,
//   },
// ];

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
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);
  const fetchUser = async () =>
  {
    try {
      const response = await api.get("/user");
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() =>
  {
    fetchUser();
  }, []);

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

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_active: parseInt(formData.is_active),
      };
      if (isEdit) {

        await api.put(`/user/${formData.id}`, payload); // PUT <-- untuk update data
        // setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
      } else {
        await api.post("/user", payload); // POST <-- menulis/memasukkan data baru

        //   const newUser = {
        //     ...formData,
        //     id: Date.now(),
        //    };

        //   setUsers([...users, newUser]);
        // }
      }

      setFormData(_initForm);
    } catch (error) {
      const errMsg = error.message;
      console.log(errMsg);
    } finally {
      fetchUser();
      setShowModal(false);
    }



  };

  const handleDelete = async (id) =>
  {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      await api.delete(`/user/${id}`);
      fetchUser();
      // setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="">
            <CardTitle className="text-xl font-bold"> Data User</CardTitle>
          </div>
          <Button className="bg-green-800 text white" onClick={handleOpenModal}>Create New User</Button>
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
                <th className="px-6 py-3 font-medium">No/ID</th>
                <th className="px-6 py-3 font-medium">Nama</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors text-left">
                    <td className="py-4 px-6 whitespace-nowrap">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`border rounded-sm p-2 ${user.is_active === 1 ? "bg-green-800" : "bg-red-600"} text-white`}>{user.is_active === 1 ? "Active" : "Inactive"}</span>
                    </td>
                    <td className="px-4 py-6 text-right whitespace-nowrap">
                      <Button onClick={() => handleEditModal(user)} size="sm" className="me-2 border-2 border-black rounded-sm bg-yellow-300 text-black">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(user.id)} variant="destructive" size="sm" className="me-2 border border-red-600 rounded-sm">
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
              onChange={handleChange} required={isEdit ? false : true}
              placeholder="Enter Your Name"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange} required={isEdit ? false : true}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Your Email" />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange} required={isEdit ? false : true}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Your Password"
            />
          </div>

          <div>
              <Label> Activation </Label>
              <RadioGroup
                value={String(formData.is_active)}
                onValueChange={(val) =>
                  setFormData({ ...formData, is_active: parseInt(val) })
                }
                className="w-fit flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="inactive" />
                  <Label htmlFor="inactive">In-Active</Label>
                </div>
              </RadioGroup>
          </div>

          <br />

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