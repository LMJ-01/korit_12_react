// components/AddItem.tsx
import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Item } from "../App";
// 4번 라인의 경우 전에는 types.ts에서 불러왔었습니다.

type AddItemProps = {
  addItem: (item: Item) => void;
}

export default function AddItem(props: AddItemProps) {
  const [ open, setOpen ] = useState(false);
  const [ item, setItem ] = useState<Item>({
    product: '',
    amount: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addItem = () => {
    props.addItem(item);    // 항목을 추가하는 상위 컴포넌트의 함수 addItem()
    // 그다음에 TextField value를 지울겁니다.
    setItem({product:'', amount:''});
    handleClose();
  }

  return (
    <>
      <Button onClick={handleOpen} variant="text">Add Item</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <TextField value={item.product} label='Product' margin="dense" fullWidth
            onChange={ e => setItem({...item, product: e.target.value})}
          />
          <TextField value={item.amount} label='Amount' margin="dense" fullWidth
            onChange={ e => setItem({...item, amount: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addItem}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}