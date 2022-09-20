import { FileProcessed } from "./file-resize.pipe"

export function getFileUrlProcessed(file: FileProcessed[]) {
  if (Array.isArray(file) && file.length > 0) {
    if (file[0]) {
      return file[0].location
    }
  }
  return null
}