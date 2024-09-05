"use client"
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import DialogEdit from "./dialog/dialog-edit";
import Navigation from "@/components/navigation/navigation";
interface Pengaduan {
    id_pengaduan: number;
    tgl_pengaduan: string; // Gunakan string untuk format tanggal
    nik: string;
    isi_laporan: string;
    foto: string;
    status: string
}

const Dashboard = () => {
    const [data, setData] = useState<Pengaduan[]>([]);

    // Fungsi untuk mengambil data dari API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/pengaduan");
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
    return (
        <>
        <Navigation/>
        <div className="flex flex-col p-20 gap-4">
            <div className="font-bold text-lg">Pengaduan</div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Tanggal Pengaduan</TableCell>
                            <TableCell>NIK</TableCell>
                            <TableCell>Isi Laporan</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item.id_pengaduan}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{formatTanggal(item.tgl_pengaduan)}</TableCell>
                                <TableCell>{item.nik}</TableCell>
                                <TableCell>{item.isi_laporan}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>
                                    {
                                        item.status === "pending" &&
                                        <>
                                            <DialogEdit id_pengaduan={item.id_pengaduan}/>
                                        </>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
        </>
    );
};

export default Dashboard;
