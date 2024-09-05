"use client"
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Navigation from "@/components/navigation/navigation";

interface Pengaduan {
    id_tanggapan: number;
    tanggal_tanggapan: string;
    nama_petugas: string;
    tanggapan: string;
}

const Tanggapan = () => {
    const [data, setData] = useState<Pengaduan[]>([]);

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
                            <TableCell>Nama Petugas</TableCell>
                            <TableCell>Tanggapan</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item.id_tanggapan}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.tanggal_tanggapan}</TableCell>
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