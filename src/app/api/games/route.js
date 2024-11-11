// app/api/games/route.js
import { NextResponse } from "next/server";
import { getAllGames } from "../../database/firestoreCalls";

export async function GET() {
  try {
    const games = await getAllGames();
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
