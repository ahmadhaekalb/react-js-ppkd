import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/AppModal";
import { Label } from "@/components/ui/label";
import api from "@/services/api.js";
import
{
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const ProductPage = () =>
{
    const _initForm = {
        id: null,
        category_id: "",
        name: "",
        price: "",
        stock: "",
        description: "",
        is_active: 1,
    };

    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState(_initForm);
    const [isEdit, setIsEdit] = useState(false);
    const fetchProducts = async () =>
    {
        try {
            const response = await api.get("/product");
            // ini di liat dari BE, jadi kalo di sebut di const api itu di ambil dari data yg ada di BE.
            setProducts(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    console.log(products);
    const fetchCategories = async () =>
    {
        try {
            const response = await api.get("/category");
            setCategories(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() =>
    {
        fetchProducts();
        fetchCategories();
    }, []);

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

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                category_id: formData.category_id,
                price: formData.price,
                description: formData.description,
                stock: formData.stock,
                is_active: parseInt(formData.is_active),
            };
            if (isEdit) {
                // update data =
                await api.put(`/product/${formData.id}`, payload);
                // setproducts(products.map((user) => (user.id === formData.id ? formData : user)));
            } else {
                // update data
                await api.post("/product", payload);
                // const newUser = {
                //     ...formData,
                //     id: Date.now(),
                // };
                // setproducts([...products, newUser]);
            }
            setFormData(_initForm);
            await fetchProducts();

        } catch (error) {
            const errMsg = error.message;
            console.log(errMsg);
        } finally {
            setShowModal(false);
        }
        // jika mau edit data 
    };

    const handleDelete = async (id) =>
    {
        const confirmation = window.confirm("Are you sure want to delete this data?");
        if (confirmation) {
            // delete
            await api.delete(`/product/${id}`);
            fetchProducts();
            // setproducts(products.filter((u) => u.id !== id));
        }
        // filter : products
    };

    return (
        <>
            <Card className="shadow-sm border border-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5">
                    <div>
                        <CardTitle className="text-xl font-bold">Data Product</CardTitle>
                    </div>
                    <Button className="bg-pink-800" onClick={handleOpenModal}>Create New Product</Button>
                </CardHeader>
                <CardContent className="p-0">
                    {/* <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h4 className="mb-0 fw-bold">Data Product</h4>
                        </div>
                    </div> */}
                    <table className="w-full text-left text-sm">
                        <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">#</th>
                                <th className="px-6 py-3 font-medium">Nama</th>
                                <th className="px-6 py-3 font-medium">Category</th>
                                <th className="px-6 py-3 font-medium">Price</th>
                                <th className="px-6 py-3 font-medium">Stock</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {products.length > 0 ? (
                                products.map((row, index) => (
                                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                                        <td>{row.name}</td>
                                        <td>{row.category_name}</td>
                                        <td>{row.price}</td>
                                        <td>{row.stock}</td>
                                        <td>
                                            <span className={`border p-2 rounded-lg px-6 ${row.is_active === 1 ? "bg-green-600" : "bg-red-600"}  text-white`}>{row.is_active === 1 ? "Active" : "In-Active"}
                                            </span></td>
                                        <td className="px-4 py-6 text-right whitespace-nowrap">
                                            <Button onClick={() => handleEditModal(row)} size="sm" className="me-2 border-2 border-black rounded-sm bg-yellow-300 text-black">Edit</Button>
                                            <Button onClick={() => handleDelete(row.id)} variant="destructive" size="sm" className="me-2 border border-red-600 rounded-sme">Delete</Button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-muted">
                                        Belum ada Data Transaction
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardContent>
            </Card>



            <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit User" : "Create New Product"}
                onSubmit={handleSubmit} submitLabel={isEdit ? 'Save Change' : 'Save'}
            >
                {/* cara pertama */}
                {/* <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input id="name" name="name"value={formData.name} onChange={handleChange} required placeholder="Enter your name"></Input>
                    </div>
                    <div className="space-y-2">
                        <Label>email</Label>
                        <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email></Input>
                    </div>
                    <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password"/>
                    </div>
                </div> */}


                {/* cara kedua */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={formData.category_id} onValueChange={(val) => setFormData({ ...formData, category_id: val })} required>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select On.." />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category, index) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input type="text" name="name"
                            placeholder="Enter your name" required
                            value={formData.name} onChange={handleChange}></Input>
                    </div>
                    <div className="space-y-2">
                        <Label>Price</Label>
                        <Input type="number" id="price" name="price"
                            placeholder="Enter your price" required
                            value={formData.price} onChange={handleChange}></Input>
                    </div>
                    <div className="space-y-2">
                        <Label>Stock</Label>
                        <Input type="number" id="stock" name="stock"
                            placeholder="Enter your stock" required={isEdit ? false : true}
                            value={formData.password} onChange={handleChange}></Input>
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Input type="text" id="description" name="description"
                            placeholder="Enter your description" required={isEdit ? false : true}
                            value={formData.password} onChange={handleChange}></Input>
                    </div>
                </div>
                {isEdit ? (
                    <div className="space-y-2">
                        <Label>Activation</Label>
                    </div>
                ) : (
                    ""
                )}
                <div className="space-y-2">
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="">Select One</option>
                        <option value="Active">Publish</option>
                        <option value="In Active">Draft</option>
                    </select>
                </div>
            </AppModal>



        </>
    );
};

export default ProductPage;