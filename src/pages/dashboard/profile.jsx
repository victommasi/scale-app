import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Menu,
  MenuHandler,
  IconButton,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import { patientsTableData, projectsData } from "@/data";
import Avaname from "@/widgets/avaname";
import { getAgeFromBirth } from "@/utils/dateUtils";
import { evaluationTableData } from "@/data/evaluation-table-data";
import { useState } from "react";
import ExamDialog from "@/widgets/exam-dialog";
import PatientDialog from "@/widgets/patient-dialog";

export function Profile({user}) {
  const { name, phone, email, height, gender, dob} = user;
  const [isOpenExam, setIsExamOpen] = useState(false);
  const [isOpenPatient, setIsPatientOpen] = useState(false);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avaname name={name} size="lg" />
              <Typography variant="h5" color="blue-gray" className="mb-1">
                {name}
              </Typography>
            </div>
            <div className="flex">
              <Button color="blue-gray" className="flex items-center gap-2" onClick={() => setIsExamOpen(true)}>
                <PlusCircleIcon className="h-5 w-5" />
                Nova Avaliação
              </Button>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <ProfileInfoCard
              title="Detalhes"
              details={{
                Altura: height,
                Idade: getAgeFromBirth(dob),
                Sexo: gender,
                email,
                Telefone: phone,
              }}
              action={
                <Tooltip content="Editar" color="blue-gray">
                  <IconButton variant="text" size="lg" onClick={() => setIsPatientOpen(true)}>
                    <i className="fas fa-pencil" />
                  </IconButton>
                </Tooltip>
              }
            />
          </div>
          <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Avaliações
            </Typography>
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Data", "Peso (kg)", "% Gordura", "Massa Muscular (kg)", "BMI", ""].map((el) => (
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
                {evaluationTableData.map((patient, key) => {
                    const className = `py-3 px-5 ${
                      key === evaluationTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    return (
                      <Link to="/paciente" role="button" key={patient.id} className="table-row hover:bg-blue-gray-50 transition-colors">
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {patient.date}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {patient.weight}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {patient.bf}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {patient.muscle}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {patient.bmi}
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
                                  }}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                      Imprimir
                                    </Typography>
                                  </button>
                                </MenuItem>
                                <MenuItem className="p-0">
                                  <button type="button" className="px-2 pt-[9px] pb-3 w-full text-left" onClick={() => {
                                  }}>
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                      Download (PDF)
                                    </Typography>
                                  </button>
                                </MenuItem>
                                <MenuItem className="p-0">
                                  <button type="button" className="px-2 pt-[9px] pb-3 w-full text-left" onClick={() => {}}>
                                    <Typography className="text-xs font-semibold text-red-500">
                                      Excluir
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
          </div>
        </CardBody>
      </Card>
      {isOpenExam && <ExamDialog patient={user} open={isOpenExam} onClose={() => setIsExamOpen(false)} />}
      {isOpenPatient && <PatientDialog patient={user} open={isOpenPatient} onClose={() => setIsPatientOpen(false)} />}
    </>
  );
}

export default Profile;
