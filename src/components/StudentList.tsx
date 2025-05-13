
import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export type Student = {
  id: string;
  name: string;
  registration: string;
};

type StudentListProps = {
  date: Date;
  students: Student[];
  attendanceRecords: Record<string, Record<string, boolean>>;
  onAttendanceChange: (studentId: string, date: string, isPresent: boolean) => void;
};

const StudentList = ({ date, students, attendanceRecords, onAttendanceChange }: StudentListProps) => {
  const dateStr = date.toISOString().split('T')[0];
  
  const handleCheckboxChange = (studentId: string, checked: boolean) => {
    onAttendanceChange(studentId, dateStr, checked);
    toast(checked ? "Presença registrada" : "Falta registrada", {
      description: `Aluno: ${students.find(s => s.id === studentId)?.name}`,
    });
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableCaption>Lista de presença para {date.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Presença</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Matrícula</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <Checkbox 
                  checked={attendanceRecords[student.id]?.[dateStr] || false}
                  onCheckedChange={(checked) => handleCheckboxChange(student.id, checked as boolean)}
                />
              </TableCell>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.registration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentList;
