interface Props {
  onClick: () => void;
  label?: string;
}
const DeleteButton = ({ onClick, label = "Delete" }: Props) => {
  return (
    <>
      <button
        onClick={onClick}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        {label}
      </button>
    </>
  );
};

export default DeleteButton;
