import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
const prisma = new PrismaClient();

export const GET = async () => {
    try{
        const pengaduan = await prisma.pengaduan.findMany();
        return NextResponse.json({
            data: pengaduan
        });
    }catch(error){
        if(error instanceof Error){
            return NextResponse.json({
                message: error.message,
                
            }, {
                status: 500,
            })
        }else{
            return NextResponse.json({
                message: "An error occurred",
            }, {
                status: 500,
            })
        }
    }
}