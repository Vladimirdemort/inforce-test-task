import PageHeading from '../components/PageHeading/PageHeading';
import React, { useState, useEffect } from 'react';
import ProductList from 'components/ProductList/ProductList';
import AddButton from 'components/AddButton/AddButton';
import Modal from 'components/Modal/Modal';
import { number } from 'prop-types';

export default function HomeView() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [label, setLabel] = useState('');

  const modalSubmit = e => {
    e.preventDefault();
    console.log();
    const newProduct = {
      food: {
        foodId: Date.now(),
        image: image,
        label: label,
        description: description,
      },
    };
    setProducts(products.push(newProduct));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=26cbcb23&app_key=abc875906b1d4c0d0ee2cac75b4ea70c&ingr=nuts&nutrition-type=cooking`,
    )
      .then(res => res.json())
      .then(data => setProducts(data.hints));
  }, []);

  return (
    <>
      <PageHeading text="Product list" />
      <AddButton onClick={toggleModal} text="Add button" />
      {products && <ProductList products={products} />}

      {showModal && (
        <Modal>
          <form onSubmit={modalSubmit}>
            <input
              type="text"
              autoomplete="off"
              autoFocus
              placeholder="Name"
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
            <input
              type="url"
              autoomplete="off"
              autoFocus
              placeholder="Enter image url"
              value={image}
              onChange={e => setImage(e.target.value)}
            />
            <input
              type="number"
              autoomplete="off"
              autoFocus
              placeholder="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <input
              type="text"
              autoomplete="off"
              autoFocus
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <button type="submit" className={''}>
              <span>Add product</span>
            </button>
            <button type="button" onClick={toggleModal}>
              Cancel
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
