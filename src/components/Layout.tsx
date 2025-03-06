import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelectedRecipesContext } from '../hooks/useSelectedRecipesContext';
import { useTheme } from '../hooks/useTheme';

export const Layout = () => {
  const location = useLocation();
  const { selectedRecipes } = useSelectedRecipesContext();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation header */}
      <header className="bg-base-200 shadow-md">
        <div className="container mx-auto p-4">         
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Recipe App</Link>
            <nav className="flex items-center gap-4">
              <Link 
                to="/" 
                className={`link ${location.pathname === '/' ? 'font-bold text-primary' : ''}`}
              >
                Recipes
              </Link>
              <Link 
                to="/selected" 
                className={`link ${location.pathname === '/selected' ? 'font-bold text-primary' : ''}`}
              >
                Selected Recipes
                {selectedRecipes.length > 0 && (
                  <span className="badge badge-primary ml-2">{selectedRecipes.length}</span>
                )}
              </Link>
              <button 
                className="btn btn-sm btn-circle" 
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-base-200 p-4 text-center">
        <div className="container mx-auto">
          <p>&#169; {new Date().getFullYear()} Recipe App - Frontend Developer Test Task</p>
        </div>
      </footer>
    </div>
  );
};
