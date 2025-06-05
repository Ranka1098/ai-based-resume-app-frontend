import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import store from "./redux-store/store";
import { FormProvider } from "./context/FormContext";

createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  <FormProvider>
    <App />
  </FormProvider>
  // </Provider>
);
