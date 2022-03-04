import { useState, useEffect } from 'react';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const useSnackbar = ({ type, message }) => {
    const [openSnackbar, setOpenSnackbar] = useState(true);
    const navigate = useNavigate();

    // useEffect(() => {
    //     setOpenSnackbar(false)
    // }, [navigate])

    return ( 
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={e => setOpenSnackbar(false)}>
            <Alert 
                onClose={e => setOpenSnackbar(false)} severity={type} 
                sx={{ 
                    width: '100%', 
                    textTransform: 'capitalize',
                }}>
                {message}
            </Alert>
        </Snackbar>
     );
}
 
export default useSnackbar;