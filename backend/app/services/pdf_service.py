import fitz  # PyMuPDF

def extract_text_from_pdf(file_bytes: bytes) -> str:
    structured_text = []

    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            # Get text as blocks (better structure preservation)
            blocks = page.get_text("blocks")

            # Sort blocks top-to-bottom
            blocks = sorted(blocks, key=lambda b: b[1])

            for block in blocks:
                block_text = block[4].strip()
                if block_text:
                    structured_text.append(block_text)

    # Join with double newline to preserve section separation
    return "\n\n".join(structured_text)