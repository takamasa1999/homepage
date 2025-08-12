from fastapi import FastAPI, File, UploadFile, Query
import psycopg
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool
from process_transcription import process_transcription
from fastapi.responses import StreamingResponse
import asyncio
from routes.get_stt import router as get_stt_router 
from routes.get_newer_stt import router as get_newer_stt_router 

app = FastAPI()
app.include_router(get_stt_router) 
app.include_router(get_newer_stt_router)
origins = [
    "https://repainter.net",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
)

@app.get("/")
async def root():
    return {"message": "Here's the root of Repainter API."}

@app.post("/transcribe/")
async def transcribe(
    file: UploadFile = File(...),
    lang: str = Query("auto", description="Transcription language (leave empty for auto)")
):
    result = await run_in_threadpool(process_transcription, file, lang)
    return result

DSN = "dbname=postgres user=ubuntu"
async def pg_notify_stream():
    async with await psycopg.AsyncConnection.connect(DSN, autocommit=True) as conn:
        async with conn.cursor() as cur:
            await cur.execute("LISTEN stt_channel;")
            try:
                async for notify in conn.notifies():
                    yield f"data: {notify.payload}\n\n"
            except asyncio.CancelledError:
                print("Client disconnected")

@app.get("/stt-table-updates")
async def listen_notifications():
    return StreamingResponse(pg_notify_stream(), media_type="text/event-stream")
