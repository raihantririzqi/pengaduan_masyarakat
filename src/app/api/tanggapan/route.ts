import { pengaduan_status, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
    try{
        const { id_pengaduan, tanggapan } = await req.json();
    
        const id_petugas = req.cookies.get("token")?.value.toString();
        const date = new Date();

        await prisma.tanggapan.create({
            data: {
                id_pengaduan: id_pengaduan,
                id_petugas: Number(id_petugas),
                tanggapan: tanggapan,
                tgl_tanggapan: date
            }
        });

        await prisma.pengaduan.update({
            where: {
                id_pengaduan: id_pengaduan
            },
            data: {
                status: pengaduan_status.proses
            }
        })
        return NextResponse.json({
            message: "Tanggapan berhasil ditambahkan",
        })
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

export const GET = async () => {
    try{
        return NextResponse.json({
            data: await prisma.tanggapan.findMany({
                include: {
                    petugas: true,
                    pengaduan: true,
                },
            })
        })
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