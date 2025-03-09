import { useRef, useState } from "react";
import { SkusDataTypes } from "../data/SKUsData";
import { AgGridReact } from "@ag-grid-community/react";
import { ICellRendererParams, CellValueChangedEvent } from "ag-grid-community";
import GridComponent from "../components/GridComponent";
import AddButton from "../components/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addSku, deleteSku, updateSku } from "../store/skusSlice";
import { ColDef } from "@ag-grid-community/core";
import DeleteButton from "../components/DeleteButton";

const SkusComponent = () => {
  // Local state for temporarily holding new (unsaved) SKU rows
  const [tempRows, setTempRows] = useState<{ [key: string]: SkusDataTypes }>(
    {}
  );

  const dispatch = useDispatch(); // Initialize Redux dispatch
  // Retrieve SKU data from Redux store and merge with any unsaved temp rows
  const rowData = useSelector((state: RootState) => state.sku.skus).map(
    (row) => ({
      ...row,
      ...(tempRows[row.ID] || {}),
    })
  );
  // Reference to the AG Grid instance
  const gridRef = useRef<AgGridReact<SkusDataTypes>>(null);

  const handleDelete = (ID: string) => {
    dispatch(deleteSku(ID));
  };

  const handleAdd = () => {
    dispatch(addSku());
  };

  // Handles changes made to any cell within the grid
  const handleCellValueChange = (params: CellValueChangedEvent) => {
    const { data, column, newValue, oldValue } = params;
    if (!data || !column || newValue === oldValue) return;

    const field = column.getColId();
    const updatedRow = { ...data, [field]: newValue };

    if (data.ID.startsWith("temp-")) {
      setTempRows((prev) => ({ ...prev, [data.ID]: updatedRow }));
    } else {
      dispatch(updateSku(updatedRow));
    }
  };

  // Define the column structure for the AG Grid
  const columnDefs: ColDef<SkusDataTypes>[] = [
    {
      headerName: "",
      width: 50,
      cellRenderer: (params: ICellRendererParams) => {
        return <DeleteButton onClick={() => handleDelete(params.data.ID)} />;
      },
    },
    {
      headerName: "SKU",
      field: "Label",
      sortable: true,
      cellStyle: { borderRight: "2px solid #C7CCCF" },
      headerClass: "store-header",
    },
    {
      headerName: "Price",
      field: "Price",
      sortable: true,
      valueFormatter: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      headerName: "Cost",
      field: "Cost",
      sortable: true,
      valueFormatter: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <>
      <div>
        <GridComponent
          rowData={rowData}
          columnDefs={columnDefs}
          gridRef={gridRef}
          onCellValueChanged={handleCellValueChange}
        />
      </div>
      <div>
        <AddButton onClick={handleAdd} label="New SKU" />
      </div>
    </>
  );
};

export default SkusComponent;
