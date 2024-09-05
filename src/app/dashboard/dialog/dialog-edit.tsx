import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PenBox } from "lucide-react";

const DialogEdit = () => {
    return (
        <>
            <Dialog>
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

                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogEdit;