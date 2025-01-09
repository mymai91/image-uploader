export const acceptFileSize = (fileSize: number) => {
  const imageSizeLimit = 1000000

  return fileSize <= imageSizeLimit
}
