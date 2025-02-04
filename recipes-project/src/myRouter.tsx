import { createBrowserRouter } from "react-router";
import About from "./Components/About";
import Layout from "./Components/AppLayuot";
import Home from "./Components/Home";
import RecipePage from "./Components/RecipePage";


const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [

      { path: "recipesList", element: <RecipePage /> },
      { path: "about", element: <About /> },
      { path: "HomePage", element: <Home /> },
      { path:"/RecipeList", element:< RecipePage /> },
      { index: true, element: <Home /> },
      { path: 'Recipe/:id/', element: <RecipePage/>, errorElement: <>Error</> }  
],
  },
]);
export default myRouter;
