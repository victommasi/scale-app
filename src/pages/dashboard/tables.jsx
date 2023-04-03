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
  Checkbox,
  Select,
  Option
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { Link } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PatientDialog from "@/widgets/patient-dialog";
import Avaname from "@/widgets/avaname";
import { getAgeFromBirth } from "@/utils/dateUtils";


export const Tables = () => {
  const [filteredPatients, setFilteredPatients] = useState(authorsTableData);
  const [open, setIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filterPatient = (e) => {
    const { value } = e.target;
    setFilteredPatients(authorsTableData.filter((patient) => {
      return patient.name.toLowerCase().includes(value.toLowerCase());
    }))
  }

  const onClose = () => {
    setSelectedPatient(null);
    setIsOpen(false);
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6 flex justify-end">
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
              {filteredPatients.map((patient, key) => {
                  const className = `py-3 px-5 ${
                    key === filteredPatients.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <Link key={patient.id} className="table-row" to={patient.id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avaname name={patient.name} size="md" />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {patient.name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {patient.email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient.phone}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {getAgeFromBirth(patient.dob)}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {patient.gender}
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
                              <MenuItem className="p-0">
                                <button type="button" className="px-2 pt-[9px] pb-3 w-full text-left" onClick={() => {
                                  setSelectedPatient(patient)
                                  setIsOpen(true)
                                }}>
                                  <Typography className="text-xs font-semibold text-blue-gray-600">
                                    Editar Paciente
                                  </Typography>
                                </button>
                              </MenuItem>
                              <MenuItem className="p-0">
                                <button type="button" className="px-2 pt-[9px] pb-3 w-full text-left" onClick={() => {}}>
                                  <Typography className="text-xs font-semibold text-red-500">
                                    Remover
                                  </Typography>
                                </button>
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
      {open && <PatientDialog patient={selectedPatient} open={open} onClose={onClose} />}
    </div>
  );
}

export default Tables;
