
/**
 * Extract PNG layer from piskel file 
 * 
 * A lot of hardcoded paths mean it would probably break if something changes
 */

const fs = require('fs')
const { exec } = require("child_process");

const piskelfile = "data/pix2.piskel";
const outputdir = "output";

fs.readFile(piskelfile, 'utf8' , (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    //console.log(data)
    var data = JSON.parse(data);
    var piskel_layers_json = data.piskel.layers[0];
    var layers = JSON.parse(piskel_layers_json);
    var chunk0_png = layers.chunks[0].base64PNG;

    var regex = /^data:.+\/(.+);base64,(.*)$/;

    var outfile = outputdir + '/out.png';
    var matches = chunk0_png.match(regex);
    var data = matches[2];
    var buffer = Buffer.from(data, 'base64');

    console.log("Generating " + outfile + " from "+piskelfile);
    fs.writeFileSync( outfile, buffer);

    exec("cd output && ./split.sh", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

})
