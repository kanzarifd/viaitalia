 import React, { useState } from 'react';

const AnnouncementCard = ({ 
  announcement,
  className = "",
  onLike,
  onComment,
  onShare 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 24)) / (1000 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60)) / 1000);

    if (diffDays > 0) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffMinutes > 0) {
      return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return 'À l\'instant';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'INFO':
        return 'bg-gradient-to-br from-indigo-500 to-indigo-600';
      case 'SUCCESS':
        return 'bg-gradient-to-br from-green-500 to-green-600';
      case 'WARNING':
        return 'bg-gradient-to-br from-yellow-500 to-yellow-600';
      case 'URGENT':
        return 'bg-gradient-to-br from-red-500 to-red-600';
      case 'ACADEMIQUE':
        return 'bg-gradient-to-br from-purple-500 to-purple-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'INFO':
        return '📢';
      case 'SUCCESS':
        return '✅';
      case 'WARNING':
        return '⚠️';
      case 'URGENT':
        return '🔴';
      case 'ACADEMIQUE':
        return '🎓';
      default:
        return '📢';
    }
  };

  const handleLinkClick = () => {
    if (announcement.link) {
      // Handle link click
      if (announcement.link.startsWith('http://') || announcement.link.startsWith('https://')) {
        // External link - open in new tab
        window.open(announcement.link, '_blank');
      } else {
        // Internal link - navigate within app
        console.log('Navigate to:', announcement.link);
      }
    }
  };

  return (
    <article className={`bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 group relative ${className}`}>
      {/* Category Badge */}
      <div className="absolute top-6 right-6 z-10 px-4 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest shadow-lg bg-indigo-600">
        {announcement.type}
      </div>

      {/* Image Section */}
      <div className="h-72 overflow-hidden relative">
        {announcement.image ? (
          <>
            <img
              src={announcement.image}
              alt={announcement.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          </>
        ) : (
          <div className={`w-full h-full ${getTypeColor(announcement.type)} flex items-center justify-center`}>
            <span className="text-6xl text-white">
              {getTypeIcon(announcement.type)}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-10 flex flex-col flex-grow">
        {/* Date and Read Time */}
        <div className="flex items-center gap-4 mb-4 text-slate-400 text-[9px] font-bold uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
          {new Date(announcement.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
            <path d="M12 6v6l4 2"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          {Math.ceil((new Date() - new Date(announcement.createdAt)) / (1000 * 60))} min
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight italic uppercase group-hover:text-indigo-600 transition-colors">
          {announcement.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-10 line-clamp-3 font-medium">
          {announcement.content}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
          {announcement.link && (
            <a 
              href={announcement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-dark font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-all"
            >
              Consulter l'officiel 
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:translate-x-1 transition-transform">
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </a>
          )}

          <div className="flex gap-4 text-slate-200">
            <button 
              onClick={onLike}
              className="hover:text-indigo-600 cursor-pointer"
              title="J'aime"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              </svg>
            </button>
            <button 
              onClick={onComment}
              className="hover:text-indigo-600 cursor-pointer"
              title="Commenter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
              </svg>
            </button>
            {announcement.link && (
              <button 
                onClick={handleLinkClick}
                className="hover:text-indigo-600 cursor-pointer"
                title="Visiter le lien"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default AnnouncementCard;