import { CountryFlagTypes } from "./country-flag.types"
import Image from "next/image"

interface FlagImageProps {
    src: string;
}

const FlagImage = ({ src }: FlagImageProps) => {
    return (
        <Image
            width={20}
            height={20}
            alt="some description"
            src={src}
        />
    );
};

type CountryFlagProps = {
    nationality: CountryFlagTypes
}

const CountryFlag = ({ nationality }: CountryFlagProps) => {

    switch (nationality) {
        case "argentinian": return <FlagImage src="https://res.cloudinary.com/dpp28f2ek/image/upload/v1731659311/520ba158-d19e-4ddf-9910-354af17020e3.png" />
        case "brazilian": return <FlagImage src="https://res.cloudinary.com/dpp28f2ek/image/upload/v1731660160/d48faeb2-b498-492e-aaf3-64d78abad983.png" />
        case "spanish": return <FlagImage src="https://res.cloudinary.com/dpp28f2ek/image/upload/v1731660148/ac7b4929-9eea-4004-bdba-7c30ac7f9cb7.png" />
    }
}

export default CountryFlag