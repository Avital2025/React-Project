import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecipes } from "./RecipesStore";
import { AppDispatch, RootStore } from "../ReduxStore";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, List, ListItem, Card, CardContent, Link, Box } from "@mui/material";
import AddRecipeButton from "./AddRecipeButton";
import { Recipe } from "./RecipeType";

const RecipesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootStore) => state.recipes.recipes);
    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    return (
        <>
          

            <Container maxWidth="lg">
                <Box sx={{ display: "flex", flexDirection: "row", gap: 20, marginTop: '30px' }}>
                    <Box sx={{ flex: 1, pr: 2, minWidth: "300px" }}>
                        <List sx={{ gap: 0, display: "flex", flexDirection: "column" }}>
                            {recipes.map((r: Recipe) => (
                                <ListItem key={r.id} sx={{ justifyContent: "center", padding: "8px 0" }}>
                                    <Card sx={{ width: "100%", boxShadow: 3, borderRadius: 2, padding: 2 }}>
                                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                            <Typography variant="h6">
                                                <Link component={RouterLink} to={`/Recipe/${r.id}`} color="secondary" underline="hover">
                                                    {r.title}
                                                </Link>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ListItem>
                            ))}
                        </List>

                    </Box>
                    <Box sx={{ flex: 2, pl: 2, marginTop: '80px' }}>
                        <AddRecipeButton />
                    </Box>
                </Box>
            </Container>
        </>
    );
};
export default RecipesList;

