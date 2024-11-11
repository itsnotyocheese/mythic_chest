// app/api/user/games/route.js
import { NextResponse } from "next/server";
import { addUserGame, getUserGames } from "../../../database/firestoreCalls";

export async function POST(request) {
  const { userId, gameId } = await request.json();
  try {
    await addUserGame(userId, gameId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  try {
    const games = await getUserGames(userId);
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
