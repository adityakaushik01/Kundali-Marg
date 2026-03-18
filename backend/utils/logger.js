const log = (type, message, data = {}) => {
  const timestamp = new Date().toISOString();

  console.log(
    `[${timestamp}] [${type}] ${message}`,
    Object.keys(data).length ? JSON.stringify(data, null, 2) : ""
  );
};

export const logger = {
  info: (msg, data) => log("INFO", msg, data),
  warn: (msg, data) => log("WARN", msg, data),
  error: (msg, data) => log("ERROR", msg, data),
};