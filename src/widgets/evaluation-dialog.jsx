import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Alert,
  Avatar
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import dialFeature from "../assets/images/dial_feature.jpg"

const ExamDialog = ({ exam, patient, open, onClose, quickexam }) => {
  const { register, handleSubmit, control } = useForm({ defaultValues: {
    name: patient.name,
    height: patient.height,
    ...exam,
  }});
  
  const onSubmit = data => {
    alert(JSON.stringify(data))
  }

  return (
    <Dialog
      open={open}
      size={"sm"}
      handler={() => onClose()}>
      <DialogHeader>Nova Avaliação</DialogHeader>
      <form className="mt-4 mb-2 w-full" onSubmit={handleSubmit(onSubmit)}>
        <DialogBody divider className="h-full flex gap-6">
          <div className="mb-4 flex flex-col gap-6  w-full">
            <Input size="lg" label="Name" {...register("name", { required: true, maxLength: 20 })} disabled={quickexam} />
            <Alert className="py-2" color="blue-gray">Faça o exame e insira o resultado da balança:</Alert>
            <div className="text-center">
              <img src={dialFeature} alt="avatar" className="rounded-lg border p-2 w-32 h-auto" />
            </div>
            <Input size="lg" label="Altura (cm)" {...register("height", { required: true })} />
            <Input size="lg" label="Peso (kg)" {...register("weight", { required: true } )} />
            <Input size="lg" label="% Gordura" {...register("bf", { required: true } )} />
            <Input size="lg" label="Massa Muscular (kg)" {...register("muscle", { required: true } )} />
            <Input size="lg" label="IMC" {...register("bmi", { required: true } )} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" className="mr-2" onClick={() => onClose()}>
            <span>Cancelar</span>
          </Button>
          <Button variant="outlined" className="mr-2" onClick={() => onClose()}>
            <span>Imprimir</span>
          </Button>
          <Button variant="outlined" className="mr-2" onClick={() => onClose()}>
            <span>Download PDF</span>
          </Button>
          <Button type="submit" variant="gradient">
            <span>Salvar</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default ExamDialog