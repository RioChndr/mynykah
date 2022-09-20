import { join } from "path"

export const imageUploadUrl = (filePath: string) => {
  const prefix = process.env.DO_SPACES_SUBDOMAIN
  if (!prefix || !filePath) return filePath
  const url = new URL(prefix)
  url.pathname = join(url.pathname, filePath)
  return url.toString();
}