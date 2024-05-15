import React from 'react'
import Header from '../AllProductsComponent/Layout/Header'
import ListOfCategory from './ListOfCategory'


const Categorylistcom = () => {


  return (
    <div className='AllProductscomp_admin'>
      <Header
        title={"Add Category"}
        link={"/admin/create/category"}
      />
      <ListOfCategory />
    </div>
  )
}

export default Categorylistcom