import { NextResponse } from "next/server";

/**
 * Проверочный эндпоинт: подтверждает, что API-маршрут обслуживается.
 * @returns JSON-ответ с приветственным сообщением
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ message: "Hello, world!" });
}
