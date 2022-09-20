import { join } from "path"

export const imageUploadUrl = (filePath: string) => {
  const prefix = process.env.DO_SPACES_SUBDOMAIN
  if (!prefix || !filePath) return filePath
  return join(prefix, filePath)
}