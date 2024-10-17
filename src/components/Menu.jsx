import React from 'react'
import { useDishes } from '../Context/Context';
import { Link } from 'react-router-dom';
const Menu = () => {
  const data = useDishes();
  const dishes=data.all_product;
  return (
    <>
      <section className='menu' id='menu'>
        <div className="container">
            <div className="heading_section">
                <h1 className="heading">POPULAR DISHES</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, iusto dolorem! Voluptatibus ipsum nam mollitia architecto. Soluta pariatur eius et recusandae veritatis. Quasi, et molestias!</p>
            </div>
            <div className="dishes_container">
                {
                    dishes.slice(0, 8).map(element => (
                        <div className="card" key={element.id}>
                          <Link to={`/product/${element.id}`}><img onClick={window.scrollTo(0,0)} src={element.image} alt={element.title}/></Link>
                                {/* <img src={element.image} alt={element.title} /> */}
                                <h3>{element.title}</h3>
                                <button>{element.category}</button>
                        </div>
                    ))
                }   
            </div>
        </div>
      </section>
    </>
  )
}

export default Menu
