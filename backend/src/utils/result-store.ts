const resultStore = new Map<string, any>();

export function saveResult(jobId: string, data: any) {
  resultStore.set(jobId, data);
}

export function getResult(jobId: string) {
  return resultStore.get(jobId);
}