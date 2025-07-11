import { useState } from "react";

const RejectionModal = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96 relative">
        <h3 className="text-lg font-bold mb-2">Rejection Feedback</h3>
        <textarea
          rows={4}
          placeholder="Reason for rejection..."
          className="textarea textarea-bordered w-full"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-sm btn-error" onClick={() => onSubmit(reason)} disabled={!reason}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
