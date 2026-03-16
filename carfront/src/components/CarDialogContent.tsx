// CarDialogContent.tsx
import { Car } from "../types";
import { DialogContent } from "@mui/material";

type DialogFormProps = {
    car: Car;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CarDialogContent( {car, handleChange } : DialogFormProps) {

    return(
        <>
            <DialogContent>
                <input type="text" placeholder="Brand" name="brand" value={car.brand} onChange={handleChange} /><br />

                <input type="text" placeholder="Model" name="model" value={car.model} onChange={handleChange}/><br />

                <input type="text" placeholder="Color" name="color" value={car.color} onChange={handleChange}/><br />

                <input type="text" placeholder="RegistrationNumber" name="registrationNumber" value={car.registrationNumber} onChange={handleChange} /><br />

                <input type="number" placeholder="ModelYear" name="modelYear" value={car.modelYear} onChange={handleChange}/><br />

                <input type="number" placeholder="Price" name="price" value={car.price} onChange={handleChange}/><br />

            </DialogContent>
        </>
    );
}