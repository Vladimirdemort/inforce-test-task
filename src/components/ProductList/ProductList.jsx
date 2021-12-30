import s from './ProductList.module.css';

export default function ProductList({ products }) {
  console.log(products);
  const getRandomInt = init => {
    return Math.floor(Math.random() * init);
  };
  return (
    <>
      <ul className={s.listGrid}>
        {products &&
          products.map(({ food }) => {
            if (food.image) {
              return (
                <li key={food.foodId}>
                  <img src={food.image} alt={food.label} />
                  <p>
                    <span>Price</span> {getRandomInt(100)}
                  </p>
                  <p>
                    <span>Description</span>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Alias dignissimos quam error sapiente, id est.
                  </p>
                </li>
              );
            }
          })}
      </ul>
    </>
  );
}
