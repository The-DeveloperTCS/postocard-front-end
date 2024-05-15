import React from 'react'
import Header from '../AllProductsComponent/Layout/Header'
import ListOfSubCategory from './ListOfSubCategory'


const SubCategorylistcom = () => {


  return (
    <div className='AllProductscomp_admin'>
      <Header
        title={"Add Sub Category"}
        link={"/admin/create/sub-category"}
      />
      <ListOfSubCategory />
    </div>
  )
}

export default SubCategorylistcom