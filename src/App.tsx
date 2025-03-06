import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './utils/queryClient';
import { SelectedRecipesProvider } from './context/SelectedRecipesContext';
import { Layout } from './components/Layout';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SelectedRecipesPage from './pages/SelectedRecipesPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SelectedRecipesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<RecipesPage />} />
              <Route path="recipe/:id" element={<RecipeDetailPage />} />
              <Route path="selected" element={<SelectedRecipesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SelectedRecipesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
