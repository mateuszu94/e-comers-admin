"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  OnClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  OnClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title="Czy jestes pewien "
      description="nie można cofnąć zmian"
      isOpen={isOpen}
      onClose={OnClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={OnClose}>
          Anuluj
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Kontynuuj
        </Button>
      </div>
    </Modal>
  );
};
