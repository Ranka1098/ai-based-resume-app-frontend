import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";

import { FormProvider } from "./context/FormContext";
import store from "./redux-store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <FormProvider>
        <App />
      </FormProvider>
    </Provider>
  </StrictMode>
);
