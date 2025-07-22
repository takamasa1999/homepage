# stt_routes.py
from fastapi import APIRouter, Query, HTTPException
from fastapi.concurrency import run_in_threadpool
import psycopg
from psycopg.rows import dict_row

router = APIRouter()

DSN = "dbname=postgres user=ubuntu"

@router.get("/get-stt")
async def get_stt(after_id: int = Query(None)):
    query = """
        SELECT * FROM stt
        WHERE (created_at, id) < (%s, %s)
        ORDER BY created_at DESC, id DESC
        LIMIT 5
    """

    with psycopg.connect(DSN) as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            if after_id is None:
                data = await run_in_threadpool(
                    lambda: cur.execute(
                        "SELECT * FROM stt ORDER BY created_at DESC, id DESC LIMIT 5"
                    ).fetchall()
                )
                return data

            await run_in_threadpool(lambda: cur.execute("SELECT created_at FROM stt WHERE id = %s", (after_id,)))
            result = cur.fetchone()
            if not result:
                raise HTTPException(status_code=404, detail="ID not found")

            created_at = result["created_at"]
            data = await run_in_threadpool(lambda: cur.execute(query, (created_at, after_id)).fetchall())
            return data

