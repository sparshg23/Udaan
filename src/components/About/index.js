import React from 'react'

const About = () => {
  return (
    <div className='h-[60vh] md:h-screen w-screen bg-black'>
      <div className="relative h-screen bg-cover bg-center w-full " style={{ backgroundImage: "url('Image1.webp')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative h-full flex items-center justify-center">
        <div className="relative aboutDiv backdrop-blur-md border-2 border-white p-8 rounded-2xl w-[50vw] h-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">About Us</h1>
          <p className="text-xl text-white">
          Udaan is a groundbreaking sports event dedicated to empowering and celebrating the abilities of individuals with disabilities. Our mission is to provide an inclusive platform where participants can showcase their talents, build confidence, and foster a sense of community through the spirit of sportsmanship. Udaan is more than just a competition; it is a celebration of resilience, determination, and the indomitable human spirit.
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default About
