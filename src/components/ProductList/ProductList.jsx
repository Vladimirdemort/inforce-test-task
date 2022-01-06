import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { deleteProduct as deleteProductAction } from 'store/actions/products';
import s from './ProductList.module.css';
import Modal from 'components/Modal/Modal';

export default function ProductList() {
  const products = useSelector(state => state.products);
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState(0);

  const dispatch = useDispatch();

  const openModal = e => {
    setShowModal(!showModal);
    setModalId(Number(e.target.id));
  };

  const toggleModal = e => {
    setShowModal(!showModal);
  };

  const deleteProduct = e => {
    toggleModal();
    dispatch(deleteProductAction(modalId));
  };

  return (
    <>
      <ul className={s.listGrid}>
        {products.productsReducer &&
          products.productsReducer.map(
            ({ id, name, price, image_link, description }) => {
              return (
                <li className={s.listItem} key={id}>
                  <Link to={`/product/${id}`}>
                    <h3>{name}</h3>
                    <img src={image_link} alt={name} />
                  </Link>
                  <p>
                    <span>Price :{price}</span>
                  </p>
                  <p>
                    <span>Description:</span>
                    <br />
                    {description}
                  </p>

                  <button
                    className={s.button}
                    type="button"
                    id={id}
                    onClick={openModal}
                  >
                    Remove
                  </button>
                </li>
              );
            },
          )}
      </ul>
      {showModal && (
        <Modal>
          <div className={s.buttonContainer}>
            <button
              className={s.removeButton}
              type="button"
              onClick={deleteProduct}
            >
              Delete item
            </button>
            <button
              className={s.cancelButton}
              type="button"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
