export function emitLiveData(data: any) {
  const io = (global as any).io;
  if (io) io.emit("liveSolar", data);
}

export function emitAllData(data: any) {
  const io = (global as any).io;
  if (io) io.emit("historyData", data);
}

export function emitPowerData(data: any) {
  const io = (global as any).io;
  if (io) io.emit("livePower", data);
}
