import { PDFDocument } from 'pdf-lib';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Add an image to a PDF (base64 string)
 * @param pdfBytes  PDF file as an ArrayBuffer
 * @param imageBytes  Image as an ArrayBuffer
 * @param pageIndex   Page index to add the signature
 * @param x   X coordinate to add the signature
 * @param y   Y coordinate to add the signature
 * @returns   Modified PDF file as an string in base64
 */
export async function addImageToPdf(
  pdfBytes: ArrayBuffer,
  imageBytes: ArrayBuffer,
  pageIndex: number,
  x: number,
  y: number
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const signatureImage = await pdfDoc.embedPng(imageBytes);

  const page = pdfDoc.getPage(pageIndex);
  const { width, height } = signatureImage.scale(0.3);
  page.drawImage(signatureImage, {
    x,
    y,
    width,
    height,
  });

  const pdfBytesModified = await pdfDoc.save();
  return pdfBytesModified;
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Return the base64 string from a data URL
 * @param dataUrl
 * @returns
 */
export function extractBase64(dataUrl: string | null): string | null {
  if (dataUrl?.startsWith('data:')) {
    const parts = dataUrl.split(',');
    return parts[1];
  }
  return dataUrl;
}

/**
 * Given a template URI and a signature URI, return a signed PDF.
 * @param templateUri URI of the PDF template
 * @param signature URI of the signature image
 * @param http HttpClient instance
 * @param pageIndex Zero-based page index to add the signature (default: 0)
 * @returns Signed PDF as Uint8Array
 */
export async function getSignedPdf(
  templateUri: string,
  signature: string,
  http: HttpClient,
  pageIndex: number = 0, // first page
  leftOffset: number = 20,
  bottomOffset: number = 30
): Promise<Uint8Array | null> {
  if (!signature) {
    return null;
  }

  // get pdf and signature as array buffers
  const [pdfBytes, signatureBytes] = await Promise.all([
    firstValueFrom(http.get(templateUri, { responseType: 'arraybuffer' })),
    firstValueFrom(http.get(signature, { responseType: 'arraybuffer' })),
  ]);

  // add signature to pdf
  const signedPdf = await addImageToPdf(
    pdfBytes,
    signatureBytes,
    pageIndex,
    leftOffset,
    bottomOffset
  );

  // return modified pdf
  return signedPdf;
}

/**
 * Merge PDF files into a single PDF file.
 * @param pdfs  Array of PDF files as Uint8Array
 * @returns  Merged PDF file as Uint8Array
 */
export async function mergePdfs(pdfs: Uint8Array[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  for (const pdf of pdfs) {
    const doc = await PDFDocument.load(pdf);
    const copiedPages = await pdfDoc.copyPages(doc, doc.getPageIndices());
    copiedPages.forEach(page => pdfDoc.addPage(page));
  }
  return pdfDoc.save();
}

export function downloadPdf(pdf: ArrayBuffer, filename: string): void {
  const blob = new Blob([pdf], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
