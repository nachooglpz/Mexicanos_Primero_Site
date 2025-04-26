import React, {StrictMode} from "react";
import ReactDOM, {createRoot} from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";

import App from './app/app'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}> {/* Envuelve App con Provider */}
          <App />
      </Provider>
  </StrictMode>,
)
