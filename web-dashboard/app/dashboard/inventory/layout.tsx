// app/dashboard/inventory/layout.tsx
'use client';

import { ReactNode } from 'react';

// rimeeact styles – only for inventory pages(tabel)
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function InventoryLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}