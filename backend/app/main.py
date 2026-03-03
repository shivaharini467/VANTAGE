from fastapi import FastAPI, UploadFile, File
from app.services.pdf_service import extract_text_from_pdf
from app.services.nlp_service import parse_resume

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Backend working"}


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files supported"}

    file_bytes = await file.read()

    raw_text = extract_text_from_pdf(file_bytes)
    structured_data = parse_resume(raw_text)

    # Clean whitespace
    raw_text = raw_text.replace("\t", " ")
    raw_text = "\n".join(
        [line.strip() for line in raw_text.splitlines() if line.strip()]
    )

    return {
    "filename": file.filename,
    "text_length": len(raw_text),
    "raw_text_preview": raw_text[:1000],
    "structured_data": structured_data
}
