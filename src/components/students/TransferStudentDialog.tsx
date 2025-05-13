
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
import { useState } from 'react';
import { Aluno, Turma } from '@/types/student';

interface TransferStudentDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedAluno: Aluno | null;
  turmas: Turma[];
  onTransferStudent: (alunoId: string, turmaId: string) => void;
}

const TransferStudentDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedAluno, 
  turmas, 
  onTransferStudent 
}: TransferStudentDialogProps) => {
  const [transferDestination, setTransferDestination] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) setTransferDestination(''); // Reset when dialog closes
      onOpenChange(open);
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transferir Aluno</DialogTitle>
          <DialogDescription>
            {selectedAluno && (
              <>
                Transferir <strong>{selectedAluno.nome}</strong> para outra turma.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        
        {selectedAluno && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-turma">Turma Atual</Label>
              <Input 
                id="current-turma"
                value={turmas.find(t => t.id === selectedAluno.turmaId)?.nome || 'Sem turma'}
                readOnly
                disabled
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="transfer-turma">Nova Turma</Label>
              <Select 
                value={transferDestination} 
                onValueChange={setTransferDestination}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a turma de destino" />
                </SelectTrigger>
                <SelectContent>
                  {turmas
                    .filter(t => t.id !== selectedAluno.turmaId)
                    .map(turma => (
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
            if (selectedAluno && transferDestination) {
              onTransferStudent(selectedAluno.id, transferDestination);
              onOpenChange(false);
            }
          }}>Confirmar Transferência</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferStudentDialog;
