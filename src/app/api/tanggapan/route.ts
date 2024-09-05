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
            console.log(error.message)
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

export const PUT = async(req: NextRequest) => {
    try{
        const { id_pengaduan } = await req.json();

        await prisma.pengaduan.update({
            where: {
                id_pengaduan
            },
            data: {
                status: pengaduan_status.selesai
            }
        })

        return NextResponse.json({
            message: "Tanggapan berhasil diubah",
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
        const data = await prisma.$queryRaw`
        SELECT * FROM tanggapan JOIN petugas ON tanggapan.id_petugas=petugas.id_petugas;`
        return NextResponse.json({
            data: data
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