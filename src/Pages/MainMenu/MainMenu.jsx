import React, { useState } from 'react';
// import { dishes } from '../../dishes.json';
import { useDishes } from '../../Context/Context';

import { Link } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const MainMenu = () => {
  const data = useDishes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
const dishes=data.all_product;
  // Filter dishes based on search term and selected category
  const filteredDishes = dishes.filter((dish) => {
    return (
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || dish.category === selectedCategory)
    );
  });

  // Get unique categories from dishes
  const categories = ['All', ...new Set(dishes.map((dish) => dish.category))];

  // Function to handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Function to sort dishes by category
  const sortDishesByCategory = () => {
    return filteredDishes.sort((a, b) => (a.category > b.category ? 1 : -1));
  };

  return (
    <>
      <section className="menu" id="menu">
        <div className="container">
        <h1 className="heading">Our Menu</h1>
        <div style={{ display:'flex', justifyContent:'center', position:'sticky', top:'100px',right:'50px', zIndex: '1000' }}>
  <div className="search_and_filter">
    {/* Search Bar */}
    <input
      type="text"
      placeholder="Search dishes..."
      value={searchTerm}
      onChange={handleSearchTermChange}
    />

    {/* Category Filter */}
    <select
      value={selectedCategory}
      onChange={(e) => handleCategoryChange(e.target.value)}
    >
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Link
      to="/"
      style={{
        textDecoration: 'none',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '10px',
        transition: 'color 0.3s ease',
        cursor: 'pointer'
      }}
    >
      Back to Home{' '}
      <HiOutlineArrowNarrowRight style={{ marginLeft: '5px', transition: 'transform 0.3s ease' }} />
    </Link>
  </div>
</div>

          <div className="dishes_container">
            {sortDishesByCategory().map((element) => (
              <div className="card" key={element.id}>
                <img src={element.image} alt={element.name} />
                <div style={{ display: 'flex-col', justifyContent: 'center' }}>
                  <div style={{display:'flex',justifyContent: 'center' , gap:'2px' ,marginTop:'4px' }}>
                 <div style={{ height:'10px',width:'10px', backgroundColor: element.kind === "Veg" ? 'green' : 'red' }}></div>
                 <div>{element.name}</div>
                 </div>
                  <h2>₹{element.price}</h2>
                  
                </div>
                <button>{element.category}</button>
              </div>
            ))}
          </div>
         
        </div>
      </section>
      <div style={{ display: 'flex', alignItems: 'center' }}>
    <Link
      to="/"
      style={{
        textDecoration: 'none',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '10px',
        transition: 'color 0.3s ease',
        cursor: 'pointer'
      }}
    >
      Back to Home{' '}
      <HiOutlineArrowNarrowRight style={{ marginLeft: '5px', transition: 'transform 0.3s ease' }} />
    </Link>
  </div>
    </>
  );
};

export default MainMenu;

