import { create } from "zustand";
import { persist } from "zustand/middleware";

type AlertConfig = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type State = {
  alertOpen: boolean;
  alertConfig: AlertConfig | null;
};

type Actions = {
  updateAlertOpen: (is: boolean) => void;
  showAlert: (config: AlertConfig) => void;
};

type Store = State & Actions;

const useGlobalStore = create<Store>()(
  persist(
    (set) => ({
      alertOpen: false,
      alertConfig: null,

      updateAlertOpen: (is) =>
        set((state) => {
          state.alertOpen = is;
          if (!is) state.alertConfig = null;
        }),

      showAlert: (config) =>
        set((state) => {
          state.alertOpen = true;
          state.alertConfig = config;
        }),
    }),
    {
      name: "global-store",
      partialize: (state) => ({ alertConfig: state.alertConfig }), // only persist alertConfig
    }
  )
);

const alert = (config: AlertConfig) => {
  useGlobalStore.getState().showAlert(config);
};

export { useGlobalStore, alert };
