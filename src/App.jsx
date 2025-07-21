import { UserProvider, ShoppingCartProvider } from "@/context/";
import { AppRouter } from "@/routes/AppRouter";
import { Navbar, Footer } from "@/components/layout";
import { AppWrapper } from "./components/layout/AppWrapper";

export const App = () => {
  return (
    <UserProvider>
      <AppWrapper>
        <ShoppingCartProvider>
          <Navbar />
          <AppRouter />
          <Footer />
        </ShoppingCartProvider>
      </AppWrapper>
    </UserProvider>
  );
};
