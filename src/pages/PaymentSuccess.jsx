import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../components/hooks/UseAxiosSecure";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const productId = params.get("productId");
  const email = params.get("email");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const res = await axiosSecure.post("/save-order", {
          productId,
          userEmail: email,
        });
        if (res.data.insertedId) {
          toast.success("✅ Payment successful and order saved!");
        } else {
          toast.error("⚠️ Payment success, but order not saved!");
        }
      } catch {
        toast.error("❌ Failed to save the order");
      }
    };

    if (productId && email) {
      saveOrder();
    }
  }, [productId, email, axiosSecure]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold text-green-600">🎉 Payment Successful!</h2>
        <p className="mt-2 text-gray-600">You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
