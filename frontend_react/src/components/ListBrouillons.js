import { Box, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import Brouillon from './Brouillon'
import InfosBrouillon from './InfosBrouillon'
import PaginationForm from './PaginationForm';
function ListBrouillons({ notes, setValue, setCurrentId, setElementState, setModaliteState, setActiveStep, modalitesUniqueFilter, setEditingBrouillon }) {
  const brouillons = notes.filter((n) => { return n.brouillon })
  const [currentPage, setCurrentPage] = useState(1);
  const [brouillonsPerPage] = useState(3);
  // Get current Brouillons
  const indexOfLastPost = currentPage * brouillonsPerPage;
  const indexOfFirstPost = indexOfLastPost - brouillonsPerPage;
  const currentBrouillons = brouillons.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <Grid container columnSpacing={8} rowSpacing={2}>

      <Grid item xs={12} md={4}>
        <InfosBrouillon brouillons={brouillons} />
        {
          brouillons.length > brouillonsPerPage &&
          <Paper sx={{ mt: 1, p: 2, textAlign:"center" ,alignItems:"center",justifyContent:"center",display:"flex"}}>
            <PaginationForm
              postsPerPage={brouillonsPerPage}
              totalPosts={brouillons.length}
              paginate={paginate}
              currentPage={currentPage}
            
            />
          </Paper>
        }
      </Grid>

      <Grid item xs={12} md={8} >
        {brouillons.length > 0 ?
          currentBrouillons.slice().reverse().map((b) => (
            <Brouillon item={b} key={b?.idNote} setValue={setValue} setCurrentId={setCurrentId} setElementState={setElementState} setModaliteState={setModaliteState} setActiveStep={setActiveStep} modalitesUniqueFilter={modalitesUniqueFilter} setEditingBrouillon={setEditingBrouillon} />
          ))
          : (
            <Box alignItems="center" display="flex" flexDirection="column"  >
              <div style={{ width: "90%", margin: "auto", display: "flex", alignItems: "center", flexDirection: "column", paddingTop: 90 }}>
                <svg width="100" height="100" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg>
                <p>Pas de Brouillons</p>
              </div>
            </Box>
          )}

      </Grid>

    </Grid>
  )
}

export default ListBrouillons