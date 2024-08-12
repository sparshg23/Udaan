import '@fortawesome/fontawesome-free/css/all.min.css';
const Card = ({name,head}) => {
  return (
    <div className="CardDiv bg-black text-white rounded-lg overflow-hidden">
            <div className="bg-purple-200 p-4">
              <img
                src="person.jpg"
                alt="Profile"
                className="w-32 h-32 mx-auto rounded-full object-cover headImage"
              />
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold">{name}</h2>
              <p className="text-gray-400 mt-2">{`Head, ${head}`}</p>
              <div className="flex justify-center space-x-4 mt-4">
                <a href="#" className="text-gray-500 hover:text-white">
                  <i className="fab fa-behance"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-white">
                  <i className="fab fa-dribbble"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-white">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-white">
                  <i className="fas fa-user-circle"></i>
                </a>
              </div>
            </div>
          </div>
  )
}

export default Card
