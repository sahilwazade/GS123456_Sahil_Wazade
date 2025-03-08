import { AgGridReact } from "@ag-grid-community/react";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { RefObject, useRef } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface Props<T> {
  rowData: T[];
  columnDefs: ColDef<T>[];
  gridRef?: RefObject<AgGridReact<T>> | null;
  onCellValueChanged?: (params: any) => void;
}

const GridComponent = <T,>({
  rowData,
  columnDefs,
  gridRef,
  onCellValueChanged,
}: Props<T>) => {
  const localGridRef = useRef<AgGridReact<T>>(null);
  const actualGridRef = gridRef ?? localGridRef;
  return (
    <>
      {" "}
      <div
        className="ag-theme-alpine"
        style={{ height: "79vh", width: "100%" }}
      >
        <AgGridReact<T>
          ref={actualGridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowModelType="clientSide"
          defaultColDef={{ editable: true }}
          rowDragManaged={true}
          animateRows={true}
          onCellValueChanged={(params) => {
            if (onCellValueChanged) {
              onCellValueChanged(params);
            }
          }}
        />
      </div>
    </>
  );
};

export default GridComponent;
