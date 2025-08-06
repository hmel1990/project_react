import './App.css'
import {BrowserRouter, Routes, Route, NavLink, Link } from 'react-router';
import Navigation_bar from "./Components/Navigation_bar/Navigation_bar.jsx"
import Main_page from "./Components/Main_page/Main_page.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import About from "./Components/About/About.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from "./Components/QueryClientProvider/QueryClientProvider.jsx";
import ProductPage from "./Components/ProductPage/ProductPage.jsx";
import { Provider } from 'react-redux'
import { store, persistor } from './Components/Redux/StoreRedux.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import Cart from "./Components/Cart/Cart.jsx"




function App() {

  return (
    <>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Navigation_bar />
                        <Routes>
                            <Route path="/" element={<Main_page />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/product/:id" element={<ProductPage />} />
                            <Route path="*" element={<Main_page />} />
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
            </PersistGate>
        </Provider>

    </>
  )
}

export default App
