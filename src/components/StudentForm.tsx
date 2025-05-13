
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { Student } from "./StudentList";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  registration: z.string().min(2, {
    message: "Matrícula deve ter pelo menos 2 caracteres.",
  }),
});

type StudentFormProps = {
  onAddStudent: (student: Student) => void;
};

const StudentForm = ({ onAddStudent }: StudentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      registration: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newStudent = {
      id: uuidv4(),
      name: values.name,
      registration: values.registration,
    };
    
    onAddStudent(newStudent);
    
    toast("Aluno adicionado", {
      description: `${values.name} foi adicionado à lista.`,
    });
    
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Aluno</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matrícula</FormLabel>
              <FormControl>
                <Input placeholder="Digite o número de matrícula" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Adicionar Aluno</Button>
      </form>
    </Form>
  );
};

export default StudentForm;
