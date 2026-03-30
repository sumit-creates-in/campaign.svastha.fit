import { useState } from "react";
import { MessageCircle, X, ChevronDown } from "lucide-react";

const WhatsAppFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChatClick = () => {
    const phoneNumber = "15557533653";
    const message = "I want to know more about Ultimate 21 Day Weight Loss Challenge";
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Popup Widget */}
      {isOpen && (
        <div className="fixed bottom-44 md:bottom-36 right-4 md:right-6 z-[9999] animate-slideUp">
          <div className="bg-white rounded-[32px] w-[300px] md:w-[340px] border-2 border-green-500 p-6 relative" style={{ boxShadow: '-2px -2px 0px rgba(0, 0, 0, 0.15), 5px 5px 0px rgba(22, 163, 74, 0.35), 0 4px 12px rgba(0, 0, 0, 0.08)' }}>
            {/* Speech bubble tail - pointing to button */}
            <div 
              className="absolute -bottom-4 right-6 w-8 h-8 bg-white border-r-2 border-b-2 border-green-500 transform rotate-45"
              style={{ boxShadow: '3px 3px 0px rgba(22, 163, 74, 0.35)' }}
            ></div>
            
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="pr-6">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 text-lg font-bold mb-1 leading-tight whitespace-nowrap">
                    Got any questions?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We're here to help.
                  </p>
                </div>
              </div>

              {/* Chat Button */}
              <button
                onClick={handleChatClick}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 px-5 rounded-xl flex items-center justify-between transition-all duration-300 group mb-3"
                style={{ boxShadow: '0 3px 0px rgba(22, 163, 74, 0.4), 0 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="flex items-center gap-2.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="text-sm">Chat on WhatsApp</span>
                </div>
                <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[9999] w-14 h-14 bg-green-500/90 hover:bg-green-500 text-white rounded-full transition-all duration-300 hover:scale-110 group flex items-center justify-center"
        style={{ boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4), 0 2px 6px rgba(0, 0, 0, 0.12)' }}
        aria-label="WhatsApp Chat"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current group-hover:rotate-12 transition-transform"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        
        {/* Pulse animation ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50"></span>
        )}
      </button>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default WhatsAppFloatingButton;
