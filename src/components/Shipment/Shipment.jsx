import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: data,
    };

    fetch('http://localhost:4000/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder()
          alert('Your order placed successfully.');

        }
      });
  };

  console.log(watch('example'));

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input
        name='name'
        defaultValue={loggedInUser.name}
        ref={register({ required: true })}
        placeholder='Your name'
        className='ship-form-input'
      />
      {errors.name && <span className='error'>Name is required</span>}
      <input
        name='email'
        defaultValue={loggedInUser.email}
        ref={register({ required: true })}
        placeholder='your email'
        className='ship-form-input'
      />
      {errors.email && <span className='error'>Email is required</span>}
      <input
        name='phone'
        ref={register({ required: true })}
        placeholder='Phone number'
        className='ship-form-input'
      />
      {errors.phone && <span className='error'>Phone number is required</span>}
      <input
        name='address'
        ref={register({ required: true })}
        placeholder='Your address'
        className='ship-form-input'
      />
      {errors.address && <span className='error'>Address is required</span>}
      <input type='submit' className='ship-form-input' />
    </form>
  );
};

export default Shipment;
