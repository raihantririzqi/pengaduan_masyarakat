import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PenBox } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
    id_pengaduan: number;
}

const DialogEdit = ({id_pengaduan}: Props) => {
    const [tanggapan, setTanggapan] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const submit = async () => {
        const response = await fetch('/api/tanggapan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id_pengaduan: id_pengaduan,
                tanggapan: tanggapan,
            }),
        });
        if(response.ok){
            toast.success("berhasil menanggapi");
            setTanggapan('');
            setIsOpen(false);
        }else{
            toast.error("gagal menanggapi");
        }
    }
    return (
        <>
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PenBox/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Tanggapi</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DialogTrigger>
                <DialogContent>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="tanggapan">Tanggapan</Label>
                            <Textarea id="tanggapan" value={tanggapan} onChange={(e) => setTanggapan(e.target.value)}/>
                        </div>
                        <div>
                            <Button onClick={submit}>Submit</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogEdit;