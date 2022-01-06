import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import randomInteger from 'random-int';

import PageHeading from '../components/PageHeading/PageHeading';
import ProductList from 'components/ProductList/ProductList';
import AddButton from 'components/AddButton/AddButton';
import Modal from 'components/Modal/Modal';
import { addProduct, sortByName, sortByPrice } from 'store/actions/products';
import { fetchProducts } from '../store/actions/productsOperations';
import s from './HomeView.module.css';

export default function HomeView() {
  const products = useSelector(state => state.products);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [label, setLabel] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.productsReducer.length > 0) {
      return;
    }
    dispatch(fetchProducts());
    return () => {};
  }, []);

  const modalSubmit = e => {
    e.preventDefault();
    const product = {
      id: randomInteger(1000, 20000),
      image_link: image,
      name: label,
      description: description,
      price: price,
    };
    dispatch(addProduct(product));

    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setImage('');
    setPrice('');
    setImage('');
    setLabel('');
    setDescription('');
  };

  const selectChange = e => {
    console.log(e.target.value);
    if (e.target.value === 'alphabet') {
      dispatch(sortByName());
      return;
    }
    if (e.target.value === 'price') {
      dispatch(sortByPrice());
    }
  };

  return (
    <>
      <PageHeading text="Product list" />
      <AddButton onClick={toggleModal} text="Add product" />
      <select onChange={selectChange}>
        <option value="alphabet">Alphabet</option>
        <option value="price">Price</option>
      </select>
      <ProductList />

      {showModal && (
        <Modal>
          <form className={s.modalForm} onSubmit={modalSubmit}>
            <label className={s.modalLabel}>
              Name
              <input
                className={s.modalInput}
                type="text"
                autoFocus
                placeholder="Name"
                value={label}
                required
                onChange={e => setLabel(e.target.value)}
              />
            </label>
            <label className={s.modalLabel}>
              Image URL
              <input
                className={s.modalInput}
                type="url"
                autoFocus
                placeholder="Enter image url"
                value={image}
                required
                onChange={e => setImage(e.target.value)}
              />
            </label>
            <label className={s.modalLabel}>
              Price
              <input
                className={s.modalInput}
                type="number"
                autoFocus
                placeholder="Price"
                value={price}
                required
                onChange={e => setPrice(e.target.value)}
              />
            </label>
            <label className={s.modalLabel}>
              Description
              <input
                className={s.descriptionInput}
                type="text"
                autoFocus
                placeholder="Description"
                value={description}
                required
                onChange={e => setDescription(e.target.value)}
              />
            </label>
            <div className={s.modalButtonContainer}>
              <button type="submit" className={s.modalButton}>
                <span>Add product</span>
              </button>
              <button
                type="button"
                className={s.modalButton}
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
