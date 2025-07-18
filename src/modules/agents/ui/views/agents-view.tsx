"use client"

import { ErrorState } from "@/components/ui/views/error-state";
import { Loadingstate } from "@/components/ui/views/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const AgentsView = ()=>{
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    
    return(
        <div>

            {JSON.stringify(data, null, 2)}
        </div>
    )


}

export const AgentsViewError = ()=>{
    return <ErrorState title="Failed to load the Agents" description="Something went wrong"/>
}