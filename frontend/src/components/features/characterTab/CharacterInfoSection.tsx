import React from "react";

interface CharacterInfoSectionProps {
  title?: string;
  content: string;
}

const CharacterInfoSection: React.FC<CharacterInfoSectionProps> = ({
  title,
  content,
}) => (
  <div className="space-y-2">
    {title && (
      <h3 className="text-base font-medium text-White-Font">{title}</h3>
    )}
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="text-sm font-normal text-White-Font leading-tight space-y-2">
        {content.split("\n").map((line, index) => (
          <p key={index} className={line.trim() === "" ? "h-2" : ""}>
            {line}
          </p>
        ))}
      </div>
    </div>
  </div>
);

export default CharacterInfoSection;
