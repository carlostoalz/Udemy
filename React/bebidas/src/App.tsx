import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import CategoriasProvider from './context/CategoriasContext';
import RecetasProvider from './context/RecetasContext';
import IngredientesProvider from './context/IngredientesContext';
import Recetas from './components/Recetas';
import ModalProvider from './context/ModalContext';

function App() {
  return (
    <IngredientesProvider>
      <CategoriasProvider>
        <RecetasProvider>
          <ModalProvider>
            <Header />
            <div className="container mt-5">
              <div className="row">
                <Formulario />
              </div>
              <Recetas />
            </div>
          </ModalProvider>
        </RecetasProvider>
      </CategoriasProvider>
    </IngredientesProvider>
  );
}

export default App;
