import React from 'react'
import {data} from '../restApi.json'
import { useNavigate } from "react-router-dom";
import "../App.css"
const Qualities = () => {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate('/feed');
  }
  return (
    <>
    <section className='qualities' id='qualities'>
     <div className="container">{
              data[0].ourQualities.map(element=>{
                return(
                  <div className='card' key={element.id}>
                      <img src={element.image} alt={element.title} />
                      <p className='title'>{element.title}</p>
                      <p className='description'>{element.description}</p>
                  </div>
                )
              })
            }
           </div>
          </section>
          <section className='quality'> 
            <button className='btn' onClick={handleClick}>Feedback!</button>
          </section>
    </>
  )
}

export default Qualities
//////now cart, online delivery, payment,map, mail to each user when reservation successfull,chat window as costomer care.