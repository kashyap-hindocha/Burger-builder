import { useContext } from 'react';
import classes from "./Cart.module.css";
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

const Cart = props => {
  const cartCtx = useContext(CartContext);
  
  const totalAmount = `$${cartCtx.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandlder = (id) => {};
  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1});
  };

  const cartitems = <ul className={classes['cart-items']}>
    {cartCtx.items.map((item) => {
    return <CartItem 
      key={item.id} 
      name={item.nane} 
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandlder.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
      >{item.name}</CartItem>
  })}</ul>;

  return(
   <Modal onClose={props.onClose}>
    {cartitems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hasItems && <button className={classes.button} type="button">Order</button>}
    </div>
   </Modal>
  );
}
export default Cart;