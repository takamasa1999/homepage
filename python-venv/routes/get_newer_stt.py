from fastapi import APIRouter, Query, HTTPException
from fastapi.concurrency import run_in_threadpool
import psycopg
from psycopg.rows import dict_row

router = APIRouter()

DSN = "dbname=postgres user=ubuntu"

@router.get("/get-stt-newer")
async def get_stt_newer_than(id: int = Query(...)):
    query = """
        SELECT * FROM stt
        WHERE (created_at, id) > (%s, %s)
        ORDER BY created_at ASC, id ASC
    """

    with psycopg.connect(DSN) as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            # Get created_at of the given ID
            await run_in_threadpool(lambda: cur.execute("SELECT created_at FROM stt WHERE id = %s", (id,)))
            result = cur.fetchone()
            if not result:
                raise HTTPException(status_code=404, detail="ID not found")

            created_at = result["created_at"]

            # Fetch records newer than the given ID
            data = await run_in_threadpool(lambda: cur.execute(query, (created_at, id)).fetchall())
            return data
