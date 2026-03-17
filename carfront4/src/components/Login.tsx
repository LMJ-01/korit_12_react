import axios from "axios";
import { useState } from "react";
import { Button, TextField, Stack, Snackbar } from "@mui/material";
import Carlist from "./Carlist";


type User = {
  username: string;
  password: string;
}

export default function Login() {

    const [ open, setOpen ] = useState(false);

    const [user, setUser ] = useState<User>({
        username: '',
        password: ''
    });
    const [ isAuthenticated, setAuth ] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [event.target.name ] : event.target.value});
    }
    
    
    const handleLogin = async () => {
        // 템플릿 리터럴도 안 쓰고 하겠습니다.
        axios.post(import.meta.env.VITE_API_URL + '/login', user, {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            const jwtToken = res.headers.authorization;
            if(jwtToken !== null && jwtToken !== undefined) {
                localStorage.setItem('jwt', jwtToken);
                setAuth(true);
            }
        })
        .catch(() => setOpen(true)) // 일부로 err => console.err(err); 에서 이렇게 바꿨습니다.
    };

    const handleLogout = () => {
        setAuth(false);
        localStorage.setItem('jwt', '');
    }

    if(isAuthenticated) {
        return <Carlist logout={handleLogout}/>;
    }
    else {
        return(
            <>
            <Snackbar 
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message='ID 혹은 비밀번호가 틀렸습니다.'
            />
            <Stack spacing={2} alignItems='center' mt={2}>
            <TextField name='username' label='Username' onChange={handleChange}></TextField>
            <TextField name='password' label='Password' onChange={handleChange}></TextField>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleLogin}
            >LOGIN</Button>
            </Stack>
        </>
        );
    }
}