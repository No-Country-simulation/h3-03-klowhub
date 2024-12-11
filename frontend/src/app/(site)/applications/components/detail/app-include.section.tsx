import { FC } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { AppIncludeProps } from "./app-detail.types";

export const AppInclude: FC<AppIncludeProps> = ({ title, appIncludes }) => {

    console.log(appIncludes)
    return (
        <Card className="p-4">
            <CardHeader className="space-y-8">
                <CardTitle className="text-center">
                    ¿Qué recibirás?
                </CardTitle>
                <span className="text-xs font-semibold text-primary-300">La compra incluye</span>
            </CardHeader>
            <CardContent className="mt-3">
                <span className="text-sm font-semibold">{title}</span>
                <ul className="space-y-3 mt-4">
                    {
                        appIncludes?.map((include, index) => (
                            <li className="text-sm font-thin text-gray-300" key={index}>{include}</li>
                        ))
                    }
                </ul>
            </CardContent>
        </Card>
    )
}
