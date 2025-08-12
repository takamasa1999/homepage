import os
import shutil
from fastapi import UploadFile
import psycopg
from psycopg.rows import dict_row
from faster_whisper import WhisperModel

model = WhisperModel("small", compute_type="int8")

def process_transcription(file: UploadFile, lang="auto"):
    temp_file_path = f"temp_{file.filename}"
    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        if lang=="auto":
            segments, _ = model.transcribe(temp_file_path, task="transcribe")
        else:
            segments, _ = model.transcribe(temp_file_path, task="transcribe", language=lang)
        transcription = "".join([segment.text for segment in segments])

        with psycopg.connect("dbname=postgres user=ubuntu") as conn:
            with conn.cursor(row_factory=dict_row) as cur:
                cur.execute(
                    "INSERT INTO stt (text) VALUES (%s)",
                    (transcription,)
                )
                conn.commit()
        
        return {"text": transcription}
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
