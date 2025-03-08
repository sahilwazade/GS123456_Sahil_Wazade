interface Props {
  onClick: () => void;
  label?: string;
}

const AddButton = ({ onClick, label }: Props) => {
  return (
    <>
      <button
        onClick={onClick}
        style={{
          marginTop: 10,
          padding: "7px 20px",
          background: "#FFAB91",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "18px",
        }}
      >
        {label}
      </button>
    </>
  );
};

export default AddButton;
