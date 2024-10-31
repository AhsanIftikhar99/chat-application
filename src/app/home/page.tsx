import { Box } from '@mui/material'
import SideMenu from '../common/SideMenu'
import welcomeIcom from "@/app/assets/images/welcome.svg"

export default function Home() {
  return (
    <Box sx={{background:'white', width:'100%', mt:'60px', display:'flex'}}>
      <SideMenu />
      <Box
        sx={{
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width:'100%',
        }}
      >
        <img src={welcomeIcom.src} alt="welcome" style={{width:'100%', maxWidth:'400px'}} />
      </Box>
    </Box>
  )
}
