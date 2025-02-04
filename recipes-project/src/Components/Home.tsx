import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        ברוכים הבאים לספר המתכונים שלכם! 🍽️✨
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        כאן תמצאו אוסף עשיר של מתכונים טעימים, מגוונים וקלים להכנה – מהמנות הקלאסיות האהובות ועד למתכונים חדשניים ומפתיעים.
        בין אם אתם בשלנים מנוסים או טבחים מתחילים, יש כאן משהו בשבילכם!
      </Typography>
      <Box sx={{ textAlign: "left", my: 3 }}>
        <Typography variant="h5">📌 מה מחכה לכם כאן?</Typography>
        <Typography variant="body1">✅ מתכונים פשוטים ומדויקים עם הוראות ברורות</Typography>
        <Typography variant="body1">✅ רעיונות למנות בריאות, קינוחים מפתיעים ועוד</Typography>
        <Typography variant="body1">✅ אפשרות לשמור את המתכונים האהובים עליכם</Typography>
      </Box>
      <Button variant="contained" color="primary" size="large" onClick={() => navigate("/RecipeList")}>
        התחילו לגלות מתכונים
      </Button>
    </Container>
  );
};

export default HomePage;
