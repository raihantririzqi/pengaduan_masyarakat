import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
    const { username, password } = await req.json();

    const masyarakat = await prisma.masyarakat.findFirst({
        where: {
            username,
            password,
        },
    })

    if (!masyarakat) {
        return NextResponse.json({
            messsage: "invalid credentials",
        }, {
            status: 401,
        });
    }

    return NextResponse.json({
        message: "Logged in successfully",
        nik: masyarakat.nik
    });
};
