import { Container, AppBar, Toolbar, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import AddItem from './components/AddItem.tsx';
import './App.css'

export type Item = {
  product : string;
  amount : string;
  price : number;
}

function App() {
  const [ items, setItems ] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([item, ...items]);


  }

  return (
    <>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              shopping List
            </Typography>
          </Toolbar>
        </AppBar>
        <AddItem addItem={addItem} />
        <List>
          {
            items.map((item, index) => 
              <ListItem key={index} divider>
                  <ListItemText 
                    primary={item.product}
                    secondary={
                      `수량 ${item.amount} /
                      가격 ${item.price} 원`}
                    
                  />
              </ListItem>
            )
          }
        </List>

      </Container>
    </>
  )
}

export default App
