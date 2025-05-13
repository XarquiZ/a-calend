
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import GerenciarTurmas from "@/components/GerenciarTurmas";
import GerenciarAlunos from "@/components/GerenciarAlunos";

const Gerenciar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("turmas");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-primary">Painel de Gerenciamento</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs 
            defaultValue="turmas" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="turmas">Gerenciar Turmas</TabsTrigger>
              <TabsTrigger value="alunos">Gerenciar Alunos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="turmas" className="mt-4">
              <GerenciarTurmas />
            </TabsContent>
            
            <TabsContent value="alunos" className="mt-4">
              <GerenciarAlunos />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Gerenciar;
