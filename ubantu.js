const installer = require("electron-installer-debian");

const options = {
    src: "./dist/app-linux-x64/",
    dest: "./dist/installers/",
    arch: "amd64",
    executable: "./app_0.0.1_amd64.deb",
};

async function main(options) {
    console.log("Creating package (this may take a while)");
    try {
        await installer(options);
        console.log(`Successfully created package at ${options.dest}`);
    } catch (err) {
        console.error(err, err.stack);
        process.exit(1);
    }
}
main(options);