import { join } from "path"

export const imageUploadUrl = (filePath: string) => {
  return join(process.env.DO_SPACES_SUBDOMAIN, filePath)
}