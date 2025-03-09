import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
  onClick: () => void;
}
const DeleteButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="text-black center text-xl px-2 py-1 rounded"
    >
      <RiDeleteBinLine />
    </button>
  );
};

export default DeleteButton;
