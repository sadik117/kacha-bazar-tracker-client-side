import { useEffect, useRef} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../components/hooks/UseAxiosSecure";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const productId = params.get("productId");
  const email = params.get("email");
  const sessionId = params.get("sessionId");

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const hasSavedRef = useRef(false); //  Important to prevent duplicate calls

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const res = await axiosSecure.post("/save-order", {
          productId,
          userEmail: email,
          sessionId,
        });

        if (res.data.insertedId) {
          toast.success("Order successfully placed!");
        } else {
          toast.info("Order already exists.");
        }
      } catch {
        toast.error("Failed to save order.");
      } finally {
        setTimeout(() => navigate("/dashboard/my-orders"), 3000);
      }
    };

    if (productId && email && sessionId && !hasSavedRef.current) {
      hasSavedRef.current = true; //  Prevent re-entry
      saveOrder();
    }
  }, [productId, email, sessionId, axiosSecure, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-2xl font-bold text-green-600">
          🎉 Payment Successful!
        </h2>
        <p className="mt-2 text-gray-600">Redirecting to your orders...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
