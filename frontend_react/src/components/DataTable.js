import * as React from 'react';
import PropTypes from 'prop-types';
//import { useDemoData } from '@mui/x-data-grid-generator';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
} from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import { Paper } from '@mui/material';
const getJson = (apiRef) => {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  // Stringify with some indentation
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters
  return JSON.stringify(data, null, 2);
};

const exportBlob = (blob, filename) => {
  // Save the blob in a json file
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  });
};

const JsonExportMenuItem = (props) => {
  const apiRef = useGridApiContext();

  const { hideMenu } = props;

  return (
    <MenuItem
      onClick={() => {
        const jsonString = getJson(apiRef);
        const blob = new Blob([jsonString], {
          type: 'text/json',
        });

        exportBlob(blob, 'table.json');

        // Hide the export menu after the export
        hideMenu?.();
      }}
    >
      Export JSON
    </MenuItem>
  );
};

JsonExportMenuItem.propTypes = {
  hideMenu: PropTypes.func,
};

const csvOptions = { delimiter: ';' };

const CustomExportButton = (props) => (
  <GridToolbarExportContainer {...props}>
    <GridCsvExportMenuItem options={csvOptions} />
    <JsonExportMenuItem />
  </GridToolbarExportContainer>
);

const CustomToolbar = (props) => (
  <GridToolbarContainer {...props} /*sx={{display:"flex",justifyContent:"space-between"}}*/>
    <CustomExportButton />
    {/* <div style={{marginRight:5}}>
    
      <AddCircleIcon color='success' sx={{mr:1,cursor:"pointer"}} />
      <DeleteIcon color='error'  sx={{mr:1,cursor:"pointer"}}/>
      <EditIcon color='secondary'  sx={{mr:1,cursor:"pointer"}}/>
      <Tooltip title="import cvs"  arrow={true}>
      <AttachFileIcon color='primary'  sx={{mr:1,cursor:"pointer"}}/>
      </Tooltip>
      
    </div> */}
  </GridToolbarContainer>
);

export default function DataTable({rows, columns,displayToolBar=true,typeId="code", isIdRowField=false,heightTable= 530,bgColorHeader="#b9b8b2",pageSizeProps=10}) {
 
const MyCustomNoRowsOverlay = () => (
 <div style={{ width:"90%",margin:"auto", display:"flex", alignItems:"center", flexDirection:"column",paddingTop : 90}}>
  <svg width="100" height="100" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>
  <p>No Data</p>
 </div>
);
  const [pageSize, setPageSize] = React.useState(pageSizeProps);

  return (
    <Paper sx={{ height: heightTable, width: '100%', "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar":{display: "flex",alignItems:"baseline"} }}>
      <DataGrid
      sx={{ fontFamily:"Montserrat",  fontWeight:"500",pl:0, '& .super-app-theme--header': {
        backgroundColor:bgColorHeader,//'rgba(255, 7, 0, 0.55)'
        color: "white",
      },}}
       rows={rows}
    
       columns={columns}
       //pour corriger ce erreur
       //Alternatively, you can use the `getRowId` prop to specify a custom id for each row.
       //A row was provided without id in the rows prop
      //  getRowId={(row) => isIdRowField ? row.id : row.code}
      getRowId={(row) => {
        if(typeId==="code") return row.code
        if(typeId==="id") return row.id
        if(typeId==="idNote") return row.idNote
        else return row.id
      } }


       pageSize={pageSize}
       onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
       rowsPerPageOptions={[5, 10, 20]}
       disableColumnSelector= {true}
       //onRowClick={(rows)=>{setCurrentId(rows.id)}}
       //components={displayToolBar ? {  Toolbar: CustomToolbar } : {}}
       components={ {NoRowsOverlay: MyCustomNoRowsOverlay ,Toolbar :  displayToolBar&& CustomToolbar  } }
      />
    </Paper>
  );
}
