import React, { useState } from 'react'
import "./style.css"
import Udghoshlogo from "./Udghosh_Logo.png"
import { db } from '../../config/firebase'
import { collection, addDoc } from 'firebase/firestore'
const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const opinionCollectionRef = collection(db, "opinions");
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      if(formData.name === '' || formData.message === '' || formData.email === ''){
        return
      }
      await addDoc(opinionCollectionRef, {
        Name: formData.name,
        Email: formData.email,
        Message: formData.message
      });
      setFormData({
        name:'',
        email:'',
        message:''
      })
    }
    catch(error){
      console.error(error)
    }
  }
  return (
    <section className='foot-container' id='footer' data-scroll-container>

      <div className='footer-contain'>
        <div className='footer-about'>
          <a href="https://udghosh.org.in/" className='Udghoshlogo' target='blank'><img src={Udghoshlogo} alt="" className='Udghoshlogo-img' /></a>
          <div>
            <p className='CA'>CA Program</p>
            <p className='by'>by <a href="https://udghosh.org.in/" target='blank'>UDGHOSH</a></p>
          </div>
          <a className='foot-reg' href="https://unstop.com/internships/campus-ambassador-iit-kanpur-1101018?rstatus=1"><button>Register</button></a>
        </div>
        <div className='line'></div>
        <div className='footer-CA-work'>
          <h3 className='footer-CA-work-CA'>CA</h3><hr />
          <p><a href="#" >Home</a></p>
          <p><a href="#featured" >Featured</a></p>
          <p><a href="#gallery" >Gallery</a></p>
          <p><a href="#sponsors">Sponsors</a></p>
        </div>
        <div className='noline'></div>
        <div className='noline'></div>
        <div className='contact'>
          <div className='contact-title'>
            YOUR OPINION MATTERS
          </div>
          <form onSubmit={handleSubmit} className='form' >
            <div className='contact-grid'>
              <div className='contact-name'><input type="text"  name='name' id='name' value={formData.name} onChange={handleChange} placeholder='Name' required /></div>
              <div className='contact-message'><textarea name="message"  id="message" value={formData.message} onChange={handleChange} placeholder='Message' required></textarea></div>
              <div className='contact-mail'><input type="email" name='email' id='email' value={formData.email} onChange={handleChange} placeholder='Email' required /></div>
              <div className='contact-sub'><button type='submit'>Submit</button></div>
            </div>
            {/* {responseMessage && <p>{responseMessage}</p>} */}
          </form>
        </div>

      </div>
      <div className='social'>
        <div className='social-handles'><a href="https://www.facebook.com/udghosh.iitk" target="_blank"><i className="fab fa-facebook icon"></i></a></div>
        <div className='social-handles'><a href="https://www.instagram.com/udghosh_iitk/?hl=en" target="_blank"><i className="fab fa-instagram icon"></i></a></div>
        <div className='social-handles'><a href="https://www.linkedin.com/company/udghosh-iit-kanpur-fest/mycompany/" target="_blank"><i className="fab fa-linkedin icon"></i></a></div>
        <div className='social-handles'><a href="https://www.youtube.com/channel/UCWA2to9SqSEWHOU7MmiTPCw" target="_blank"><i className="fab fa-youtube icon"></i></a></div>
        <div className='social-handles'><a href="https://twitter.com/udghoshiitk23" target="_blank"><i className="fab fa-twitter icon"></i></a></div>
      </div>
      <div className="copy_right">
        <h4> Copyright &#169;Udghosh'24 Inc. All rights reserved</h4>
      </div>

    </section>
  )
}

export default Footer

