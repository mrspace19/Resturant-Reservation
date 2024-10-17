import React,{useEffect,useState} from 'react'

const Fav = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

 
  return (
    <div className='list-product'>
    <h1>FAV Products List</h1>
    <h3>These are some most delivered and liked dishes by costomers.</h3>
    <div className='listproduct-format-main'>
      {allproducts.slice(7,16).map((product) => (
        <React.Fragment key={product.id}>
          <div className='listproduct-format-main listproduct-format'>
            <img src={product.image} alt='' className='listproduct-product-icon' />
            <p>{product.name}</p>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
            </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  </div>

  )
}

export default Fav
