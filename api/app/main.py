from fastapi import FastAPI
from database.db import connect_db;
from app.data.response import Response
from migration.migrate import migrate

app = FastAPI()


@app.get("/listings")
async def listings(
    page_number: int | None = 1,
    item_count: int | None = 10,
    search: str | None = '',
    max: float | None = None,
    min: float | None = None,
    bed_count: int | None = None,
    bath_count: int | None = None,
    property_type: int | None = None
) -> Response:
    conn = await connect_db()


    # query for getting other necessary data
    query_property_type = """
        SELECT 
            id,
            label
        FROM tbl_property_type        
    """    
    property_type_list = await conn.fetch(query_property_type)    
    
    

    # holds query for getting property data
    query = """
SELECT
    *
FROM tbl_property
WHERE 1 = 1
"""

    # holds sql query parameters
    params = []
    
    
    if search:
        query += f" AND keyword ILIKE ${len(params) + 1}"
        params.append(f"%{search}%")

    if(max is not None):
        query += " AND price > $" + str(len(params) + 1)
        params.append(max)
        
    if(min is not None):
        query += " AND price < $" + str(len(params) + 1)
        params.append(min)
        
    if(bed_count is not None and bed_count > 0):
        query += " AND bed_count = $" + str(len(params) + 1)
        params.append(bed_count)
        
    if(bath_count is not None and bath_count > 0):
        query += " AND bath_count = $" + str(len(params) + 1)
        params.append(bath_count)
        
    if(property_type is not None and property_type > 0):
        query += " AND property_type_id = $" + str(len(params) + 1)
        params.append(property_type)
        
    


    # query for getting total data count
    query_data_count = f"""
        SELECT
            COUNT(*)
        FROM (
            {query}
        ) _data
    """
    property_count = await conn.fetchval(query_data_count, *params)


    query += f" ORDER BY created_date LIMIT ${len(params) + 1} OFFSET ${len(params) + 2}"
    params.append(item_count)
    params.append(item_count * (page_number - 1))
    

    property_list = await conn.fetch(query, *params)

    await conn.close()
    
    return Response(
        error_code=0,
        data={
            "property": [dict(row) for row in property_list],
            "property_count": property_count,
            "property_type": [dict(row) for row in property_type_list],
            "bath_count": [{'id': i, 'label': str(i) + "Bath"} for i in range(1, 6)],
            "bed_count": [{'id': i, 'label':  str(i) + "Bed"} for i in range(1, 6)]
        }
    )
    
@app.get("/listings/{id}")
async def listings(id: int):
    conn = await connect_db()
    
    

    
    
    # holds query for getting property detail data
    query = f"""
SELECT
    _property.label AS property_title,
    _property.description,
    _location.label AS property_location, 
    _property.price,
	_agent.label AS agent_name,
	_agent.office_number AS agent_office_number,
	_agent.phone_number AS agent_phone_number,
	_agent.email AS agent_email,
	_agent_location.label AS agent_location
FROM tbl_property _property

LEFT JOIN tbl_agent _agent
    ON _agent.status = 'ACTIVE'::enum_status
    AND _agent.id = _property.agent_id
    
LEFT JOIN tbl_location _location
    ON _location.status = 'ACTIVE'::enum_status
    AND _location.id = _property.location_id

LEFT JOIN tbl_location _agent_location
    ON _location.status = 'ACTIVE'::enum_status
    AND _location.id = _agent.location_id

WHERE _property.status = 'ACTIVE'::enum_status
AND _property.id = $1
"""


    property_detail = await conn.fetch(query, id)
    
    return Response(
        error_code=0,
        data={
            "property_detail": [dict(row) for row in property_detail][0]
        }
    )

if __name__ == "__main__":
    import uvicorn
    import asyncio
    
    asyncio.run(migrate())
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)