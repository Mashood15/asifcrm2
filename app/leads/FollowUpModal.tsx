'use client';

import { useEffect, useRef } from 'react';

interface FollowUp {
  id: number;
  date: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Note';
  description: string;
  outcome: string;
}

interface FollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadName: string;
  followUps: FollowUp[];
}

export default function FollowUpModal({ isOpen, onClose, leadName, followUps }: FollowUpModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Call':
        return 'bg-blue-100 text-blue-800';
      case 'Email':
        return 'bg-purple-100 text-purple-800';
      case 'Meeting':
        return 'bg-green-100 text-green-800';
      case 'Note':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Call':
        return '📞';
      case 'Email':
        return '✉️';
      case 'Meeting':
        return '🤝';
      case 'Note':
        return '📝';
      default:
        return '📄';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden z-10 m-4"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Follow-up History</h2>
              <p className="text-blue-100 mt-1">{leadName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {followUps.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 text-lg">No follow-up history available</p>
              <p className="text-gray-400 text-sm mt-2">Contact history will appear here once interactions are logged</p>
            </div>
          ) : (
            <div className="space-y-4">
              {followUps.map((followUp, index) => (
                <div 
                  key={followUp.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-start gap-4">
                    {/* Timeline indicator */}
                    <div className="flex flex-col items-center">
                      <div className="text-2xl">{getTypeIcon(followUp.type)}</div>
                      {index < followUps.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(followUp.type)}`}>
                          {followUp.type}
                        </span>
                        <span className="text-sm text-gray-500">{followUp.date}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-2">{followUp.description}</p>
                      
                      <div className="bg-gray-50 rounded p-3 border-l-4 border-blue-500">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Outcome:</span> {followUp.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
