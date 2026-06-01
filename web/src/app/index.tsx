import { AuthProvider } from "./providers/auth";
import { QueryProvider } from "./providers/query";
import { AppRoutes } from "./providers/router";
import { BrowserRouter } from "react-router-dom";
import { UIProvider } from "./providers/ui-provider";

const App = () => {
  return (
    <BrowserRouter>
      <QueryProvider>
        <UIProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </UIProvider>
      </QueryProvider>
    </BrowserRouter>
  );
};

export default App;
