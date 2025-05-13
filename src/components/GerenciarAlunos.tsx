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
import { UserPlus, UserPen, UserMinus, Move } from 'lucide-react';

// Interface para Turma (simplificada)
interface Turma {
  id: string;
  nome: string;
}

// Interface para Aluno
interface Aluno {
  id: string;
  nome: string;
  matricula: string;
  turmaId: string;
}

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
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  
  const [novoAluno, setNovoAluno] = useState<Omit<Aluno, 'id'>>({
    nome: '',
    matricula: '',
    turmaId: ''
  });
  
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [transferDestination, setTransferDestination] = useState('');
  
  // Filtro de turmas
  const [turmaFilter, setTurmaFilter] = useState<string>('');
  
  // Funções de gerenciamento
  const handleCreate = () => {
    // Validação
    if (!novoAluno.nome || !novoAluno.matricula || !novoAluno.turmaId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    
    // Criar novo aluno
    const newAluno: Aluno = {
      id: crypto.randomUUID(),
      ...novoAluno
    };
    
    setAlunos([...alunos, newAluno]);
    toast.success("Aluno cadastrado com sucesso");
    
    // Resetar formulário e fechar modal
    setNovoAluno({
      nome: '',
      matricula: '',
      turmaId: ''
    });
    setIsCreateOpen(false);
  };
  
  const handleEdit = () => {
    if (!selectedAluno) return;
    
    // Validação
    if (!selectedAluno.nome || !selectedAluno.matricula || !selectedAluno.turmaId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    
    // Atualizar aluno
    setAlunos(alunos.map(a => 
      a.id === selectedAluno.id ? selectedAluno : a
    ));
    
    toast.success("Dados do aluno atualizados com sucesso");
    setIsEditOpen(false);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      setAlunos(alunos.filter(a => a.id !== id));
      toast.success("Aluno excluído com sucesso");
    }
  };
  
  const handleTransfer = () => {
    if (!selectedAluno || !transferDestination) {
      toast.error("Selecione uma turma de destino");
      return;
    }
    
    // Transferir aluno
    setAlunos(alunos.map(a => 
      a.id === selectedAluno.id 
        ? {...a, turmaId: transferDestination} 
        : a
    ));
    
    toast.success(`Aluno transferido com sucesso para ${turmas.find(t => t.id === transferDestination)?.nome}`);
    setTransferDestination('');
    setIsTransferOpen(false);
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
        </div>
      </div>
      
      {/* Lista de alunos */}
      <div className="overflow-hidden border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Matrícula
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Turma
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAlunos.map((aluno) => {
              const turma = turmas.find(t => t.id === aluno.turmaId);
              
              return (
                <tr key={aluno.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {aluno.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {aluno.matricula}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {turma?.nome || 'Sem turma'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(aluno)}>
                      <UserPen className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => startTransfer(aluno)}>
                      <Move className="h-4 w-4 mr-1" />
                      Transferir
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(aluno.id)}>
                      <UserMinus className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </td>
                </tr>
              );
            })}
            
            {filteredAlunos.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Nenhum aluno encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Dialog para editar aluno */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
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
                  onChange={(e) => setSelectedAluno({...selectedAluno, nome: e.target.value})} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-matricula">Matrícula</Label>
                <Input 
                  id="edit-matricula" 
                  value={selectedAluno.matricula} 
                  onChange={(e) => setSelectedAluno({...selectedAluno, matricula: e.target.value})} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-turma">Turma</Label>
                <Select 
                  value={selectedAluno.turmaId} 
                  onValueChange={(value) => setSelectedAluno({...selectedAluno, turmaId: value})}
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
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
            <Button onClick={handleEdit}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para transferir aluno */}
      <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
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
            <Button variant="outline" onClick={() => setIsTransferOpen(false)}>Cancelar</Button>
            <Button onClick={handleTransfer}>Confirmar Transferência</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GerenciarAlunos;
