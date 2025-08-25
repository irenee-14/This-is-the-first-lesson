import React, { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Dropdown from "@/components/ui/Dropdown";
import TextField from "@/components/ui/TextField";
import RadioGroup from "@/components/ui/RadioGroup";
import type { RadioGroupOption } from "@/components/ui/RadioGroup";
import FloatingButton from "@/components/ui/FloatingButton";

const Personas: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [personaDescription, setPersonaDescription] = useState("");

  const personaOptions = [
    "페르소나 1",
    "페르소나 2",
    "페르소나 3",
    "페르소나 4",
  ];

  const genderOptions: RadioGroupOption[] = [
    { value: "male", label: "남성" },
    { value: "female", label: "여성" },
    { value: "none", label: "선택하지 않음" },
  ];

  const handleComplete = () => {
    console.log("Selection completed:", {
      selectedPersona,
      name,
      gender,
      personaDescription,
    });
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <Header variant="withText" title="페르소나 설정" />

      {/* Main Content */}
      <div className="pt-20 pb-36 px-4">
        <div className="flex flex-col gap-6">
          {/* Persona Selection Dropdown */}
          <Dropdown
            label="페르소나 선택"
            buttonlabel="페르소나를 선택해 주세요"
            items={personaOptions}
            value={selectedPersona}
            onChange={setSelectedPersona}
          />

          {/* Name Input */}
          <TextField
            label="이름"
            required
            placeholder="이름을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
          />

          {/* Gender Selection */}
          <RadioGroup
            label="성별"
            required
            options={genderOptions}
            value={gender}
            onValueChange={setGender}
          />

          {/* Persona Description */}
          <TextField
            label="페르소나"
            required
            placeholder="페르소나를 입력해 주세요"
            value={personaDescription}
            onChange={(e) => setPersonaDescription(e.target.value)}
            maxLength={350}
            isLength={true}
          />
        </div>
      </div>

      {/* Floating Button */}
      <FloatingButton
        onChatClick={() => console.log("Chat button clicked")}
        onInputSubmit={(value) => console.log("Input submitted:", value)}
        buttonlabel="선택 완료"
        disabled={!selectedPersona || !name || !gender || !personaDescription}
      />
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Personas;
