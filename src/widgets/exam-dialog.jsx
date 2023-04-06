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
import { DocumentChartBarIcon, PrinterIcon } from "@heroicons/react/24/solid";

const ExamDialog = ({ exam = null, patient = null, open, onClose, quickexam }) => {
  const { register, handleSubmit } = useForm({ defaultValues: {
    name: patient?.name,
    height: patient?.height,
    ...exam,
  }});
  
  const onSubmit = data => {
    alert(JSON.stringify(data))
  }

  return (
    <Dialog
      className="overflow-y-auto"
      open={open}
      size={"sm"}
      handler={() => onClose()}>
      <DialogHeader>Nova Avaliação</DialogHeader>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <DialogBody divider className="h-full flex gap-3">
          <div className="mb-4 flex flex-col gap-3  w-full">
            <Input size="lg" label="Name" {...register("name", { required: true, maxLength: 20 })} disabled={!!patient?.id} />
            <Alert className="py-2" color="blue-gray">Faça o exame e insira o resultado da balança nos campos abaixo:</Alert>
            <div className="flex justify-center items-center">
              <img src={dialFeature} alt="avatar" className="rounded-lg border p-2 w-28 h-auto" />
            </div>
            <Input size="lg" label="Altura (cm)" {...register("height", { required: true })} />
            <Input size="lg" label="Peso (kg)" {...register("weight", { required: true } )} />
            <Input size="lg" label="% Gordura" {...register("bf", { required: true } )} />
            <Input size="lg" label="Massa Muscular (kg)" {...register("muscle", { required: true } )} />
            <Input size="lg" label="IMC" {...register("bmi", { required: true } )} />
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <div className="flex justify-evenly w-full">
            <Button className="flex items-center gap-3" variant="text" onClick={() => onClose()}>
              <PrinterIcon strokeWidth={2} className="h-5 w-5" /> Imprimir
            </Button>
            <Button className="flex items-center gap-3" variant="text" onClick={() => onClose()}>
              <DocumentChartBarIcon strokeWidth={2} className="h-5 w-5" /> Download PDF
            </Button>
          </div>
          <div className="flex flex-col w-full">
            <Button type="submit" variant="gradient">
              <span>Salvar</span>
            </Button>
            <Button variant="outlined" className="mt-2" onClick={() => onClose()}>
              <span>Cancelar</span>
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Dialog>
  )
}

export default ExamDialog