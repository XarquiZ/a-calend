
// Interface para Turma (simplificada)
export interface Turma {
  id: string;
  nome: string;
}

// Interface para Aluno
export interface Aluno {
  id: string;
  nome: string;
  matricula: string;
  turmaId: string;
}
