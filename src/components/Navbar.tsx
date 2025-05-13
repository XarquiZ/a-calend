
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CalendarDays, ListCheck, User } from "lucide-react";

const Navbar = () => {
  const [currentTab, setCurrentTab] = useState('calendar');

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-primary">Lista de Presença</h1>
          </div>
          <div className="flex">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Button 
                variant={currentTab === 'calendar' ? 'default' : 'ghost'} 
                onClick={() => setCurrentTab('calendar')}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Calendário
              </Button>
              <Button 
                variant={currentTab === 'students' ? 'default' : 'ghost'} 
                onClick={() => setCurrentTab('students')}
              >
                <User className="h-4 w-4 mr-2" />
                Alunos
              </Button>
              <Button 
                variant={currentTab === 'attendance' ? 'default' : 'ghost'} 
                onClick={() => setCurrentTab('attendance')}
              >
                <ListCheck className="h-4 w-4 mr-2" />
                Presenças
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
