
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, UserCheck, UserX } from "lucide-react";
import { Student } from "./StudentList";

type AttendanceStatsProps = {
  students: Student[];
  selectedDate: Date;
  attendanceRecords: Record<string, Record<string, boolean>>;
};

const AttendanceStats = ({ students, selectedDate, attendanceRecords }: AttendanceStatsProps) => {
  const dateStr = selectedDate.toISOString().split('T')[0];

  // Count present students for the selected date
  const presentStudents = students.filter(
    student => attendanceRecords[student.id]?.[dateStr]
  ).length;
  
  // Count absent students
  const absentStudents = students.length - presentStudents;
  
  // Calculate attendance percentage
  const attendancePercentage = students.length ? 
    Math.round((presentStudents / students.length) * 100) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alunos Presentes</CardTitle>
          <UserCheck className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{presentStudents}</div>
          <p className="text-xs text-muted-foreground">
            de {students.length} alunos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alunos Ausentes</CardTitle>
          <UserX className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{absentStudents}</div>
          <p className="text-xs text-muted-foreground">
            de {students.length} alunos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Presença</CardTitle>
          <CalendarCheck className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{attendancePercentage}%</div>
          <p className="text-xs text-muted-foreground">
            {selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceStats;
