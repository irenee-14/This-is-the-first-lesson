import React from "react";

interface CharacterInfoSectionProps {
  title: string;
  content: string;
}

const CharacterInfoSection: React.FC<CharacterInfoSectionProps> = ({
  title,
  content,
}) => (
  <div className="space-y-2">
    <h3 className="text-base font-medium text-White-Font">{title}</h3>
    <div className="bg-gray-900 rounded-lg p-4">
      <p className="text-sm font-normal text-White-Font leading-tight">
        {content}
      </p>
    </div>
  </div>
);

export default CharacterInfoSection;
