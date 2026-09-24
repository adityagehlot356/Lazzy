import React from 'react';
import { FileText } from 'lucide-react';

const NoteCard = ({ title, platform, content }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-3 shadow-sm mb-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-500" />
          {title || "Untitled Note"}
        </h3>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {platform}
        </span>
      </div>
      <p className="text-xs text-gray-600 line-clamp-3">
        {content}
      </p>
    </div>
  );
};

export default NoteCard;

