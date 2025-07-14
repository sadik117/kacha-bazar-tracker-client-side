import useAxiosSecure from "../../components/hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import AddProductForm from "./AddProductForm";
import { Helmet } from "react-helmet-async";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const defaultValues = {
    email: user?.email || "",
    vendorName: user?.displayName || "",
    marketName: "",
    date: new Date(),
    marketDescription: "",
    itemName: "",
    pricePerUnit: "",
    status: "pending",
    image: "",
    itemDescription: "",
    prices: [{ date: new Date(), price: "" }],
  };

  const onSubmit = async (data) => {
    try {
      data.date = data.date.toISOString().split("T")[0];
      data.prices = data.prices.map((p) => ({
        date: p.date.toISOString().split("T")[0],
        price: Number(p.price),
      }));
      data.pricePerUnit = Number(data.pricePerUnit);

      const res = await axiosSecure.post("/products", data);
      if (res.data.insertedId) {
        toast.success("Product added successfully!");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Helmet>
        <title>Vendor Dashboard || Add Product</title>
      </Helmet>{" "}
      <AddProductForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        isEdit={false}
      />
    </>
  );
};

export default AddProduct;
