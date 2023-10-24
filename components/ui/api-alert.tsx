"use client";
import { BiServer } from "react-icons/bi";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("skopiowano ");
  };
  return (
    <Alert>
      <div className="h-4 w-4">
        <BiServer />
      </div>

      <AlertTitle className="flex items-center gap-x-2">
        {title} <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>

      <AlertDescription className="mt-4 flex items-center justify-between">
        <div className="relative rounded bg-muted p-2 font-mono text-sm font-semibold">
          {description}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onCopy(description)}
          className="h-4 w-4"
        >
          <CopyIcon />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
