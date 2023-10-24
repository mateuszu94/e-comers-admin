"use client";

import { Button } from "@/components/ui/button";
import { Heding } from "@/components/ui/heding";
import { Separator } from "@/components/ui/separator";

import { useParams, useRouter } from "next/navigation";

import { BiPlus } from "react-icons/bi";

import { DataTable } from "@/components/ui/dataTable";
import { BillboardColumn, columns } from "./columns";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heding
          title={`Bilbordy (${data.length})`}
          description="zarządzaj bilbordami"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <div className="mr-2 h-4 w-4">
            <BiPlus />
          </div>
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};

export default BillboardClient;
