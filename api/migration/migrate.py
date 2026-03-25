async def migrate():
    
    from database.db import connect_db    
    from pathlib import Path    

    BASE_DIR = Path("./")

    sql_files = list(BASE_DIR.rglob("*.sql"))

    conn = await connect_db()

    async with conn.transaction():
        for file in sql_files:
            query = file.read_text(encoding="utf-8")
            query = f"""
DO $$ BEGIN
    {query}
EXCEPTION
    WHEN duplicate_table THEN NULL;
    WHEN duplicate_object THEN NULL;
END $$;
"""
            
            print(f"Running: {file}")
            await conn.execute(query)
    await conn.close()