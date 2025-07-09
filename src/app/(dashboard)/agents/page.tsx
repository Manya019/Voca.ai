import { ErrorState } from "@/components/ui/views/error-state";
import { Loadingstate } from "@/components/ui/views/loading-state";
import { AgentsView, AgentsViewError } from "@/modules/agents/ui/views/agents-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";


const page = () => {

  const queryclient = getQueryClient();
  void queryclient.prefetchQuery(trpc.agents.getMany.queryOptions()) 

  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <Suspense fallback = {<Loadingstate title="Loading" description="This may take a few moments."/>}>
        <ErrorBoundary fallback={<AgentsViewError/>}>
          <AgentsView/>
        </ErrorBoundary> 
      </Suspense>
    </HydrationBoundary>
   
  )

}

export default page
