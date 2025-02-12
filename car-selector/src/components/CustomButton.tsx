import Link from "next/link";
import Button from "@mui/material/Button";
import {IButtonProps} from "@/types/typs";

const CustomButton = ({ href, disabled = false, text } : IButtonProps) => {
    return (
        <Link href={disabled ? "#" : href} passHref>
            <Button variant="contained" disabled={disabled}>
                {text}
            </Button>
        </Link>
    );
};

export default CustomButton;