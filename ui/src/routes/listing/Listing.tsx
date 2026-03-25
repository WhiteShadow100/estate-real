import { useEffect, useRef, useState } from "react"
import APICall from "../../utils/APICall";
import type { IResponse } from "../../type/IResponse";
import { Slider } from "@mui/material";
import type { IDropdown } from "../../component/Dropdown";
import Dropdown from "../../component/Dropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";


interface IProperty {
  id: number,
  label: string,
  price: number,
  property_type_id: number,
  bed_count: number,
  bath_count: number,
  area: number
}

interface IFilter {
    search: string,
    price: number[],
    bedCount: number,
    bathCount: number,
    propertyType: number
}


interface IListingDropdown {
    propertyType: IDropdown[], 
    bedCount: IDropdown[], 
    bathCount: IDropdown[],
    itemCount: IDropdown[],
    pageNumber: IDropdown[]
}

interface IListingResponse {
    property: IProperty[],
    property_count: number, 
    property_type: IDropdown[], 
    bath_count: IDropdown[], 
    bed_count: IDropdown[],
}


    interface IPageDetail {
    pageNumber: number,
    itemCount: number
}


interface ISearchParam {
    search: string,
    max: number,
    min: number,
    pageNumber: number,
    itemCount: number,
    bedCount: number,
    bathCount: number,
    propertyType: number
}

