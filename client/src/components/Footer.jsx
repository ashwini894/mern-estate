import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">

      {/* Logo/Brand Section (Center) */}
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">RealEstate</h1>
      </div>

      {/* Navigation Links (Center) */}
      <div className="flex justify-center space-x-8 mb-4">
        <a href="/" className="hover:underline text-gray-300">
          Home
        </a>
        <a href="/about" className="hover:underline text-gray-300">
          About Us
        </a>
        <a href="/services" className="hover:underline text-gray-300">
          Services
        </a>
        <a href="/contact" className="hover:underline text-gray-300">
          Contact
        </a>
      </div>

      {/* Social Media Icons (Center) */}
      <div className="flex justify-center space-x-6 mb-4">
        <a href="#" className="text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="mailto:support@example.com" className="text-gray-400 hover:text-white">
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </a>
      </div>

      {/* Footer Bottom (Center) */}
      <div className="mt-5 text-center text-sm text-gray-500">
        © 2024 RealEstate. All rights reserved.
      </div>
    </div>
  </footer>
  )
}

export default Footer
