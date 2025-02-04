import React, { useContext } from 'react';
import AddRecipeForm from './AddRecipeForm';
import { IsLogin } from '../App';

const AddRecipeButton = () => {
  const [isLogin] = useContext(IsLogin)
  const [showForm, setShowForm] = React.useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <>
      {isLogin &&
      <>
        <button onClick={handleClick}>Add Recipe</button>
       {showForm && <AddRecipeForm open={showForm} onClose={() => setShowForm(false)} />}
        </>
      }
    </>
  );
};

export default AddRecipeButton;