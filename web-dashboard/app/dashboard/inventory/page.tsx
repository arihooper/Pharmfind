"use client";

import { useState, useEffect, useRef } from 'react';
import CollapsibleSidebar from '@/components/dashboard/CollapsibleSidebar';
import { Search, Plus, ChevronDown } from 'lucide-react';
import MedicineTable from '@/components/inventory/MedicineTable';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable'; // for type only

// medicine type may be i can add another
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

// options for dropdowns
const categoryOptions = [
  'Antibiotics', 'Pain Relief', 'Antiplatelet Agent', 'Blood thinner',
  'Gastrointestinal', 'Hormonal Agent', 'Antidiabetic', '2-Drug Single-Tablet Regimen'
];
const statusOptions = ['In Stock', 'Low Stock', 'Out of Stock'];
const countryOptions = ['USA', 'Germany', 'France', 'India', 'UK'];

// Initial empty medicine (id null means new)
const emptyMedicine: Medicine = {
  id: null,
  name: '',
  category: '',
  brand: '',
  country: '',
  price: 0,
  stock: 0,
  status: 'In Stock',
};

export default function InventoryPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [medicines, setMedicines] = useState<Medicine[]>([
  { id: 1, name: 'Amoxicillin 500mg', category: 'Antibiotics', brand: 'Amoxil', country: 'Germany', price: 250, stock: 25, status: 'In Stock' },
  { id: 2, name: 'Paracetamol 500mg', category: 'Pain Relief', brand: 'Tylenol', country: 'USA', price: 300, stock: 0, status: 'Out of Stock' },
  { id: 3, name: 'Clopidogrel', category: 'Antiplatelet Agent', brand: 'Plavix', country: 'France', price: 437, stock: 5, status: 'Low Stock' },
  { id: 4, name: 'Apixaban', category: 'Blood thinner', brand: 'Eliquis', country: 'USA', price: 200, stock: 160, status: 'In Stock' },
  { id: 5, name: 'Omeprazole', category: 'Gastrointestinal', brand: 'OmepraCare', country: 'USA', price: 500, stock: 200, status: 'In Stock' },
  { id: 6, name: 'Insulin', category: 'Hormonal Agent', brand: 'Basalog', country: 'India', price: 120, stock: 500, status: 'In Stock' },
  { id: 7, name: 'Metformin', category: 'Antidiabetic', brand: 'Glucophage', country: 'Germany', price: 300, stock: 125, status: 'In Stock' },
  { id: 8, name: 'Lamivudine', category: '2-Drug Single-Tablet Regimen', brand: 'Dovato', country: 'UK', price: 4, stock: 1500, status: 'Low Stock' },
]);

  // dialog state
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState<Medicine>(emptyMedicine);
  const [submitted, setSubmitted] = useState(false);

  // delete confirm dialog
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Medicine | null>(null);

  // toast for notif
  const toast = useRef<Toast>(null);

  // reference to DataTable to export
  const dt = useRef<DataTable<any>>(null);

  // sync sidebar
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) setIsSidebarCollapsed(savedState === 'true');
    const handleStorageChange = () => {
      const updatedState = localStorage.getItem('sidebarCollapsed');
      setIsSidebarCollapsed(updatedState === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Open new med dialog
  const openNew = () => {
    setProduct(emptyMedicine);
    setSubmitted(false);
    setProductDialog(true);
  };

  // hide dialog
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  // save med (create or update)
  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _medicines = [...medicines];
      let _product = { ...product };

      if (_product.id) {
        // update
        const index = findIndexById(_product.id);
        _medicines[index] = _product;
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Medicine Updated', life: 3000 });
      } else {
        // create new
        _product.id = createId();
        _medicines.push(_product);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Medicine Created', life: 3000 });
      }

      setMedicines(_medicines);
      setProductDialog(false);
      setProduct(emptyMedicine);
    }
  };

  // edit med
  const editProduct = (productData: Medicine) => {
    setProduct({ ...productData });
    setProductDialog(true);
  };

  // confirm delete
  const confirmDeleteProduct = (productData: Medicine) => {
    setProductToDelete(productData);
    setDeleteDialog(true);
  };

  // delete med
  const deleteProduct = () => {
    if (!productToDelete) return;
    let _medicines = medicines.filter((val) => val.id !== productToDelete.id);
    setMedicines(_medicines);
    setDeleteDialog(false);
    setProductToDelete(null);
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Medicine Deleted', life: 3000 });
  };

  // find index by id
  const findIndexById = (id: number) => {
    return medicines.findIndex((item) => item.id === id);
  };

  // generate random id for simple demo)
  const createId = (): number => {
    return Math.floor(Math.random() * 10000) + 1;
  };

  // exporting into CSV
  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  // dialog footer buttons
  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </>
  );

  const deleteDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" outlined onClick={() => setDeleteDialog(false)} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      <Toast ref={toast} />
      <CollapsibleSidebar />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-[90px]' : 'ml-[260px]'
      }`}>
        
        <header className="bg-white border-b border-gray-200 h-[80px] flex items-center px-8">
          <h2 className="text-[#333] text-3xl font-bold">Inventory Management</h2>
        </header>

        <main className="p-8">
          
          {/* search + filter + add + export */}
          <div className="flex items-center gap-6 mb-6">
            {/* for search med */}
            <div className="bg-white h-[48px] w-[600px] flex items-center px-5 shadow-md rounded-[20px] border-none">
              <span className="text-gray-400 mr-3"><Search size={22} /></span>
              <input
                type="text"
                placeholder="Search medicines..."
                className="bg-transparent flex-1 font-medium text-[16px] text-[#333] outline-none placeholder:text-[#aaa] border-none focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* filter */}
            <button className="bg-white h-[48px] w-[100px] rounded-[12px] font-semibold text-[#666] text-[15px] border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-1">
              Filter
              <ChevronDown size={18} className="text-gray-500" />
            </button>

            {/* add medicine(med) */}
            <button
              onClick={openNew}
              className="bg-[#4caf50] h-[52px] w-[159px] rounded-[25px] text-white font-bold hover:bg-[#45a049] transition-all flex items-center justify-center gap-2 shadow-md hover:scale-105"
            >
              <Plus size={22} />
              <span className="text-[15px] text-[#ffffff]">Add Medicine</span>
            </button>

            {/* export */}
            <button
              onClick={exportCSV}
              className="bg-[#fff3e0] text-[#ff9800] h-[48px] px-6 rounded-[12px] font-bold text-sm border border-[#ffe0b2] hover:bg-orange-100 transition-colors shadow-sm flex items-center gap-2 ml-auto"
            >
              <i className="pi pi-upload" style={{ fontSize: '1rem' }}></i>
              Export CSV
            </button>
          </div>

          {/* PrimeReact Table for the med */}
          <MedicineTable
            ref={dt}
            products={medicines}
            onEdit={editProduct}
            onDelete={confirmDeleteProduct}
            globalFilter={searchQuery}
          />

          {/* add/edit Dialog */}
          <Dialog
            visible={productDialog}
            style={{ width: '450px' }}
            header={product.id ? 'Edit Medicine' : 'Add Medicine'}
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
                autoFocus
                className={submitted && !product.name ? 'p-invalid' : ''}
              />
              {submitted && !product.name && <small className="p-error">Name is required.</small>}
            </div>

            <div className="field">
              <label htmlFor="category">Category</label>
              <Dropdown
                id="category"
                value={product.category}
                options={categoryOptions}
                onChange={(e) => setProduct({ ...product, category: e.value })}
                placeholder="Select a Category"
              />
            </div>

            <div className="field">
              <label htmlFor="brand">Brand</label>
              <InputText
                id="brand"
                value={product.brand}
                onChange={(e) => setProduct({ ...product, brand: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="country">Country</label>
              <Dropdown
                id="country"
                value={product.country}
                options={countryOptions}
                onChange={(e) => setProduct({ ...product, country: e.value })}
                placeholder="Select a Country"
              />
            </div>

            <div className="field">
              <label htmlFor="price">Price (ETB)</label>
              <InputNumber
                id="price"
                value={product.price}
                onValueChange={(e) => setProduct({ ...product, price: e.value ?? 0 })}
                mode="currency"
                currency="ETB"
                locale="en-US"
              />
            </div>

            <div className="field">
              <label htmlFor="stock">Stock</label>
              <InputNumber
                id="stock"
                value={product.stock}
                onValueChange={(e) => setProduct({ ...product, stock: e.value ?? 0 })}
              />
            </div>

            <div className="field">
              <label htmlFor="status">Status</label>
              <Dropdown
                id="status"
                value={product.status}
                options={statusOptions}
                onChange={(e) => setProduct({ ...product, status: e.value })}
                placeholder="Select Status"
              />
            </div>
          </Dialog>

          {/* Confirm delete Dialog */}
          <Dialog
            visible={deleteDialog}
            style={{ width: '450px' }}
            header="Confirm"
            modal
            footer={deleteDialogFooter}
            onHide={() => setDeleteDialog(false)}
          >
            <div className="confirmation-content">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {productToDelete && (
                <span>
                  Are you sure you want to delete <b>{productToDelete.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </main>
      </div>
    </div>
  );
}