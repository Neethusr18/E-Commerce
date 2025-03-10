import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, children, className = "", onClose }) {
  const dialogRef = useRef();

  useEffect(() => {
    console.log("Modal open state:", open); 
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && onClose) {
        console.log("Escape key pressed! Closing modal...");
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

