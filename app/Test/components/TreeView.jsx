'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import 'devextreme/dist/css/dx.light.css';
import Link from 'next/link';

// Cargar TreeView solo en el cliente
const TreeView = dynamic(() => import('devextreme-react/tree-view'), {
  ssr: false,
});

const dataSource = [
  { text: 'Item 1', expanded: true, items: [
    { text: 'Item 1.1' },
    { text: 'Item 1.2' },
    { text: 'Item 1.3' }
  ] },
  { text: 'Item 2', expanded: true, items: [
    { text: 'Item 2.1' },
    { text: 'Item 2.2' },
    { text: 'Item 2.3' }
  ] },
  { text: 'Item 3', expanded: true, items: [
    { text: 'Item 3.1' },
    { text: 'Item 3.2' },
    { text: 'Item 3.3' }
  ] }
];

const templateItem = (itemData) => {
  return (
    <div>
      <Link href={'/Modules'}>{itemData.text}</Link>
    </div>
  );
};

export default function Menu() {
  return (
    <div className="App">
      <TreeView
        dataSource={dataSource}
        itemRender={templateItem}
      />
    </div>
  );
}
