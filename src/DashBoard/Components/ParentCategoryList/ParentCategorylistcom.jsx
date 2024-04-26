import React from 'react'
import Header from '../AllProductsComponent/Layout/Header'
import ListOfParentCategory from './ListOfParentCategory'


const ParentCategorylistcom = () => {

  
  return (
    <div className='AllProductscomp_admin'>
      <Header title={"Add Category"} />
      <ListOfParentCategory />
    </div>
  )
}

export default ParentCategorylistcom