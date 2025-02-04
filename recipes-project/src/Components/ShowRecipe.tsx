import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStore } from "../ReduxStore";
import { useTheme } from "@mui/material";

const ShowRecipe = () => {
  const theme = useTheme();
  const { id } = useParams();
  const recipes = useSelector((state: RootStore) => state.recipes.recipes);
  let recipe = id ? recipes.find(x => x.id === parseInt(id)) : null;

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '30px' }}>

        <div style={{ flex: 2 }}>
          <div
            style={{
              border: '2px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginTop: '45px',
              height: 'auto',
              width: '400px', 
              minHeight: '300px',
              
            }}       >
            <h2 style={{
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              paddingBottom: '10px'
            }}>
              Recipe Details
            </h2>
            {recipe ? (
              <div>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Loading recipe...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRecipe;
