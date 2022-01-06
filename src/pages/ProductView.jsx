import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import Modal from 'components/Modal/Modal';
import { editProduct } from 'store/actions/products';
import s from './ProductView.module.css';

export default function ProductView() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const products = useSelector(state => state.products);
  const selectedProduct = products.productsReducer.find(
    product => product.id.toString() === productId,
  );
  const { name, image_link, price, description } = selectedProduct;
  const [label, setLabel] = useState(name);
  const [image, setImage] = useState(image_link);
  const [priceValue, setPriceValue] = useState(price);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const confirmEditProduct = e => {
    e.preventDefault();
    const item = {
      id: Number(productId),
      name: label,
      image_link: image,
      price: priceValue,
      description: descriptionValue,
    };
    toggleModal();
    dispatch(editProduct(item));
  };

  return (
    <>
      {selectedProduct && (
        <div>
          <h2>{name}</h2>
          <img src={image_link} alt={name} />
          <p>Price: {price}</p>
          <p>Description:{description}</p>
          <button type="button" onClick={toggleModal}>
            Edit
          </button>
        </div>
      )}
      {showModal && (
        <Modal>
          <form className={s.modal} onSubmit={confirmEditProduct}>
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
                autoomplete="off"
                autoFocus
                placeholder="Price"
                value={priceValue}
                required
                onChange={e => setPriceValue(e.target.value)}
              />
            </label>
            <label className={s.modalLabel}>
              {' '}
              Description
              <input
                className={s.descriptionInput}
                type="text"
                autoomplete="off"
                autoFocus
                placeholder="Description"
                value={descriptionValue}
                required
                onChange={e => setDescriptionValue(e.target.value)}
              />
            </label>

            <button type="submit" className={s.modalButton}>
              Confirm
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
