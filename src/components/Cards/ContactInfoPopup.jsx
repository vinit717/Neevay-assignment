import React from 'react';
import businessCardImage from '../../assests/businesscard.png';
import ContactIcon from '../../assests/contact.png'

const ContactInfoPopup = ({ business, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-[505px] h-[459px]">
        <div className="flex justify-between items-center mb-4">
          <span className='flex items-center	'>
            <img 
              src={ContactIcon} 
              alt="contact icon" 
              className="w-[22px] h-[23px] mr-4"
            />
            <h2 className="text-xl font-bold">Contact Info</h2></span>
          
          <button onClick={onClose} className="text-gray-500">
            Close
          </button>
        </div>
        <div className="bg-gray-100 py-4 pl-8 mb-4 rounded">
          <h3 className="font-bold text-gray-600 mb-2.5">Business Contact Details</h3>
          <div className="flex items-center">
            <img 
              src={businessCardImage} 
              alt="business card" 
              className="w-[30px] h-[28.5px] mr-4"
            />
            <div>
              <h3 className="font-bold">{business.vendorName}</h3>
              <p>{business.vendorContact.email}</p>
              <p>{business.vendorContact.phone}</p>
            </div>
            </div>
        </div>
        <div className="bg-gray-100 py-4 pl-8">
          <h3 className="font-bold text-gray-600">Team Contact Details</h3>
          {business.vendorTeam.map((member, index) => (
            <div key={index} className="flex items-center my-2">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold mr-4">
                {member.Name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-bold">{member.Name}</p>
                <p>{member.Email}</p>
                <p>{member.Phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoPopup;
