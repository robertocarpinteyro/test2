import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Para evitar caching

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validación básica
    if (!body.option || !body.instruction) {
      return NextResponse.json(
        { success: false, message: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const zapierResponse = await fetch(
      'https://hooks.zapier.com/hooks/catch/22682808/2pt2zoz/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    if (!zapierResponse.ok) {
      const error = await zapierResponse.text();
      console.error('Error de Zapier:', error);
      return NextResponse.json(
        { success: false, message: 'Error en Zapier', zapierError: error },
        { status: zapierResponse.status }
      );
    }

    const data = await zapierResponse.json();
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Error en el proxy:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}