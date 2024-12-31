import React, { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    // timeout  5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-md ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      <p>{message}</p>
      <button onClick={onClose} className="absolute top-1 right-1 text-white">
        &times;
      </button>
    </div>
  );
};
