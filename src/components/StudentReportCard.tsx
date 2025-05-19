
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseGrade {
  id: number;
  name: string;
  grade: number;
}

interface GradeSection {
  title: string;
  items: CourseGrade[];
  average: number;
  backgroundColor: string;
}

interface StudentReportCardProps {
  studentName?: string;
  sections: GradeSection[];
}

const StudentReportCard: React.FC<StudentReportCardProps> = ({ 
  studentName = "Aluno",
  sections 
}) => {
  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Boletim Escolar</h2>
        <p className="text-gray-500">{studentName}</p>
      </div>

      {sections.map((section, index) => (
        <Card key={index} className="overflow-hidden border-none shadow-md">
          <CardHeader className="py-3" style={{ backgroundColor: section.backgroundColor }}>
            <CardTitle className="text-center font-bold text-lg">
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {section.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium w-8">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {item.grade.toFixed(2).replace('.', ',')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="font-bold">
                    {section.title.startsWith('MÉDIA') ? 'MÉDIA FINAL' : `MÉDIA DE ${section.title}`}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {section.average.toFixed(2).replace('.', ',')}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentReportCard;
