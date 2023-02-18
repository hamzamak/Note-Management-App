import React, { useState } from 'react';
import {  Table, Tag, Transfer } from 'antd';
import difference from 'lodash/difference';
import { useSelector } from 'react-redux';
// Customize Table Transfer
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{
            pointerEvents: listDisabled ? 'none' : undefined,
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
          />
          );
        }}
  </Transfer>
);


 
const TransferList = ({dataSource,targetKeys, setTargetKeys}) => {
  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const notes = useSelector(state => state.professeurReducers.notes)

  // pour lister modalite d'un element aller chercher dans note table
 const notesFilterParElement = (elementID) => notes.filter((n) => n.element.id === elementID) //selon id recupere select drop menu  utile dans la methode suivante modalitesUniqueFilter

 const modalitesUniqueFilter = (elementID) => { // utile pour initialiser stepper
     const modalitesFilter = notesFilterParElement(elementID).map((n) => { return n.modalite })

     let uniqueModalites = modalitesFilter.filter((ele, ind) => ind === modalitesFilter.findIndex(elem => elem.id === ele.id)) // remove dupliquated modalites (par index) return table modalites
     return uniqueModalites;
    }
    console.log(modalitesUniqueFilter(1))

const leftTableColumns = [
  {
    dataIndex: 'nom',
    title: 'Nom', 
  },
  {
    dataIndex: 'id',
    title: 'Modalite',
    render: (id) => <Tag color='#764ba2'>{modalitesUniqueFilter(id).length ===0 ? <DoDisturbIcon fontSize='small' sx={{fontSize:18,p:0.1}}/> :modalitesUniqueFilter(id).map((item)=> (
      <span>{item?.nom} {item?.coefficient * 100 + "%"}  </span>
    ))}</Tag>
  },
  {
    dataIndex: 'isValid',
    title: 'valide?',
    render: (isValid) => isValid ? 'true' :'false' 
  },

  {
    dataIndex: 'professeur',
    title: 'Professeur',
    render: (professeur) => <Tag>{!professeur ? "null"  : professeur?.nom +" " +professeur?.prenom}</Tag>
  },
  {
    dataIndex: 'module',
    title: 'Module',
    render: (module) => <Tag color="cyan">{!module ? "null"  : module?.nom}</Tag>
  },
  {
    dataIndex: 'coefficient',
    title: 'coefficient',
    render: (coefficient) => coefficient * 100 + "%"
  },
];
const rightTableColumns = [
  {
    dataIndex: 'nom',
    title: 'Nom',
  },
];
  return (
    <>
      <TableTransfer
      
       rowKey={(record) => record.id} 
       titles={['Source', 'Target']}
        dataSource={dataSource}
        targetKeys={targetKeys}
        showSearch={true}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.nom.indexOf(inputValue) !== -1 || item.module?.nom.indexOf(inputValue) !== -1  || item.isValid.toString().indexOf(inputValue) !== -1
          || item.professeur ? item.professeur?.nom.toString().indexOf(inputValue) !== -1 : 'null'.toString().indexOf(inputValue) !== -1 //car professeur un objet qui peut etre null 
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
        
      />
    </>
  );
};

export default TransferList;