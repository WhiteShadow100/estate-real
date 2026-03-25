import React, { useEffect, useState } from 'react'
import { useParams, Navigate, useNavigate } from "react-router-dom";
import APICall from '../../utils/APICall';
import type { IResponse } from '../../type/IResponse';


interface IPropertyDetail {
    property_title: string,
    description: string,
    price: number,
    property_location: number,
    agent_name: string,
    agent_location: string,
    agent_office_number: string,
    agent_whatsapp: string,
    agent_email: string
}


const ListingDetail = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    if (!id || isNaN(Number(id))) {
        return <Navigate to="/listings" replace />;
    }

``
    const [propertyDetail, setPropertyDetail] = useState<IPropertyDetail | null>(null);
    
    function getPropertyDetail(){
        APICall<IResponse<{property_detail:IPropertyDetail}>>({
        url: `/listings/${id}`,
        method: "GET",
        successCallback: (res) => {
            console.log("Data => ", res)
            if(res.error_code == 0){
                const data = res.data;
                
                setPropertyDetail(data.property_detail)
                return
            }

            navigate('/listings');
        }
        });
    }

    useEffect(() => {
        getPropertyDetail();
    }, [])
    

    return (
        <div className='w-full h-full flex flex-col gap-4'>
            <div className='flex w-full h-10/12 gap-4'>
                <div className='w-10/12 h-full overflow-hidden rounded-2xl'>
                    <img className=" h-full w-full object-cover" src="https://as1.ftcdn.net/v2/jpg/00/52/14/94/1000_F_52149432_4FhRgWtKJQFCM299StO3te3zwXF5KAfE.jpg" />
                </div>

                <div className='w-3/12 h-full flex flex-col gap-4'>
                    <div className='w-full h-full overflow-hidden rounded-2xl'>
                        <img className="h-full w-full object-cover" src="https://as1.ftcdn.net/v2/jpg/00/52/14/94/1000_F_52149432_4FhRgWtKJQFCM299StO3te3zwXF5KAfE.jpg" />
                    </div>

                    <div className='w-full h-full overflow-hidden rounded-2xl'>
                        <img className="h-full w-full object-cover" src="https://as1.ftcdn.net/v2/jpg/00/52/14/94/1000_F_52149432_4FhRgWtKJQFCM299StO3te3zwXF5KAfE.jpg" />
                    </div>
                </div>
            </div>

            <div className='flex flex-wrap h-6/12 gap-4 pb-5'>
                <div className='flex-1 h-fit flex bg-gray-100 flex-col rounded-xl p-4 overflow-autp'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='w-full h-fit pb-5'>
                            <div className='font-bold text-3xl'>
                                {propertyDetail?.property_title || ''}
                            </div>

                            <div className='flex justify-between'>
                                <div className='flex gap-10 text-sm font-light'>
                                    {propertyDetail?.property_location || ""}
                                </div>                                 
                            </div>

                        </div>

                        <div>
                            <span className='font-bold text-2xl'>
                                {propertyDetail?.price || ""}
                            </span>
                            <span className='text-sm font-light'>
                                USD
                            </span>
                        </div>
                    </div>

                    <div className='font-bold text-sm'>
                        Description:
                    </div>

                    <div>
                        {propertyDetail?.description || ""}
                    </div>         
                </div>

                <div className='h-full w-full sm:w-4/12 flex flex-col gap-2 rounded-lg bg-gray-100 p-4 overflow-hidden'>
                    <div className='w-full flex h-3/12 gap-5 pl-2 pr-2'>
                        <div className='hidden lg:block aspect-square rounded-full overflow-hidden'>
                            <img className="h-full w-full object-cover" src="https://as1.ftcdn.net/v2/jpg/00/52/14/94/1000_F_52149432_4FhRgWtKJQFCM299StO3te3zwXF5KAfE.jpg" />
                        </div>

                        <div className='truncate'>
                            <div>
                                {propertyDetail?.agent_name || ""}
                            </div>

                            <div className='truncate'>
                                {propertyDetail?.agent_location || ""}
                            </div>
                        </div>
                    </div>

                    <hr />


                    <div>
                        Office Phone: {propertyDetail?.agent_office_number || ""}
                    </div>

                    <hr />

                    <div>
                        WhatsApp: {propertyDetail?.agent_whatsapp || ""}
                    </div>

                    <hr />

                    <div>
                        Email: {propertyDetail?.agent_email || ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingDetail
