import { subgraph } from "@/config/subgraph"
import { useQuery } from "wagmi"

interface Options {
    owner: string
    networks?: number[]
}


export const useLocks = (options: Options) => {
    return useQuery(['subgraph', 'locks', options.owner, options.networks], async () => {
        const locks = await subgraph.locks({
            where: {
              lockManagers: [options.owner.toLowerCase().trim()]
            }
        }, {
            networks: options.networks
        })
        return locks
    })
}

