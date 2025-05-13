
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
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
import { Aluno, Turma } from '@/types/student';

interface EditStudentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedAluno: Aluno | null;
  turmas: Turma[];
  onUpdateStudent: (aluno: Aluno) => void;
  onSelectedAlunoChange: (aluno: Aluno) => void;
}

const EditStudentDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedAluno, 
  turmas, 
  onUpdateStudent,
  onSelectedAlunoChange 
}: EditStudentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Aluno</DialogTitle>
          <DialogDescription>
            Modifique as informações do aluno.
          </DialogDescription>
        </DialogHeader>
        
        {selectedAluno && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-nome">Nome do Aluno</Label>
              <Input 
                id="edit-nome" 
                value={selectedAluno.nome} 
                onChange={(e) => onSelectedAlunoChange({...selectedAluno, nome: e.target.value})} 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-matricula">Matrícula</Label>
              <Input 
                id="edit-matricula" 
                value={selectedAluno.matricula} 
                onChange={(e) => onSelectedAlunoChange({...selectedAluno, matricula: e.target.value})} 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-turma">Turma</Label>
              <Select 
                value={selectedAluno.turmaId} 
                onValueChange={(value) => onSelectedAlunoChange({...selectedAluno, turmaId: value})}
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
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={() => {
            if (selectedAluno) onUpdateStudent(selectedAluno);
          }}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;
