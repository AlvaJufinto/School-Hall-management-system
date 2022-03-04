import { useState, useEffect, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdminOrderContext } from "./../context/AdminOrderContext";

const useSnackbar = ({ type, message }) => {
    const { isLoading: packetIsLoading, dispatch, order, packet, errorMessage } = useContext(AdminOrderContext);
    const [openSnackbar, setOpenSnackbar] = useState(errorMessage ? true : false);

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