const Listing = () => {

    const location = useLocation();

    const navigate = useNavigate();

    //#region State

    // holds property list data
    const [propertyList, setPropertyList] = useState<IProperty[]>([]);

    // holds total property data found
    const [propertyCount, setPropertyCount] = useState<number>(0);

    // holds corrent page detail
    const [pageDetail, setPageDetail] = useState<IPageDetail>({
        pageNumber: 1,
        itemCount: 10
    });

    // holds dropdown options
    const [dropdown, setDropdown] = useState<IListingDropdown>({
        propertyType: [],
        bathCount: [],
        bedCount: [],
        itemCount: [
            { id: 10, label: "10" },
            { id: 20, label: "20" },
            { id: 50, label: "50" },
        ],
        pageNumber: []
    })

    // states whether filter is to be shown
    const [showFilter, setShowFilter] = useState(false);

    // holds filter value
    const [filter, setFilter] = useState<IFilter>({
        search: '',
        bathCount: 0,
        bedCount: 0,
        propertyType: 0,
        price: [0, 10000000]
    });

    //#endregion


    //#region Function

    function setSearchParam(seachParam: ISearchParam) {
        const searchParams = new URLSearchParams(location.search);
        
        for (const key in seachParam) {
            const typedKey = key as keyof ISearchParam;

            if (seachParam.hasOwnProperty(key)) {
                searchParams.set(key, String(seachParam[typedKey]));
                continue;
            }
            searchParams.delete(key);
        }
        
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, label: string){
        const { value } = event.target

        setFilter(pre => ({
            ...pre,
            [label]: value
        }))

        // setSearchParam(label, value)
    }

    function handleSliderChange(event: Event, value: number | number[]){
        setFilter(pre => ({
            ...pre,
            price: value as number[]
        }))
    }

    function handleFilterDropdownChange(event: React.ChangeEvent<HTMLSelectElement>, label: string){
        const { value } = event.target;
        
        setFilter(pre => ({
            ...pre,
            [label]: value
        }))

        // setSearchParam(label, value)
    }

    function handlePageDetailDropdownChange(event: React.ChangeEvent<HTMLSelectElement>, label: string){
        const { value } = event.target;
        
        setPageDetail(pre => ({
            ...pre,
            [label]: value
        }))

        getProperty(filter, {
            ...pageDetail,
            [label]: value
        });
    }

    function getProperty(filter:IFilter, pageDetail:IPageDetail){
        // preparing seach param
        const searchParam:ISearchParam = {
            search: filter.search,
            max: filter.price[0],
            min: filter.price[1],
            pageNumber: pageDetail.pageNumber,
            itemCount: pageDetail.itemCount,
            bedCount: filter.bedCount,
            bathCount: filter.bathCount,
            propertyType: filter.propertyType
        }

        setSearchParam(searchParam)

        APICall<IResponse<IListingResponse>>({
            url: `/listings?search=${searchParam.search}&max=${searchParam.max}&min=${searchParam.min}&bed_count=${searchParam.bedCount}&bath_count=${searchParam.bathCount}&property_type=${searchParam.propertyType}&page_number=${searchParam.pageNumber}&item_count=${searchParam.itemCount}`,
            method: "GET",
            successCallback: (res) => {
                console.log("Data => ", res)
                if(res.error_code == 0){
                    const data = res.data;

                    const propertyList = data.property;
                    const propertyCount = data.property_count;
                    const propertyTypeList = data.property_type;
                    const bathCountList = data.bath_count;
                    const bedCountList = data.bed_count;



                    // preparing page number list
                    const tempPageNumber:IDropdown[] = [];
                    for(let i = 0; i < Math.ceil(propertyCount / pageDetail.itemCount); i++){
                        tempPageNumber.push({
                            id: i + 1,
                            label: "" + (i + 1)
                        })
                    }

                    setPropertyList(propertyList);
                    setPropertyCount(propertyCount);
                    setDropdown(pre => ({
                        ...pre,
                        propertyType: [{ id: 0, label: 'Select Property Type' }, ...propertyTypeList],
                        bathCount: [{ id: 0, label: 'Select Bath' }, ...bathCountList],
                        bedCount: [{ id: 0, label: 'Select Bed' }, ...bedCountList],
                        pageNumber: tempPageNumber
                    }))
                }
            }
        });
    }

    // sets filter data on the basis of query param
    function getQueryParam(){
        const searchParams = new URLSearchParams(location.search);

        const search = searchParams.get("search") || "";
        const max = searchParams.get("max") || "0";
        const min = searchParams.get("min") || "10000000";
        const bedCount = searchParams.get("bedCount") || "0";
        const bathCount = searchParams.get("bathCount") || "0";
        const propertyType = searchParams.get("propertyType") || "0";

        const tempFilter: IFilter = {
            search: search,
            price: [parseInt(max), parseInt(min)],
            bedCount: parseInt(bedCount) || 0,
            bathCount: parseInt(bathCount) || 0,
            propertyType: parseInt(propertyType) || 0,
        }

        setFilter(pre => ({
            ...pre,
            ...tempFilter
        }))


        const itemCount = searchParams.get("itemCount") || '10';
        const pageNumber = searchParams.get("pageNumber") || '1';

        const tempPageDetail: IPageDetail = {
            itemCount: parseInt(itemCount) || 10,
            pageNumber: parseInt(pageNumber) || 1
        }

        setPageDetail(pre => ({
            ...pre,
            ...tempPageDetail
        }))

        getProperty(tempFilter, tempPageDetail)
    }

    //#endregion


    //#region effect hook

    useEffect(() => {
        getQueryParam();
    }, [])

    //#endregion


    return (
        <div className="flex flex-col gap-5 w-full h-full">
            <div className="flex justify-center h-1/12 p-7 gap-15 items-center w-full bg-gray-100 rounded-4xl">
                <div className="flex-2 gap-5 bg-white rounded-2xl">
                    <input
                        value={filter.search}
                        className="w-full h-full rounded-lg outline-none p-2 pl-4 pr-4"
                        placeholder="Search...."
                        type="text"
                        onChange={(e) => handleInputChange(e, 'search')}
                    />
                </div>

                <div className="flex-1">
                    <Slider
                        value={filter.price}
                        onChange={handleSliderChange}
                        min={0}
                        max={10000000}
                        step={1}
                        valueLabelDisplay="auto"
                    />                    
                </div>

                <div className="flex gap-5 bg-white rounded-2xl p-1 pl-3 pr-3">
                    <Dropdown
                        value={filter.bedCount}
                        onChange={(e) => {
                            handleFilterDropdownChange(e, 'bedCount')
                        }}
                        option={dropdown.bedCount}
                    />
                </div>

                <div className="flex gap-5 bg-white rounded-2xl p-2 pl-3 pr-3">
                    <Dropdown
                        value={filter.bathCount}
                        onChange={(e) => handleFilterDropdownChange(e, 'bathCount')}
                        option={dropdown.bathCount}
                    />
                </div>

                <div className="flex gap-5 bg-white rounded-2xl p-2 pl-3 pr-3">
                    <Dropdown
                        value={filter.propertyType}
                        onChange={(e) => handleFilterDropdownChange(e, 'propertyType')}
                        option={dropdown.propertyType}
                    />
                </div>

                <div className="flex gap-5 bg-white rounded-2xl p-2 pl-6 pr-6">
                    <button
                        className="cursor-pointer"
                        onClick={() => {
                            getProperty(filter, pageDetail)
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="text-2xl font-bold w-full p-2">
                { propertyCount } Result Found
            </div>

            {
                propertyList.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            (propertyList || []).map(property => (
                                <Link to={''+property.id} className="flex w-full flex-col rounded-2xl bg-gray-100 p-2">
                                    <div  className="w-full h-9/12 rounded-t-xl overflow-hidden">
                                        <img className=" h-full w-full object-cover" src="https://as1.ftcdn.net/v2/jpg/00/52/14/94/1000_F_52149432_4FhRgWtKJQFCM299StO3te3zwXF5KAfE.jpg" />
                                    </div>
        
                                    <div className="flex w-full h-fit justify-around items-center gap-1 p-2 text-center">
                                        <div className="bg-white font-bold text-xs flex items-center rounded-lg p-1">
                                            <BedOutlinedIcon />
                                            {property.bed_count}
                                            <span>
                                                Bath
                                            </span>
                                        </div>
        
                                        <div className="bg-white font-bold text-xs flex items-center rounded-lg p-1">
                                            <BathtubOutlinedIcon />
                                            {property.bath_count}
                                            <span className=''>
                                                Bath
                                            </span>
                                        </div>
        
                                        <div className="bg-white font-bold text-xs flex items-center rounded-lg p-1">
                                            <SquareFootOutlinedIcon />
                                            {property.area}
                                            <span>
                                                ft
                                            </span>
                                        </div>
                                    </div>
        
                                    <div className="flex bg-white w-full h-2/12 justify-center items-center text-center p-3 rounded-b-xl">
                                        <div className="w-full font-medium text-xl">
                                        $ {property.price}
                                        </div>
        
                                        <div className="w-full text-left text-xs">
                                        <div className="font-medium">
                                            Pokhara
                                        </div>
        
                                        <div>
                                            Imadol, 24 Street
                                        </div>
                                        </div>
                                    </div>
                                </Link>            
                            ))
                        }
        
                        <div className="flex justify-around p-6 gap-20 items-center w-full h-1/12 bg-gray-100 rounded-3xl col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 ">
                            <div>
                                <label>
                                    Item Count: 
                                </label>
                                <Dropdown
                                    option={dropdown.itemCount}
                                    value={pageDetail.itemCount}
                                    onChange={(e) => {
                                        handlePageDetailDropdownChange(e, 'itemCount')
                                    }}
                                />
                            </div>

                            <div>
                                <label>
                                    Page: 
                                </label>
                                <Dropdown
                                    option={dropdown.pageNumber}
                                    value={pageDetail.pageNumber}
                                    onChange={(e) => {
                                        handlePageDetailDropdownChange(e, 'pageNumber')
                                    }}
                                />
                            </div>

                            <div className="flex">
                                <label>
                                    Total:&nbsp;
                                </label>
                                <div className="font-bold">
                                    {propertyCount}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>

    )
}

export default Listing
