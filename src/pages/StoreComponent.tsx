import { StoreDataType } from "../data/StoreData";
import { CellValueChangedEvent } from "ag-grid-community";
import { useRef, useState } from "react";
import GridComponent from "../components/GridComponent";
import { RiDeleteBinLine } from "react-icons/ri";
import AddButton from "../components/AddButton";
import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addStore, deleteStore, updateStore } from "../store/storeSlice";
import { ColDef } from "@ag-grid-community/core";

const StoreComponent = () => {
  const [tempRows, setTempRows] = useState<{ [key: string]: StoreDataType }>(
    {}
  );

  const dispatch = useDispatch();
  const rowData = useSelector((state: RootState) => state.store.stores).map(
    (row) => ({
      ...row,
      ...(tempRows[row.ID] || {}),
    })
  );

  const gridRef = useRef<AgGridReact<StoreDataType>>(null);

  const handleDelete = (seqNo: number) => {
    dispatch(deleteStore(seqNo));
  };

  const handleAdd = () => {
    dispatch(addStore());
  };

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

  const columnDefs: ColDef<StoreDataType>[] = [
    {
      headerName: "",
      width: 50,
      cellRenderer: (params: ICellRendererParams) => {
        return React.createElement(
          "button",
          {
            onClick: () => handleDelete(params.data.SeqNo),
            className: "text-black center text-xl px-2 py-1 rounded",
          },
          <RiDeleteBinLine />
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
      field: "SeqNo",
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
