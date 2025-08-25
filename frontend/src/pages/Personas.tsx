import React, { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Dropdown from "@/components/ui/Dropdown";
import TextField from "@/components/ui/TextField";
import RadioGroup from "@/components/ui/RadioGroup";
import type { RadioGroupOption } from "@/components/ui/RadioGroup";
import FloatingButton from "@/components/features/FloatingButton";
import { useFlowStore } from "@/stores/useFlowStore";

interface PersonaOption {
  id: string;
  name: string;
  gender: string;
  description: string;
  label: string;
}

const Personas: React.FC = () => {
  const { setPersonaData } = useFlowStore();
  const [selectedPersona, setSelectedPersona] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [personaDescription, setPersonaDescription] = useState("");

  const personaData: PersonaOption[] = [
    {
      id: "persona_1",
      name: "지민",
      gender: "female",
      description:
        "밝고 활발한 성격으로 새로운 경험을 즐기는 대학생입니다. 친구들과 함께하는 시간을 소중히 여기며, 항상 긍정적인 에너지로 주변을 밝게 만듭니다.",
      label: "활발한 대학생 지민",
    },
    {
      id: "persona_2",
      name: "준호",
      gender: "male",
      description:
        "조용하고 신중한 성격의 회사원입니다. 책 읽기를 좋아하며, 깊이 있는 대화를 나누는 것을 선호합니다. 계획적이고 책임감이 강합니다.",
      label: "신중한 회사원 준호",
    },
    {
      id: "persona_3",
      name: "수연",
      gender: "female",
      description:
        "창의적이고 예술적 감각이 뛰어난 디자이너입니다. 자유로운 영혼으로 새로운 아이디어를 끊임없이 추구하며, 감성적이고 섬세한 면이 있습니다.",
      label: "창의적인 디자이너 수연",
    },
    {
      id: "persona_4",
      name: "태현",
      gender: "male",
      description:
        "리더십이 강하고 목표 지향적인 성격의 사업가입니다. 도전을 두려워하지 않으며, 팀을 이끌어가는 카리스마가 있습니다. 결과 중심적이고 추진력이 뛰어납니다.",
      label: "카리스마 있는 사업가 태현",
    },
  ];

  const personaOptions = personaData.map((persona) => persona.label);

  const genderOptions: RadioGroupOption[] = [
    { value: "male", label: "남성" },
    { value: "female", label: "여성" },
    { value: "none", label: "선택하지 않음" },
  ];

  // 페르소나 선택 시 자동으로 정보 불러오기
  const handlePersonaSelect = (selectedLabel: string) => {
    setSelectedPersona(selectedLabel);

    const selectedPersonaData = personaData.find(
      (persona) => persona.label === selectedLabel
    );
    if (selectedPersonaData) {
      setName(selectedPersonaData.name);
      setGender(selectedPersonaData.gender);
      setPersonaDescription(selectedPersonaData.description);
    }
  };

  const handleComplete = () => {
    const selectedPersonaData = personaData.find(
      (persona) => persona.label === selectedPersona
    );
    if (selectedPersonaData) {
      const personaInfo = {
        id: selectedPersonaData.id,
        name,
        gender,
        description: personaDescription,
      };

      setPersonaData(personaInfo);
      console.log("Selection completed:", personaInfo);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <Header variant="withText" title="페르소나 설정" />

      {/* Main Content */}
      <div className="pt-14 pb-36">
        <div className="flex flex-col p-4">
          {/* Persona Selection Dropdown */}
          <Dropdown
            label="페르소나 선택"
            buttonlabel="페르소나를 선택해 주세요"
            items={personaOptions}
            value={selectedPersona}
            onChange={handlePersonaSelect}
          />

          {/* Name Input */}
          <div className="pt-6">
            <TextField
              label="이름"
              required
              placeholder="이름을 입력해 주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
            />
          </div>
          {/* Gender Selection */}
          <RadioGroup
            label="성별"
            required
            options={genderOptions}
            value={gender}
            onValueChange={setGender}
          />

          {/* Persona Description */}
          <div className="pt-6">
            <TextField
              inputHeight="lg"
              label="페르소나"
              required
              placeholder="페르소나를 입력해 주세요"
              value={personaDescription}
              onChange={(e) => setPersonaDescription(e.target.value)}
              maxLength={350}
            />
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <FloatingButton
        onChatClick={handleComplete}
        onInputSubmit={(value) => console.log("Input submitted:", value)}
        buttonlabel="선택 완료"
        disabled={!name || !gender || !personaDescription}
      />
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Personas;
