
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary">Sistema de Gerenciamento Escolar</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Bem-vindo ao Sistema de Gerenciamento Escolar</h2>
            <p className="text-gray-600">Selecione uma opção abaixo para continuar</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card para Coordenação */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6" /> 
                  Gerenciar (Coordenação)
                </CardTitle>
                <CardDescription>
                  Acesso ao gerenciamento de turmas e alunos
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Acesse as ferramentas de coordenação para criar, editar e gerenciar turmas e alunos do sistema.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/gerenciar")}
                >
                  Acessar Coordenação
                </Button>
              </CardFooter>
            </Card>
            
            {/* Card para Professores */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="bg-green-50 dark:bg-green-900/20">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-6 w-6" /> 
                  Entrar na Turma (Professores)
                </CardTitle>
                <CardDescription>
                  Acesso à lista de presença e calendário
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Acesse a interface de gerenciamento de presença, visualize o calendário e registre a frequência dos alunos.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="outline" 
                  onClick={() => navigate("/turmas")}
                >
                  Acessar como Professor
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Sistema de Gerenciamento Escolar
        </div>
      </footer>
    </div>
  );
};

export default Home;
