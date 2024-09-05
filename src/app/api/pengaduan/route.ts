import { pengaduan_status, PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const GET = async () => {
    try {
        
        const pengaduan = await prisma.pengaduan.findMany();
        return NextResponse.json({
            data: pengaduan
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,

            }, {
                status: 500,
            })
        } else {
            return NextResponse.json({
                message: "An error occurred",
            }, {
                status: 500,
            })
        }
    }
}

export const POST = async (req: NextRequest) => {
    try {
        // Tentukan direktori penyimpanan
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Buat direktori jika belum ada
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Ambil FormData dari request
        const formData = await req.formData();
        const file = formData.get("foto") as File; // Ambil file foto dari form data

        if (!file) {
            return NextResponse.json(
                { message: "File tidak ditemukan" },
                { status: 400 }
            );
        }

        // Tentukan path tujuan penyimpanan file
        const newFileName = `${Date.now()}-${formData.get("nik")}.jpg`;
        const newPath = path.join(uploadDir, newFileName);

        // Baca file dari stream
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Tulis file ke direktori tujuan
        fs.writeFileSync(newPath, buffer);
5
        // Simpan data ke dalam database
        const pengaduan = await prisma.pengaduan.create({
            data: {
                nik: formData.get("nik") as string,
                isi_laporan: formData.get("isi_laporan") as string,
                foto: newFileName, // Simpan nama file ke dalam database
                status: pengaduan_status.pending,
                tgl_pengaduan: new Date(),
            },
        });

        return NextResponse.json({
            message: "Pengaduan berhasil ditambahkan",
            pengaduan,
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                { message: "An error occurred" },
                { status: 500 }
            );
        }
    }
};

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
