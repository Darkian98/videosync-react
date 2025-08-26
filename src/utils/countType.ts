import { TPackageTicketok } from "src/config/packages";

export type PackageItem = {
  packageItem: TPackageTicketok;
  quantity: number;
};

export const countTypeId = (data: PackageItem[]) => {

  let adultsId = 0;
  let seniorId = 0;
  let studentsId = 0;
  let kidsId = 0;

  data.forEach(({ packageItem, quantity }) => {
    const nombre = packageItem.id

    if (nombre.includes("adults")) {
      adultsId += quantity;
    } else if (nombre.includes("senior")) {
      seniorId += quantity;
    } else if (nombre.includes("students")) {
      studentsId += quantity;
    } else if (nombre.includes("kids")) {
      kidsId += quantity;
    }
  });

  return { adultsId, seniorId, studentsId, kidsId };
}

export const countTypeSelectionTicket = (data: PackageItem[]) => {

  let adultsBasic = 0;
  let adultsPreferentSimple = 0;
  let adultsPreferentComplete = 0;
  let senior = 0;
  let students = 0;
  let kids = 0;

  data.forEach(({ packageItem, quantity }) => {

    // eslint-disable-next-line default-case
    switch (packageItem.ticketType) {
      case 'Básica':
        adultsBasic += quantity;
        break;
      case 'Preferente Simple':
        adultsPreferentSimple += quantity;
        break;
      case 'Preferente Completo':
        adultsPreferentComplete += quantity;
        break;
      case 'Senior':
        senior += quantity;
        break;
      case 'Student': students += quantity;
        break;
      case 'Kid': kids += quantity;
        break;
    }
  });

  return { adultsBasic, adultsPreferentSimple, adultsPreferentComplete, senior, students, kids };
}
