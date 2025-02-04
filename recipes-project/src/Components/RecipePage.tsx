import { Box, Typography } from "@mui/material";
import RecipesList from "./RecipesList";
import ShowRecipe from "./ShowRecipe";  

const RecipePage = () => {
  return (
    <Box>

      <h1>ברוכים הבאים לספר המתכונים שלי 😍 </h1>
      <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
        להצגת מתכון, בחרו אחד מהרשימה. אל תשכחו לספר איך היה!
      </Typography>


      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box flex={1} p={2} mr={1}>
          < RecipesList />
        </Box>
        <Box flex={1} p={2} ml={1}>
          <ShowRecipe />
        </Box>
      </Box>
    </Box>
  );
};

export default RecipePage;
