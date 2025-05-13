
import { Button } from '@/components/ui/button';
import { UserPen, Move, UserMinus } from 'lucide-react';
import { Aluno, Turma } from '@/types/student';

interface StudentListProps {
  filteredAlunos: Aluno[];
  turmas: Turma[];
  onEditClick: (aluno: Aluno) => void;
  onTransferClick: (aluno: Aluno) => void;
  onDeleteClick: (id: string) => void;
}

const StudentList = ({ 
  filteredAlunos, 
  turmas, 
  onEditClick, 
  onTransferClick, 
  onDeleteClick 
}: StudentListProps) => {
  return (
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
                  <Button variant="outline" size="sm" onClick={() => onEditClick(aluno)}>
                    <UserPen className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onTransferClick(aluno)}>
                    <Move className="h-4 w-4 mr-1" />
                    Transferir
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDeleteClick(aluno.id)}>
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
  );
};

export default StudentList;
