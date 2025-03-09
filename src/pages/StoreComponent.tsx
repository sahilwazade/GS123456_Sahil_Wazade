import { StoreDataType } from "../data/StoreData";
import { useRef, useState } from "react";
import GridComponent from "../components/GridComponent";
import AddButton from "../components/AddButton";
import { AgGridReact } from "@ag-grid-community/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addStore, deleteStore, updateStore } from "../store/storeSlice";
import {
  ColDef,
  ICellRendererParams,
  CellValueChangedEvent,
} from "@ag-grid-community/core";
import DeleteButton from "../components/DeleteButton";

const StoreComponent = () => {
  const [tempRows, setTempRows] = useState<{ [key: string]: StoreDataType }>(
    {}
  );

  // Redux dispatch function to trigger actions (add, update, delete)
  const dispatch = useDispatch();

  // Grabbing the current list of stores from the Redux store
  // If there are temporary row changes (unsaved edits), we merge them in
  const rowData = useSelector((state: RootState) => state.store.stores).map(
    (row) => ({
      ...row,
      ...(tempRows[row.ID] || {}),
    })
  );
  // Ref for accessing the AG Grid instance
  const gridRef = useRef<AgGridReact<StoreDataType>>(null);

  const handleDelete = (seqNo: number) => {
    dispatch(deleteStore(seqNo));
  };

  const handleAdd = () => {
    dispatch(addStore());
  };
  // Called when a cell's value changes
  const handleCellValueChange = (params: CellValueChangedEvent) => {
    const { data, column, newValue, oldValue } = params;
    if (!data || !column || newValue === oldValue) return;

    const field = column.getColId();
    const updatedRow = { ...data, [field]: newValue };

    if (data.ID.startsWith("temp-")) {
      setTempRows((prev) => ({ ...prev, [data.ID]: updatedRow }));
    } else {
      dispatch(updateStore(updatedRow));
    }
  };
  // Column definitions for the AG Grid
  const columnDefs: ColDef<StoreDataType>[] = [
    {
      headerName: "",
      width: 50,
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <DeleteButton onClick={() => handleDelete(params.data["Seq No."])} />
        );
      },
    },
    {
      headerName: "",
      rowDrag: true,
      width: 50,
      cellRenderer: () => "⋮⋮",
    },
    {
      headerName: "S.No",
      width: 150,
      valueGetter: (params) => params.data?.["Seq No."] ?? "",
      sortable: true,
    },
    {
      headerName: "Store",
      field: "Label",
      sortable: true,
      cellStyle: { borderRight: "2px solid #C7CCCF" },
      headerClass: "store-header",
    },
    { headerName: "City", field: "City", sortable: true },
    { headerName: "State", field: "State", sortable: true },
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
        <AddButton onClick={handleAdd} label="New Store" />
      </div>
    </>
  );
};

export default StoreComponent;
