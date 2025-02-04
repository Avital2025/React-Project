import { useForm } from "react-hook-form";
import { object, string, array } from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../ReduxStore";
import { addRecipe, fetchRecipes } from "./RecipesStore";
import {Box, Button, Container,  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography,
} from "@mui/material";
import { Recipe } from "./RecipeType";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = object<Recipe>().shape({
    title: string().required("Title is required").min(3, "Title must be at least 3 characters"),
    description: string().required("Description is required").min(5, "Description must be at least 5 characters"),
    ingredients: array().of(string().required("Ingredient is required")),
    instructions: string().required("Instructions are required").min(5, "Instructions must be at least 5 characters"),
});
const AddRecipeForm = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {  formState: { errors }, register, handleSubmit, reset, setValue, watch } = useForm<Recipe>({
        resolver: yupResolver(schema),
        defaultValues: { ingredients: [] }
    });
    const ingredients = watch("ingredients")|| []; 
    const addIngredient = () => {
        setValue("ingredients", [...ingredients, ""]); 
    };
    const removeIngredient = (index: number) => {
        setValue("ingredients", ingredients.filter((_, i) => i !== index));
    };
    const onSubmit = async (data: Recipe) => {
        const newRecipe = {
            ...data,
            ingredients: data.ingredients?.map((ingredient) => ingredient),
            
        };
        await dispatch(addRecipe(newRecipe));
        dispatch(fetchRecipes());
        reset();
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add a New Recipe</DialogTitle>
            <DialogContent>
                <Container>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Title"
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Description"
                            {...register("description")}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>Ingredients</Typography>
                        {ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index] = e.target.value;
                                        setValue("ingredients", newIngredients);
                                    }}
                                />
                                <button type="button" onClick={() => removeIngredient(index)}>מחק</button>
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient}>הוסף מצרך</button>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            label="Instructions"
                            {...register("instructions")}
                            error={!!errors.instructions}
                            helperText={errors.instructions?.message}
                        />
                    </Box>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">Add Recipe</Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddRecipeForm;