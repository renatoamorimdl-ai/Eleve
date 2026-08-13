import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message, pageUrl } = body as {
      name?: string;
      phone?: string;
      message?: string;
      pageUrl?: string;
    };

    const webhookUrl = process.env.SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("SHEETS_WEBHOOK_URL não configurada.");
      return NextResponse.json({ status: "error" }, { status: 500 });
    }

    // Dispara para o Google Sheets. Não bloqueia nem quebra o fluxo do
    // usuário caso o Sheets esteja fora do ar - apenas loga o erro.
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name?.trim() || "",
          phone: phone?.trim() || "",
          message: message?.trim() || "",
          pageUrl: pageUrl || "",
        }),
      });
    } catch (webhookError) {
      console.error("Falha ao gravar lead no Sheets:", webhookError);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Erro ao processar lead:", error);
    return NextResponse.json({ status: "error" }, { status: 400 });
  }
}
