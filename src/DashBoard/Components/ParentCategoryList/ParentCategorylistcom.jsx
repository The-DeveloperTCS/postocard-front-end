import React from 'react'
import Header from '../AllProductsComponent/Layout/Header'
import ListOfParentCategory from './ListOfParentCategory'


const ParentCategorylistcom = () => {


  return (
    <div className='AllProductscomp_admin'>
      <Header
        title={"Add Category"}
        link={"/admin/create/parent-category"}
      />
      <ListOfParentCategory />
    </div>
  )
}

export default ParentCategorylistcom