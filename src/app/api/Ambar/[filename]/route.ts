import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;

    // Validar que el archivo tenga extensión .pdf
    if (!filename.endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Solo se permiten archivos PDF' },
        { status: 400 }
      );
    }

    // Construir la ruta del archivo
    const filePath = path.join(process.cwd(), 'public', 'Ambar', filename);

    // Verificar si el archivo existe
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { error: 'Archivo no encontrado' },
        { status: 404 }
      );
    }

    // Leer el archivo
    const fileBuffer = await fs.readFile(filePath);

    // Crear la respuesta con los headers apropiados para descarga
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error al servir el PDF:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
