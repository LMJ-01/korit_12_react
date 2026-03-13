import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";

export default function Carlist() {

    const queryClient = useQueryClient();
    const [ open, setOpen ] = useState(false);

    const columns : GridColDef[] = [
        {field : 'brand', headerName : 'Brand', width : 200, },
        {field : 'model', headerName : 'Model', width : 200, },
        {field : 'color', headerName : 'Color', width : 200, },
        {field : 'registrationNumber', headerName : 'RegistrationNumber', width : 200, },
        {field : 'modelYear', headerName : 'ModelYear', width : 200, },
        {field : 'price', headerName : 'Price', width : 200, },
        {
            field: 'delete',
            headerName: '',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button 
                    onClick={() => {
                        if(confirm(`${params.row.brand}의 ${params.row.color} ${params.row.model}을 삭제하시겠습니까?`)) {
                            mutate(params.row._links.self.href)
                        }    
                    }}
                    >
                        Delete
                    </button>
            )
        }
    ]
    
    const { data, error, isSuccess } = useQuery({
        queryKey: ['cars'],
        queryFn: getCars
    });

    const { mutate } = useMutation(deleteCar, {
        onSuccess: () => {
            setOpen(true)
            queryClient.invalidateQueries({ queryKey: [ 'cars' ]});
        },
        onError: err => {
            console.log(err);
        }
    })

    if(!isSuccess) {
        return <span>Looding... ⏱️</span>
    }
    else if (error) {
        return <span>자동차 데이터를 가져오던 중 오류가 발생했습니다... 😒</span>
    }
    else {
        return(
            <>
                <AddCar />
                <DataGrid 
                    rows={data}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row._links.self.href}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message='해당 차량 정보가 삭제되었습니다. 🚗'
                />
            </>
        )
    }
}