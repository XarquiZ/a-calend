
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';
import { Aluno, Turma } from '@/types/student';

interface CreateStudentDialogProps {
  turmas: Turma[];
  onCreateStudent: (aluno: Omit<Aluno, 'id'>) => void;
}

const CreateStudentDialog = ({ turmas, onCreateStudent }: CreateStudentDialogProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [novoAluno, setNovoAluno] = useState<Omit<Aluno, 'id'>>({
    nome: '',
    matricula: '',
    turmaId: ''
  });

  const handleCreate = () => {
    // Validação
    if (!novoAluno.nome || !novoAluno.matricula || !novoAluno.turmaId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    
    // Criar novo aluno
    onCreateStudent(novoAluno);
    
    // Resetar formulário e fechar modal
    setNovoAluno({
      nome: '',
      matricula: '',
      turmaId: ''
    });
    setIsCreateOpen(false);
  };

  return (
    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Aluno
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Aluno</DialogTitle>
          <DialogDescription>
            Preencha as informações para cadastrar um novo aluno.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome do Aluno</Label>
            <Input 
              id="nome" 
              value={novoAluno.nome} 
              onChange={(e) => setNovoAluno({...novoAluno, nome: e.target.value})} 
              placeholder="Nome completo" 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="matricula">Matrícula</Label>
            <Input 
              id="matricula" 
              value={novoAluno.matricula} 
              onChange={(e) => setNovoAluno({...novoAluno, matricula: e.target.value})} 
              placeholder="Ex: 2023001" 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="turma">Turma</Label>
            <Select 
              value={novoAluno.turmaId} 
              onValueChange={(value) => setNovoAluno({...novoAluno, turmaId: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma turma" />
              </SelectTrigger>
              <SelectContent>
                {turmas.map(turma => (
                  <SelectItem key={turma.id} value={turma.id}>{turma.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreate}>Cadastrar Aluno</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudentDialog;
