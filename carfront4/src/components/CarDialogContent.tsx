// CarDialogContent.tsx
import { Car } from "../types";
import { DialogContent, TextField, Stack } from "@mui/material";

type DialogFormProps = {
    car: Car;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CarDialogContent( {car, handleChange } : DialogFormProps) {

    return(
        <>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                <TextField type="text" label="Brand" name="brand" value={car.brand} onChange={handleChange} />

                <TextField type="text" label="Model" name="model" value={car.model} onChange={handleChange}/>

                <TextField type="text" label="Color" name="color" value={car.color} onChange={handleChange}/>

                <TextField type="text" label="RegistrationNumber" name="registrationNumber" value={car.registrationNumber} onChange={handleChange} />

                <TextField type="number" label="ModelYear" name="modelYear" value={car.modelYear} onChange={handleChange}/>

                <TextField type="number" label="Price" name="price" value={car.price} onChange={handleChange}/>
                </Stack>

            </DialogContent>
        </>
    );
}