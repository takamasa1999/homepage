import psycopg

with psycopg.connect("dbname=postgres user=ubuntu") as conn:
    data=conn.execute("SELECT * FROM stt ORDER BY created_at DESC").fetchall()