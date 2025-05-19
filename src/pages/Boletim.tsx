
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import StudentReportCard from '@/components/StudentReportCard';

// Mock data for the report card - reutilizando o mesmo do Turmas.tsx
const reportCardSections = [
  {
    title: "CURSO ESPECÍFICO",
    backgroundColor: "#ffffff",
    items: [
      { id: 1, name: "MÉDIA DE ATIVIDADES TEÓRICAS", grade: 9.15 },
      { id: 2, name: "MÉDIA DE ATIVIDADES PRÁTICAS", grade: 8.5 }
    ],
    average: 8.83
  },
  {
    title: "CURSO EXTRA",
    backgroundColor: "#e7f0fd",
    items: [
      { id: 1, name: "ESPORTE", grade: 10 },
      { id: 2, name: "FORMAÇÃO HUMANA", grade: 10 },
      { id: 3, name: "INICIAÇÃO DIGITAL", grade: 8 },
      { id: 4, name: "MERCADO DE TRABALHO", grade: 9.5 },
      { id: 5, name: "PRODUÇÃO DE CONTEÚDO E COMUNICAÇÃO PROFISSIONAL", grade: 10 },
      { id: 6, name: "QUALIDADE DE VIDA", grade: 10 },
      { id: 7, name: "AVALIAÇÃO CURSO EXTRA", grade: 10 }
    ],
    average: 10
  },
  {
    title: "PARTICIPAÇÃO E RESPONSABILIDADE",
    backgroundColor: "#F2FCE2",
    items: [
      { id: 1, name: "NOTIFICAÇÕES", grade: 9 },
      { id: 2, name: "PARTICIPAÇÃO", grade: 9.5 }
    ],
    average: 8.6
  },
  {
    title: "AVALIAÇÃO INSTITUCIONAL E ESTÁGIO CULTURAL",
    backgroundColor: "#FEC6A1",
    items: [
      { id: 1, name: "AVALIAÇÃO INSTITUCIONAL", grade: 23 },
      { id: 2, name: "ESTÁGIO CULTURAL", grade: 8.5 }
    ],
    average: 15.75
  },
  {
    title: "TRABALHO DE CONCLUSÃO DE CURSO",
    backgroundColor: "#ffffff",
    items: [
      { id: 1, name: "TCC - TRABALHO TEÓRICO", grade: 9.6 },
      { id: 2, name: "TCC - APRESENTAÇÃO", grade: 9.2 }
    ],
    average: 9.4
  }
];

// Lista de alunos fictícia - poderia ser buscada de uma API
const mockStudents = [
  { id: '1', name: 'João Silva', registration: '2023001' },
  { id: '2', name: 'Maria Oliveira', registration: '2023002' },
  { id: '3', name: 'Pedro Santos', registration: '2023003' },
  { id: '4', name: 'Ana Souza', registration: '2023004' },
  { id: '5', name: 'Lucas Ferreira', registration: '2023005' },
];

const Boletim = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Encontrar o aluno selecionado quando a página carrega ou o studentId muda
  useEffect(() => {
    if (studentId) {
      const student = mockStudents.find(student => student.id === studentId);
      setSelectedStudent(student || null);
    }
  }, [studentId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/turmas")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Turmas
          </Button>
          <h1 className="text-2xl font-bold text-primary">Boletim Escolar</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        {selectedStudent ? (
          <div className="max-w-4xl mx-auto">
            <StudentReportCard 
              studentName={selectedStudent.name}
              sections={reportCardSections}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Selecione um aluno para visualizar o boletim</h2>
              <p className="text-gray-500 mb-8">Escolha um dos alunos abaixo para ver o boletim completo</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              {mockStudents.map(student => (
                <div
                  key={student.id}
                  onClick={() => navigate(`/boletim/${student.id}`)}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                >
                  <h3 className="font-medium text-lg mb-1">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">Matrícula: {student.registration}</p>
                  <Button className="mt-4 w-full" size="sm">
                    Ver Boletim
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Boletim;
