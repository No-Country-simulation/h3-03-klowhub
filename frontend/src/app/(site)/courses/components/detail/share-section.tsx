import Icon from "@/components/icon/icon.component";

export const ShareSection = () => {

    return (
        <div className="flex items-center gap-3 mt-6">
            <span className="text-sm font-thin">compartir</span>
            <div className="flex items-center gap-2">
                <Icon style="h-5 w-5" name="mail" />
                <Icon style="h-5 w-5" name="whatsapp" />
                <Icon style="h-5 w-5" name="messenger" />
                <Icon style="h-5 w-5" name="linkedin" />
            </div>
        </div>
    );

};
