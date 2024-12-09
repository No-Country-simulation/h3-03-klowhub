import { FC } from "react";
import { ReactNode } from "react";
import Overlay from "../overlay/overlay.component";
import { Button } from "../ui/button";
import Icon from "../icon/icon.component";

type PopoverPros = {
    children: ReactNode
    onClose: () => void
}


export const Popover: FC<PopoverPros> = ({ children, onClose }) => {
    return (
        <div>
            <>
                <Overlay />
                <div className="fixed w-full h-screen top-0 left-0 z-[99999] flex justify-center items-center px-5 md:px-10">
                    <div className="px-4 pb-4 bg-card flex flex-col gap-5 rounded-lg w-full md:w-[600px]">
                        <div className="flex justify-end mb-10 mt-4">
                            <button
                                className="bg-transparent absolute"
                                onClick={onClose}
                                aria-label="Cerrar"
                            >
                                <Icon name="close" />
                            </button>
                        </div>
                        <div className="mx-auto flex flex-col gap-5">{children}</div>
                    </div>
                </div>
            </>
        </div>
    )
}
