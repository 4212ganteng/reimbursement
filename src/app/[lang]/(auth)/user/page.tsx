// MUI Imports
import Grid from '@mui/material/Grid'

import type { UsersType } from '@/types/userTypes'

// Type Imports

// Component Imports


const UserList = ({ userData }: { userData?: UsersType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* <UserListCards /> */}
      </Grid>
      <Grid item xs={12}>
        <UserList tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default UserList
