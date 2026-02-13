"use client";

import React, { forwardRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

// define Med type
interface Medicine {
  id: number | null;
  name: string;
  category: string;
  brand: string;
  country: string;
  price: number;
  stock: number;
  status: string;
}

// Props interface
interface MedicineTableProps {
  products: Medicine[];
  onEdit: (product: Medicine) => void;
  onDelete: (product: Medicine) => void;
  globalFilter?: string;
}

// Use forwardRef with correct types
const MedicineTable = forwardRef<DataTable<any>, MedicineTableProps>(
  ({ products, onEdit, onDelete, globalFilter = '' }, ref) => {
    const getSeverity = (status: string) => {
      switch (status) {
        case 'In Stock':
          return 'success';
        case 'Low Stock':
          return 'warning';
        case 'Out of Stock':
          return 'danger';
        default:
          return null;
      }
    };

    const statusBodyTemplate = (rowData: Medicine) => {
      return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const priceBodyTemplate = (rowData: Medicine) => {
      return `ETB ${rowData.price}`;
    };

    const actionBodyTemplate = (rowData: Medicine) => {
      return (
        <div className="flex gap-2">
          <Button
            icon="pi pi-pencil"
            rounded
            outlined
            className="mr-2"
            onClick={() => onEdit(rowData)}
          />
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={() => onDelete(rowData)}
          />
        </div>
      );
    };

    return (
      <div className="card">
        <DataTable
          ref={ref}
          value={products}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} medicines"
          globalFilter={globalFilter}
          dataKey="id"
          sortMode="multiple"
        >
          {/* Column order*/}
          <Column field="name" header="Medicine Name" sortable style={{ minWidth: '16rem' }} />
          <Column field="category" header="Category" sortable style={{ minWidth: '12rem' }} />
          <Column field="brand" header="Brand" sortable style={{ minWidth: '10rem' }} />
          <Column field="country" header="Country" sortable style={{ minWidth: '8rem' }} />
          <Column field="price" header="Price (ETB)" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }} />
          <Column field="stock" header="Stock" sortable style={{ minWidth: '6rem' }} />
          <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '8rem' }} />
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
        </DataTable>
      </div>
    );
  }
);

MedicineTable.displayName = 'MedicineTable';

export default MedicineTable;