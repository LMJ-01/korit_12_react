import { Car } from "../types";
import { DialogContent, TextField } from "@mui/material";

type DialogFormProps = {
    car: Car;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CarDialogContent({ car, handleChange }: DialogFormProps) {
    return (
        <>
            <DialogContent>
                <TextField label="Brand" name="brand" value={car.brand} onChange={handleChange} /><br />

                <TextField label="Model" name="model" value={car.model} onChange={handleChange} /><br />

                <TextField label="Color" name="color" value={car.color} onChange={handleChange} /><br />

                <TextField label="RegistrationNumber" name="registrationNumber" value={car.registrationNumber} onChange={handleChange} /><br />

                <TextField type="number" label="ModelYear" name="modelYear" value={car.modelYear} onChange={handleChange} /><br />

                <TextField type="number" label="Price" name="price" value={car.price} onChange={handleChange} /><br />
            </DialogContent>
        </>
    );
}