import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import api from "@/services/api.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormTransaction = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [cashAmount, setCashAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // GET ALL TRANSACTIONS
  const fetchProducts = async () => {
    try {
      const response = await api.get("/product");
      setProducts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      console.log("prev", prev);
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) return prev;
        return prev.map((item) => {
          return item.id === product.id ? { ...item, qty: item.qty + 1 } : item;
        });
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  console.log("cart", cart);

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.qty + qty;
            return nextQty > 0 && nextQty <= item.stock
              ? { ...item, qty: nextQty }
              : item;
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    });
  };
  console.log("cart", cart);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_Active: parseInt(formData.is_Active, 10),
      };

      // HANDLE UPDATE
      if (isEdit) {
        await api.put(`/user/${formData.id}`, payload);
      } else {
        await api.post("/user", payload);
      }
      setFormData(_initForm);
    } catch (error) {
      const errMsg = error.message;
      console.log(errMsg);
    } finally {
      fetchTransaction();
      setShowModal(false);
    }
  };

  // DELETE USER

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you sure want to delete this data?",
    );
    if (confirmation) {
      await api.delete(`/user/${id}`);
      fetchTransaction();
    }
  };

  const TAX_RATE = 0.1;
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  //acc= accumulator
  const tax = Math.round(totalAmount * TAX_RATE);
  const total = totalAmount + tax;

  // Hitung kembalian jika menggunakan CASH, jika tidak isi dengan 0
  const change = paymentMethod === "CASH" ? Number(cashAmount) - total : 0;

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const payload = {
        order_number: Date.now(),
        payment_method: paymentMethod === "CASH" ? 2 : 1,
        items: cart.map((item) => ({
          product_id: item.id,
          qty: item.qty,
          price: item.price,
        })),
        subtotal: totalAmount,
        pay: paymentMethod === "CASH" ? cashAmount : total, // Jika QRIS langsung bayar pas sesuai total
        tax: tax,
        total: total,
      };

      console.log(payload)

      const response = await api.post("/transaction", payload);
      console.log(response)
    
      if (!response.status) {
        alert(response.message || "Failed process transaction");
        return;
      }

      if (
        (paymentMethod === "QRIS" && response.payment_gateway?.redirect_url)
      ) {
        window.location.href = response.payment_gateway.redirect_url;
        return;
      }

      navigate("/transaction/print");
    } catch (error) {
      console.log("error transaction order", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. Main Grid Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        {/* 2. SHARED HEADER ROW: Keeps text perfectly inline */}
        <div className="lg:col-span-8 px-1">
          <h2 className="text-sm font-semibold text-foreground">
            Available Products
          </h2>
        </div>
        <div className="lg:col-span-4 px-1 hidden lg:block">
          {/* hidden lg:block ensures it aligns properly on desktop screens */}
          <h2 className="text-sm font-semibold text-foreground">
            Summary Cart
          </h2>
        </div>

        {/* 3. NEW TRANSACTION BOX: Wider layout (8 of 12 columns) */}
        <div className="lg:col-span-8 space-y-3">
          {/* Removed CardHeader from inside the card */}
          <Card className="border border-border/80 shadow">
            <CardContent className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[620px]">
              {products.map((item) => (
                <button
                  onClick={() => addToCart(item)}
                  key={item.id}
                  className="flex flex-col justify-between p-3.5 rounded-lg border border-border/80 bg-card hover:border-primary/60 text-left transition-all group"
                >
                  <div>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {item.category_name}
                    </span>
                    <h4 className="font-semibold text-sm line-clamp-1 mt-0.5 group-hover:text-primary">
                      {item.name}
                    </h4>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-medium text-xs">
                        {Number(item.price).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        100
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 4. SUMMARY CART BOX: Smaller layout (4 of 12 columns) */}
        <div className="lg:col-span-4">
          {/* Mobile visible title context if screen stacks vertically */}
          <h2 className="text-sm font-semibold text-foreground mb-2 lg:hidden">
            Summary Cart
          </h2>

          {/* Removed CardHeader from inside the card */}
          <Card className="border border-border/80 shadow">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3 overflow-y-auto divide-y divide-border/60">
                {cart.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex-1 pr-2">
                        <p className="font-medium text-xs">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {Number(item.price).toLocaleString(`id-ID`)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 pt-3">
                      <Button
                        onClick={() => updateQty(item.id, -1)}
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0 text-xs"
                      >
                        -
                      </Button>
                      <span className="w-6 text-center text-xs font-mono font-medium">
                        {item.qty}
                      </span>
                      <Button
                        onClick={() => updateQty(item.id, 1)}
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0 text-xs"
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => removeItem(item.id)}
                        variant="outline"
                        size="sm"
                        className="h-6 w-6 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                      >
                        x
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="space-y-1">
                  <Label className="text-sm">Payment Method</Label>
                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <SelectTrigger id="payment" className="h-8 text-xs w-full">
                      <SelectValue placeholder="Select One" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CASH">CASH</SelectItem>
                      <SelectItem value="QRIS">QRIS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {paymentMethod === "CASH" && (
                  <div className="space-y-1">
                    <Label className="text-xs">Pay</Label>
                    <Input
                      className="h-8 text-xs"
                      id="cash"
                      type="number"
                      placeholder="Enter the cash value"
                      size="sm"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                    ></Input>
                  </div>
                )}

                <div className="flex justify-between font-semibold text-sm">
                  <span>Subtotal</span>
                  <span>
                    {Number(totalAmount).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-sm">
                  <span>Tax (10%)</span>
                  <span>
                    {Number(tax).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-sm">
                  <span>Total</span>
                  <span>
                    {Number(total).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Change</span>
                  <span>
                    {" "}
                    {Number(change).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Button
                onClick={handleCheckout}
                className="w-full text-xs font-semibold"
              >
                {loading ? "Loading..." : "Save Transaction"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FormTransaction;