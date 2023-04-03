import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";

const PatientDialog = ({ patient, open, onClose }) => {
  const { register, handleSubmit, control } = useForm({ defaultValues: { ...patient }});
  
  const onSubmit = data => {
    alert(JSON.stringify(data))
  }

  return (
    <Dialog
      open={open}
      size={"sm"}
      handler={() => onClose()}>
      <DialogHeader>{patient ? 'Editar Paciente' : 'Adicionar Paciente'}</DialogHeader>
      <form className="mt-4 mb-2 w-full" onSubmit={handleSubmit(onSubmit)}>
        <DialogBody divider className="h-full flex gap-6">
          <div className="mb-4 flex flex-col gap-6  w-full">
            <Input size="lg" label="Name" {...register("name", { required: true, maxLength: 20 })} />
            <Input size="lg" label="Altura (cm)" {...register("height", { required: true })} />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select label="Sexo" {...field}>
                  <Option value="M">Masculino</Option>
                  <Option value="F">Feminino</Option>
                  <Option value="O">Outro</Option>
                </Select>
              )}
            />
            <Input type="date" size="lg" label="Data de Nascimento (opcional)" min="1920-01-01" max="2030-12-31" placeholder="dd-mm-yyyy" {...register("dob")} />
            <Input size="lg" label="Email (opcional)" {...register("email")} />
            <Input size="lg" label="Phone (opcional)" type="tel" {...register("phone")} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" className="mr-1" onClick={() => onClose()}>
            <span>Cancelar</span>
          </Button>
          <Button type="submit" variant="gradient">
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default PatientDialog