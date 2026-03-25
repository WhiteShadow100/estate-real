import type { IDropdown } from "../../component/Dropdown"

export interface IProperty {
  id: number,
  label: string,
  price: number,
  property_type_id: number,
  bed_count: number,
  bath_count: number,
  area: number
}

export interface IFilter {
    search: string,
    price: number[],
    bedCount: number,
    bathCount: number,
    propertyType: number
}


export interface IListingDropdown {
    propertyType: IDropdown[], 
    bedCount: IDropdown[], 
    bathCount: IDropdown[],
    itemCount: IDropdown[],
    pageNumber: IDropdown[]
}

export interface IListingResponse {
    property: IProperty[],
    property_count: number, 
    property_type: IDropdown[], 
    bath_count: IDropdown[], 
    bed_count: IDropdown[],
}


export interface IPageDetail {
    pageNumber: number,
    itemCount: number
}


export interface ISearchParam {
    search: string,
    max: number,
    min: number,
    pageNumber: number,
    itemCount: number,
    bedCount: number,
    bathCount: number,
    propertyType: number
}
