import React, {StrictMode} from "react";
import ReactDOM, {createRoot} from "react-dom/client";
import { store } from "./Usuarios/store.js";
import { Provider } from "react-redux";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}> {/* Envuelve App con Provider */}
          <App />
      </Provider>
  </StrictMode>,
)
