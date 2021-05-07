const path = require("path");
const packageConfig = require("../package.json");
module.exports = {
  resolve(filePath) {
    return path.resolve(__dirname, "..", filePath);
  },
  createNotifierCallback() {
    const notifier = require("node-notifier");
    return (severity, errors) => {
      if (severity !== "error") return;
      const error = errors[0];
      const filename = error.file && error.file.split("!").pop();
      notifier.notify({
        title: packageConfig.name,
        message: severity + ": " + error.name,
        subtitle: filename || "",
        icon: path.join(__dirname, "logo.png"),
      });
    };
  },
  getIp() {
    let netHost = "";
    const os = require("os");
    try {
      const network = os.networkInterfaces();
      for (const dev in network) {
        const iface = network[dev];
        iface.forEach((item) => {
          if (
            item.family === "IPv4" &&
            item.address !== "127.0.0.1" &&
            !item.internal
          ) {
            netHost = item.address;
          }
        });
      }
    } catch {
      netHost = "localhost";
    }
    return netHost;
  },
};
