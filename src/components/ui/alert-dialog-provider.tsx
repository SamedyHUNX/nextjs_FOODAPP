import { useGlobalStore } from "@/lib/use-global-store";

const AlertDialogProvider = () => {
  const { alertConfig, alertOpen, updateAlertOpen } = useGlobalStore();

  if (!alertConfig) return null;

  const handleConfirm = () => {
    if (alertConfig?.onConfirm) {
      alertConfig.onConfirm();
    }
    updateAlertOpen(false);
  };

  const handleCancel = () => {
    if (alertConfig?.onCancel) {
      alertConfig.onCancel();
    }
    updateAlertOpen(false);
  };
};
