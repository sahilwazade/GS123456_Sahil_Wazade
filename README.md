# Data Viewer Application

This is a React TypeScript application for managing Stores, SKUs, and Planning data through an AG-Grid-based interface. The app also includes Charts for visualizing GM Dollars and GM %, and provides CRUD operations for Store and SKU dimensions.

---

## ✅ Project Structure

```
data_viewer/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddButton.tsx
│   │   ├── DeleteButton.tsx
│   │   ├── GridComponent.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── data/
│   │   ├── Calculations.ts
│   │   ├── CalenderData.ts
│   │   ├── ChartsData.ts
│   │   ├── PlanningData.ts
│   │   ├── SKUsData.ts
│   │   └── StoreData.ts
│   ├── pages/
│   │   ├── ChartsComponent.tsx
│   │   ├── PlanningComponent.tsx
│   │   ├── SkusComponent.tsx
│   │   └── StoreComponent.tsx
│   ├── store/
│   │   ├── skusSlice.ts
│   │   ├── store.ts
│   │   └── storeSlice.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.ts
```

---

## ✅ Features

1. **Top Navigation Bar**

   - Displays the company logo on the left.

2. **Left Sidebar Navigation**

   - Icons and labels for navigating different screens:
     - Store
     - SKU
     - Planning
     - Charts

3. **Store Dimension Screen**

   - Add, remove, update, and reorder Stores.

4. **SKU Dimension Screen**

   - Add, remove, update SKUs, including Prices and Costs.

5. **Planning Screen**

   - Displays an AG-Grid with cross join of Stores and SKUs along rows, Calendar along columns.
   - Editable and calculated columns:
     - **Sales Units**: Editable integers.
     - **Sales Dollars**: Auto-calculated (Sales Units \* Price).
     - **GM Dollars**: Auto-calculated (Sales Dollars – Sales Units \* Cost).
     - **GM %**: Auto-calculated (GM Dollars / Sales Dollars) with conditional cell coloring:
       - Green (≥ 40%)
       - Yellow (≥ 10% and < 40%)
       - Orange (≥ 5% and < 10%)
       - Red (≤ 5%)

6. **Charts Screen**

   - Dual-axis bar chart for GM Dollars and GM % by Week.
   - Aggregates GM Dollars and Sales Dollars across SKUs for each Store.

7. **Responsive Design**
   - Minimum width: 1080px.
   - Grid and Chart fit edges of the screen with proper margins and padding.

---

## ✅ Installation & Running

```bash
# Clone the repository
git clone https://github.com/sahilwazade/GS123456_Sahil_Wazade.git

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## ✅ Technologies Used

- React 18 + TypeScript
- AG-Grid
- Redux Toolkit (Store management)
- TailwindCSS (for responsive design and styling)
- Charts library - recharts

---

## ✅ Author

- Sahil Wazade
- sahilwazade1996@gmail.com

---
