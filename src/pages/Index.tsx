
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import StudentList, { Student } from '@/components/StudentList';
import AttendanceCalendar from '@/components/AttendanceCalendar';
import AttendanceStats from '@/components/AttendanceStats';
import StudentForm from '@/components/StudentForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ListCheck, User } from "lucide-react";

// Mock data for initial students
const mockStudents: Student[] = [
  { id: '1', name: 'João Silva', registration: '2023001' },
  { id: '2', name: 'Maria Oliveira', registration: '2023002' },
  { id: '3', name: 'Pedro Santos', registration: '2023003' },
  { id: '4', name: 'Ana Souza', registration: '2023004' },
  { id: '5', name: 'Lucas Ferreira', registration: '2023005' },
];

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, Record<string, boolean>>>({});
  
  // Handle attendance change
  const handleAttendanceChange = (studentId: string, date: string, isPresent: boolean) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [date]: isPresent
      }
    }));
  };
  
  // Handle adding a new student
  const handleAddStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-1">
            <AttendanceCalendar 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate}
              attendanceRecords={attendanceRecords}
            />
          </div>
          
          <div className="md:col-span-1 lg:col-span-2">
            <AttendanceStats 
              students={students} 
              selectedDate={selectedDate}
              attendanceRecords={attendanceRecords}
            />
            
            <Tabs defaultValue="attendance" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="attendance">
                  <ListCheck className="h-4 w-4 mr-2" />
                  Presenças
                </TabsTrigger>
                <TabsTrigger value="students">
                  <User className="h-4 w-4 mr-2" />
                  Alunos
                </TabsTrigger>
                <TabsTrigger value="add-student">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Adicionar Aluno
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="attendance" className="mt-4">
                <StudentList 
                  date={selectedDate}
                  students={students}
                  attendanceRecords={attendanceRecords}
                  onAttendanceChange={handleAttendanceChange}
                />
              </TabsContent>
              
              <TabsContent value="students" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Lista de Alunos</CardTitle>
                    <CardDescription>
                      Total de {students.length} alunos registrados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {students.map(student => (
                        <div key={student.id} className="flex justify-between items-center p-3 bg-white border rounded-md">
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">Matrícula: {student.registration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="add-student" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Adicionar Novo Aluno</CardTitle>
                    <CardDescription>
                      Preencha os dados para adicionar um novo aluno à lista
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StudentForm onAddStudent={handleAddStudent} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
