import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { Car } from '../types';
import { useState } from "react";
import { addCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CarDialogContent from "./CarDialogContent";

export default function AddCar() {
    const queryClient = useQueryClient();

    const { mutate } = useMutation(addCar, {
        onSuccess : () => {
            queryClient.invalidateQueries(['cars']);
        },
        onError: err => console.log(err),
        });

    const [ open, setOpen ] = useState(false);
    const [ car, setCar ] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    });

    // 한줄 짜리라서 필요없을 것 같지만
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => setOpen(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name] : event.target.value})}

    const handleSave = () => {
       mutate(car);     //  얘가 carapi.ts에 있는 함수에 해당합니다.
       setCar({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
       });
       handleClickClose();
    }
  

    return(
        <>
            <Button onClick={handleClickOpen}>New Car</Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>New Car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}