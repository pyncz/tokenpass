type IPFSLink = `ipfs://${string}`

interface ResolveIpfsOptions {
  resolver?: (link: IPFSLink) => string
}

export const pinataIpfsResolver = (link: IPFSLink) => {
  const ipfsHash = link.replace(/^ipfs:\/\//, '')
  return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
}

export function resolveIpfsString(link: string, resolver = pinataIpfsResolver) {
  if (/^ipfs:\/\//.test(link)) {
    // An IPFS link, resolve it with a gateway
    return resolver(link as IPFSLink)
  } else {
    // A regular URI
    return link
  }
}

export function resolveIpfs<T>(
  obj: T,
  options?: ResolveIpfsOptions,
): T {
  const {
    resolver = pinataIpfsResolver,
  } = options ?? {}

  if (obj && typeof obj !== 'number') {
    // Just a string
    if (typeof obj === 'string') {
      return resolveIpfsString(obj, resolver) as T
    }

    // Array or object
    if (Array.isArray(obj)) {
      return obj.map(item => resolveIpfs(item, options)) as T
    } else {
      return Object.entries(obj).reduce((res, [key, value]) => {
        res[key] = resolveIpfs(value, options)
        return res
      }, {} as Record<string, any>) as T
    }
  }
  return obj
}
