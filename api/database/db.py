import asyncpg

DATABASE_CONFIG = {
    "user": "postgres",
    "password": "12345",
    "database": "techkraft_db",
    "host": "localhost",
    "port": 5432
}

async def connect_db():
    return await asyncpg.connect(**DATABASE_CONFIG)