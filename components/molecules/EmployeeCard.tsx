import Button from '@components/atoms/Button';
import Text from '@components/atoms/Text';
import { MdEdit } from 'react-icons/md'; // Import edit icon
import { RiDeleteBin6Line } from 'react-icons/ri'; // Import delete icon

interface EmployeeCardProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  onEdit: () => void;
  onDelete: () => void;
}

const EmployeeCard = ({ firstName, lastName, email, phoneNumber, gender, onEdit, onDelete }: EmployeeCardProps) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow transition-shadow duration-200 hover:shadow-lg">
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{`${firstName} ${lastName}`}</h5>
        <p className="mb-3 font-normal text-gray-700">{email}</p>
        <p className="mb-3 font-normal text-gray-700">{phoneNumber}</p>
        <p className="mb-3 font-normal text-gray-700">{gender}</p>

        <div className="flex justify-end space-x-3 mt-4">
          <Button
            onClick={onEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            <MdEdit className="h-5 w-5 mr-1" aria-hidden="true" /> Edit
          </Button>
          <Button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            <RiDeleteBin6Line className="h-5 w-5 mr-1" aria-hidden="true" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
