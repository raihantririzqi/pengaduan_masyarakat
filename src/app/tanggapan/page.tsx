"use client"
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Navigation from "@/components/navigation/navigation";

interface Pengaduan {
    id_tanggapan: number;
    tgl_tanggapan: string;
    nik: string;
    isi_laporan: string;
    nama_petugas: string;
    tanggapan: string;
}

const Tanggapan = () => {
    const [data, setData] = useState<Pengaduan[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/tanggapan");
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const formatTanggal = (tanggal: string) => {
        return format(new Date(tanggal), "dd-MM-yyyy");
    };

    return(
        <>
        <Navigation/>
        <div className="flex flex-col p-20 gap-4">
            <div className="font-bold text-lg">Pengaduan</div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Tanggal Tanggapan</TableCell>
                            <TableCell>NIK</TableCell>
                            <TableCell>Isi Laporan</TableCell>
                            <TableCell>Nama Petugas</TableCell>
                            <TableCell>Tanggapan</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item.id_tanggapan}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{formatTanggal(item.tgl_tanggapan)}</TableCell>
                                <TableCell>{item.nik}</TableCell>
                                <TableCell>{item.isi_laporan}</TableCell>
                                <TableCell>{item.nama_petugas}</TableCell>
                                <TableCell>{item.tanggapan}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
        </>
    )
}

export default Tanggapan;