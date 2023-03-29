import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { Link } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";


export const Tables = () => {
  const [filteredPatients, setFilteredPatients] = useState(authorsTableData);
  const [open, setIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const getAge = (date) => {
    const dob = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  const filterPatient = (e) => {
    const { value } = e.target;
    setFilteredPatients(authorsTableData.filter((patient) => {
      return patient.name.toLowerCase().includes(value.toLowerCase());
    }))
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6 flex justify-end">
          {/* <Typography variant="h6" color="white" className="flex items-center gap-2">
            Pacientes
          </Typography> */}
          <Button color="blue-gray" className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
            <PlusCircleIcon className="h-5 w-5" />
            Adicionar
          </Button>
        </CardHeader>
        <CardBody className="overflow-auto px-0 pt-0 pb-2">
          <div className="w-72 px-4 py-2">
            <Input label="Pesquisar" size="lg" onChange={filterPatient}/>
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["nome/email", "telefone", "idade", "sexo", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(
                ({ name, email, phone, gender, dob, id }, key) => {
                  const className = `py-3 px-5 ${
                    key === filteredPatients.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <Link key={name} className="table-row" to={id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-gray-500 text-white text-sm">
                              {name.match(/\b\w/g).join('')}
                            </div>
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {phone}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {getAge(dob)}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {gender}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Menu placement="left-start">
                            <MenuHandler>
                              <IconButton size="sm" variant="text" color="blue-gray">
                                <EllipsisVerticalIcon
                                  strokeWidth={3}
                                  fill="currenColor"
                                  className="h-6 w-6"
                                />
                              </IconButton>
                            </MenuHandler>
                            <MenuList>
                              <MenuItem>
                                <Link to="">
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    Editar Paciente
                                  </Typography>
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <Link to="">
                                  <Typography className="text-xs font-semibold text-red-500">
                                    Remover
                                  </Typography>
                                </Link>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </td>
                    </Link>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <PatientDialog patient={selectedPatient} open={open} setIsOpen={setIsOpen} />
    </div>
  );
}

const PatientDialog = ({ selectedPatient, open, setIsOpen }) => {
  return (
    <Dialog
      open={open}
      size={"lg"}
      handler={() => setIsOpen(false)}>
      <DialogHeader>{selectedPatient ? 'Editar Paciente' : 'Adicionar Paciente'}</DialogHeader>
      <DialogBody divider className="h-96">
        <form className="mt-4 mb-2 w-full">
          <div className="flex gap-6">
            <div className="mb-4 flex flex-col gap-6  w-full">
              <Input size="lg" label="Name" />
              <Input size="lg" label="Email" />
              <Input type="password" size="lg" label="Password" />
            </div>
            <div className="mb-4 flex flex-col gap-6  w-full">
              <Input size="lg" label="Name" />
              <Input size="lg" label="Email" />
              <Input type="password" size="lg" label="Password" />
            </div>
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" className="mr-1" onClick={() => setIsOpen(false)}>
          <span>Cancelar</span>
        </Button>
        <Button variant="gradient" onClick={() => setIsOpen(false)}>
          <span>Confirmar</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default Tables;
