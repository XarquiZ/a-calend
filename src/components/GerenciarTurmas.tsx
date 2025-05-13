
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { FolderPlus, FolderEdit, FolderMinus } from 'lucide-react';

// Tipo para turma
interface Turma {
  id: string;
  nome: string;
  turnos: {
    manha: boolean;
    tarde: boolean;
    noite: boolean;
  };
}

const GerenciarTurmas = () => {
  // Mock initial data
  const [turmas, setTurmas] = useState<Turma[]>([
    { 
      id: '1', 
      nome: 'Turma A', 
      turnos: { manha: true, tarde: false, noite: false } 
    },
    { 
      id: '2', 
      nome: 'Turma B', 
      turnos: { manha: false, tarde: true, noite: false } 
    },
    { 
      id: '3', 
      nome: 'Turma Integral', 
      turnos: { manha: true, tarde: true, noite: false } 
    },
  ]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);
  
  const [novaTurma, setNovaTurma] = useState<Omit<Turma, 'id'>>({
    nome: '',
    turnos: { manha: false, tarde: false, noite: false }
  });
  
  const handleCreate = () => {
    // Validate
    if (!novaTurma.nome) {
      toast.error("Nome da turma é obrigatório");
      return;
    }
    
    if (!novaTurma.turnos.manha && !novaTurma.turnos.tarde && !novaTurma.turnos.noite) {
      toast.error("Selecione pelo menos um turno");
      return;
    }
    
    // Create new turma
    const newTurma: Turma = {
      id: crypto.randomUUID(),
      ...novaTurma
    };
    
    setTurmas([...turmas, newTurma]);
    toast.success("Turma criada com sucesso");
    
    // Reset form and close dialog
    setNovaTurma({
      nome: '',
      turnos: { manha: false, tarde: false, noite: false }
    });
    setIsOpen(false);
  };
  
  const handleEdit = () => {
    if (!selectedTurma) return;
    
    // Validate
    if (!selectedTurma.nome) {
      toast.error("Nome da turma é obrigatório");
      return;
    }
    
    if (!selectedTurma.turnos.manha && !selectedTurma.turnos.tarde && !selectedTurma.turnos.noite) {
      toast.error("Selecione pelo menos um turno");
      return;
    }
    
    // Update turma
    setTurmas(turmas.map(t => 
      t.id === selectedTurma.id ? selectedTurma : t
    ));
    
    toast.success("Turma atualizada com sucesso");
    setIsEditOpen(false);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta turma?")) {
      setTurmas(turmas.filter(t => t.id !== id));
      toast.success("Turma excluída com sucesso");
    }
  };
  
  const selectTurma = (turma: Turma) => {
    setSelectedTurma({...turma});
    setIsEditOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gerenciamento de Turmas</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <FolderPlus className="h-4 w-4 mr-2" />
              Nova Turma
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Turma</DialogTitle>
              <DialogDescription>
                Preencha as informações para criar uma nova turma.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome da Turma</Label>
                <Input 
                  id="nome" 
                  value={novaTurma.nome} 
                  onChange={(e) => setNovaTurma({...novaTurma, nome: e.target.value})} 
                  placeholder="Ex: Turma A" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Turnos Disponíveis</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="manha" 
                      checked={novaTurma.turnos.manha}
                      onCheckedChange={(checked) => 
                        setNovaTurma({
                          ...novaTurma, 
                          turnos: {...novaTurma.turnos, manha: checked === true}
                        })
                      } 
                    />
                    <label htmlFor="manha">Manhã</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="tarde" 
                      checked={novaTurma.turnos.tarde}
                      onCheckedChange={(checked) => 
                        setNovaTurma({
                          ...novaTurma, 
                          turnos: {...novaTurma.turnos, tarde: checked === true}
                        })
                      }  
                    />
                    <label htmlFor="tarde">Tarde</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="noite" 
                      checked={novaTurma.turnos.noite}
                      onCheckedChange={(checked) => 
                        setNovaTurma({
                          ...novaTurma, 
                          turnos: {...novaTurma.turnos, noite: checked === true}
                        })
                      }  
                    />
                    <label htmlFor="noite">Noite</label>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreate}>Criar Turma</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Dialog for editing */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Turma</DialogTitle>
              <DialogDescription>
                Modifique as informações da turma.
              </DialogDescription>
            </DialogHeader>
            
            {selectedTurma && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-nome">Nome da Turma</Label>
                  <Input 
                    id="edit-nome" 
                    value={selectedTurma.nome} 
                    onChange={(e) => setSelectedTurma({...selectedTurma, nome: e.target.value})} 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>Turnos Disponíveis</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="edit-manha" 
                        checked={selectedTurma.turnos.manha}
                        onCheckedChange={(checked) => 
                          setSelectedTurma({
                            ...selectedTurma, 
                            turnos: {...selectedTurma.turnos, manha: checked === true}
                          })
                        } 
                      />
                      <label htmlFor="edit-manha">Manhã</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="edit-tarde" 
                        checked={selectedTurma.turnos.tarde}
                        onCheckedChange={(checked) => 
                          setSelectedTurma({
                            ...selectedTurma, 
                            turnos: {...selectedTurma.turnos, tarde: checked === true}
                          })
                        }  
                      />
                      <label htmlFor="edit-tarde">Tarde</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="edit-noite" 
                        checked={selectedTurma.turnos.noite}
                        onCheckedChange={(checked) => 
                          setSelectedTurma({
                            ...selectedTurma, 
                            turnos: {...selectedTurma.turnos, noite: checked === true}
                          })
                        }  
                      />
                      <label htmlFor="edit-noite">Noite</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
              <Button onClick={handleEdit}>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {turmas.map(turma => (
          <Card key={turma.id}>
            <CardHeader>
              <CardTitle>{turma.nome}</CardTitle>
              <CardDescription>
                Turnos: {[
                  turma.turnos.manha ? 'Manhã' : '',
                  turma.turnos.tarde ? 'Tarde' : '',
                  turma.turnos.noite ? 'Noite' : ''
                ].filter(Boolean).join(', ')}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => selectTurma(turma)}>
                <FolderEdit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(turma.id)}>
                <FolderMinus className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {turmas.length === 0 && (
          <div className="col-span-full text-center p-8 border rounded-md bg-gray-50">
            <p className="text-gray-500">Nenhuma turma cadastrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GerenciarTurmas;
