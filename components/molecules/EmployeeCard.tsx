import Image from 'next/image';
import Button from '@components/atoms/Button';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { getGenderDisplay } from '@lib/utils/helpers';

interface EmployeeCardProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  photo?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const EmployeeCard = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  gender,
  photo,
  onEdit,
  onDelete,
}: EmployeeCardProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow transition-shadow duration-200 hover:shadow-lg">
      {photo ? (
        <Image src={photo} alt={firstName} width={350} height={200} />
      ) : (
        <Image
          src="https://robohash.org/default"
          alt={`${firstName} ${lastName}`}
          width={350}
          height={200}
          fetchPriority="high"
        />
      )}
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{`${firstName} ${lastName}`}</h5>
        <a href={`mailto:${email}`} className="mb-3 font-normal text-blue-600 underline">
          {email}
        </a>
        <p className="mb-3 font-normal text-gray-700">{phoneNumber}</p>
        <p className="mb-3 font-medium text-gray-700">{getGenderDisplay(gender)}</p>

        <div className="flex justify-end space-x-3 mt-4">
          <Button
            onClick={onEdit}
            ariaLabel="Edit"
            className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            <MdEdit className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button
            onClick={onDelete}
            ariaLabel="Delete"
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200 delete-button"
          >
            <RiDeleteBin6Line className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
