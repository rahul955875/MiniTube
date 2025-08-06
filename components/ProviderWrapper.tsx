"use client";

import ThemeRegistry from "@/app/ThemeRegistray";
import { store } from "@/store";
import { Provider } from "react-redux";

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </Provider>
  );
};

export default ProviderWrapper;
