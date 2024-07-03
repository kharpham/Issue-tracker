import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const secureAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
};

export default secureAuth;