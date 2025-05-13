
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { Aluno, Turma } from '@/types/student';
import CreateStudentDialog from './students/CreateStudentDialog';
import EditStudentDialog from './students/EditStudentDialog';
import TransferStudentDialog from './students/TransferStudentDialog';
import StudentList from './students/StudentList';

const GerenciarAlunos = () => {
  // Mock de turmas
  const [turmas, setTurmas] = useState<Turma[]>([
    { id: '1', nome: 'Turma A' },
    { id: '2', nome: 'Turma B' },
    { id: '3', nome: 'Turma Integral' },
  ]);
  
  // Mock de alunos iniciais
  const [alunos, setAlunos] = useState<Aluno[]>([
    { id: '1', nome: 'João Silva', matricula: '2023001', turmaId: '1' },
    { id: '2', nome: 'Maria Oliveira', matricula: '2023002', turmaId: '1' },
    { id: '3', nome: 'Pedro Santos', matricula: '2023003', turmaId: '2' },
    { id: '4', nome: 'Ana Souza', matricula: '2023004', turmaId: '3' },
    { id: '5', nome: 'Lucas Ferreira', matricula: '2023005', turmaId: '3' },
  ]);
  
  // Estados para os modais
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  
  // Estado para aluno selecionado
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  
  // Filtro de turmas
  const [turmaFilter, setTurmaFilter] = useState<string>('');
  
  // Função para criar um novo aluno
  const handleCreate = (novoAluno: Omit<Aluno, 'id'>) => {
    const newAluno: Aluno = {
      id: crypto.randomUUID(),
      ...novoAluno
    };
    
    setAlunos([...alunos, newAluno]);
    toast.success("Aluno cadastrado com sucesso");
  };
  
  // Função para editar aluno
  const handleEdit = (updatedAluno: Aluno) => {
    // Validação
    if (!updatedAluno.nome || !updatedAluno.matricula || !updatedAluno.turmaId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    
    // Atualizar aluno
    setAlunos(alunos.map(a => 
      a.id === updatedAluno.id ? updatedAluno : a
    ));
    
    toast.success("Dados do aluno atualizados com sucesso");
    setIsEditOpen(false);
  };
  
  // Função para excluir aluno
  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      setAlunos(alunos.filter(a => a.id !== id));
      toast.success("Aluno excluído com sucesso");
    }
  };
  
  // Função para transferir aluno
  const handleTransfer = (alunoId: string, turmaId: string) => {
    // Transferir aluno
    setAlunos(alunos.map(a => 
      a.id === alunoId 
        ? {...a, turmaId} 
        : a
    ));
    
    toast.success(`Aluno transferido com sucesso para ${turmas.find(t => t.id === turmaId)?.nome}`);
  };
  
  // Filtrar alunos por turma
  const filteredAlunos = turmaFilter 
    ? alunos.filter(a => a.turmaId === turmaFilter)
    : alunos;
  
  // Iniciar edição de um aluno
  const startEdit = (aluno: Aluno) => {
    setSelectedAluno({...aluno});
    setIsEditOpen(true);
  };
  
  // Iniciar transferência de um aluno
  const startTransfer = (aluno: Aluno) => {
    setSelectedAluno({...aluno});
    setIsTransferOpen(true);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Gerenciamento de Alunos</h2>
        
        <div className="flex flex-wrap gap-4">
          <Select value={turmaFilter} onValueChange={setTurmaFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as turmas</SelectItem>
              {turmas.map(turma => (
                <SelectItem key={turma.id} value={turma.id}>{turma.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <CreateStudentDialog 
            turmas={turmas} 
            onCreateStudent={handleCreate} 
          />
        </div>
      </div>
      
      {/* Lista de alunos */}
      <StudentList 
        filteredAlunos={filteredAlunos}
        turmas={turmas}
        onEditClick={startEdit}
        onTransferClick={startTransfer}
        onDeleteClick={handleDelete}
      />
      
      {/* Dialogs para editar e transferir alunos */}
      <EditStudentDialog 
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        selectedAluno={selectedAluno}
        turmas={turmas}
        onUpdateStudent={handleEdit}
        onSelectedAlunoChange={setSelectedAluno}
      />
      
      <TransferStudentDialog 
        isOpen={isTransferOpen}
        onOpenChange={setIsTransferOpen}
        selectedAluno={selectedAluno}
        turmas={turmas}
        onTransferStudent={handleTransfer}
      />
    </div>
  );
};

export default GerenciarAlunos;
