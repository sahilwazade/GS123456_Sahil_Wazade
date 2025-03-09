import { useMemo } from "react";
import { storeData } from "../data/StoreData";
import { skusData } from "../data/SKUsData";
import { calenderData } from "../data/CalenderData";
import { calculations } from "../data/Calculations";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ColDef, ColGroupDef, ModuleRegistry } from "ag-grid-community";
import GridComponent from "../components/GridComponent";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const createCalculationMap = () => {
  const map = new Map<string, (typeof calculations)[number]>();

  calculations.forEach(({ Store, SKU, Week, ...rest }) => {
    const key = `${Store}-${SKU}-${Week}`;
    map.set(key, { Store, SKU, Week, ...rest });
  });

  return map;
};
const buildMergedData = (
  calcMap: Map<string, (typeof calculations)[number]>
) => {
  const merged: any[] = [];

  storeData.forEach((store) => {
    skusData.forEach((sku) => {
      const row: any = {
        StoreLabel: store.Label,
        SKULabel: sku.Label,
        StoreID: store.ID,
        SKUID: sku.ID,
      };

      calenderData.forEach((week) => {
        const key = `${store.ID}-${sku.ID}-${week.Week}`;
        const calc = calcMap.get(key);

        row[`${week.Week}-Sales Units`] = calc?.["Sales Units"] ?? 0;
        row[`${week.Week}-Sales Dollars`] = calc?.["Sales Dollars"] ?? 0;
        row[`${week.Week}-Cost Dollars`] = calc?.["Cost Dollars"] ?? 0;
        row[`${week.Week}-GM Dollars`] = calc?.["GM Dollars"] ?? 0;
        row[`${week.Week}-GM %`] = calc?.["GM %"] ?? 0;
      });

      merged.push(row);
    });
  });

  return merged;
};

const createColumnDefs = () => {
  const monthMap = new Map<
    string,
    { monthLabel: string; weeks: ColGroupDef[] }
  >();

  calenderData.forEach(
    ({ Month, "Month Label": monthLabel, "Week Label": weekLabel, Week }) => {
      if (!monthMap.has(Month)) {
        monthMap.set(Month, { monthLabel, weeks: [] });
      }

      const weekGroup: ColGroupDef = {
        headerName: weekLabel,
        headerClass: "center-header",
        children: [
          createNumberCol(`${Week}-Sales Units`, "Sales Units", 120),
          createCurrencyCol(`${Week}-Sales Dollars`, "Sales Dollars", 140),
          createCurrencyCol(`${Week}-Cost Dollars`, "Cost Dollars", 140),
          createCurrencyCol(`${Week}-GM Dollars`, "GM Dollars", 140),
          createGMPercentCol(`${Week}-GM %`, "GM %", 100),
        ],
      };

      monthMap.get(Month)?.weeks.push(weekGroup);
    }
  );

  const dynamicColumns: ColGroupDef[] = Array.from(monthMap.values()).map(
    ({ monthLabel, weeks }) => ({
      headerName: monthLabel,
      children: weeks,
      headerClass: "center-header",
    })
  );

  return [
    createPinnedCol("StoreLabel", "Store"),
    createPinnedCol("SKULabel", "SKU"),
    ...dynamicColumns,
  ];
};

const createPinnedCol = (field: string, headerName: string): ColDef => ({
  headerName,
  field,
  pinned: "left",
  sortable: true,
  filter: true,
});

const createNumberCol = (
  field: string,
  headerName: string,
  width: number
): ColDef => ({
  headerName,
  field,
  width,
  cellStyle: { textAlign: "right" },
});

const createCurrencyCol = (
  field: string,
  headerName: string,
  width: number
): ColDef => ({
  headerName,
  field,
  width,
  cellStyle: { textAlign: "right" },
  valueFormatter: (params) => {
    const value = params.value;
    return value && value !== 0 ? `$${Number(value).toFixed(2)}` : `$0.00`;
  },
});

const createGMPercentCol = (
  field: string,
  headerName: string,
  width: number
): ColDef => ({
  headerName,
  field,
  width,
  cellStyle: (params) => getGMCellStyle(params.value),
  valueFormatter: (params) => {
    const rawValue = params.value || 0;
    const percentage = rawValue * 100;
    return `${percentage.toFixed(1)}%`;
  },
});

const getGMCellStyle = (value: number = 0) => {
  const percentage = value * 100;

  if (percentage >= 40) {
    return { backgroundColor: "green", color: "white", textAlign: "right" };
  } else if (percentage >= 10) {
    return { backgroundColor: "yellow", color: "black", textAlign: "right" };
  } else if (percentage > 5) {
    return { backgroundColor: "orange", color: "black", textAlign: "right" };
  } else {
    return { backgroundColor: "red", color: "white", textAlign: "right" };
  }
};

const PlanningComponent = () => {
  const calcMap = useMemo(() => createCalculationMap(), []);
  const mergedData = useMemo(() => buildMergedData(calcMap), [calcMap]);
  const columnDefs = useMemo(() => createColumnDefs(), []);

  return (
    <div className="ag-theme-alpine" style={{ height: "79vh", width: "100%" }}>
      <GridComponent rowData={mergedData} columnDefs={columnDefs} />
    </div>
  );
};

export default PlanningComponent;
