import React from 'react'
import Header from '../AllProductsComponent/Layout/Header'
import AdminAllArtists from './AdminAllArtists'


const Artisitlistcom = () => {
  return (
    <div className='AllProductscomp_admin'>
      <Header
        title={"Add Parent Category"}
        link={"/admin/create/artist"}
      />
      <AdminAllArtists />
    </div>
  )
}

export default Artisitlistcom