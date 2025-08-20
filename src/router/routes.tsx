import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrimaryLoader from "@/components/partials/loaders/Primary";

const Pokemon = lazy(() => import("@/components/pages/main/Pokemon"));
const PokemonDetails = lazy(() => import("@/components/pages/pokemons/PokemonDetails"));
const NotFound = lazy(() => import("@/components/pages/errors/404"));

const LoaderFallback = () => (
  <div className="flex justify-center items-center h-screen w-full">
    <PrimaryLoader overlay />
  </div>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoaderFallback />}>
        <Pokemon />
      </Suspense>
    ),
  },
  {
    path: "/pokemon/:id",
    element: (
      <Suspense fallback={<LoaderFallback />}>
        <PokemonDetails />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoaderFallback />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default routes;