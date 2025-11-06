export const getImageUrl = (path: string) => {
  return new URL(path, import.meta.url).href
}

export const taskStateTextMap: Record<number, string> = {
  0: '未完成',
  1: '已完成',
}
