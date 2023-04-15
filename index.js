const fs = require('fs');
const path = require('path')


class ArtifactOptimizer {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compile.tap('ArtifactOptimizer', compilation => {
            try {
                console.log('\ArtifactOptimizer...\n')
                const { inputDirs, outputDir, outputFileName } = this.options
                const outputPath = path.join(outputDir, outputFileName)
                if (fs.existsSync(outputPath)) return
                var result = []

                // Read all .json files in the input directories
                inputDirs.forEach(dir => {
                    console.log('Folder -> ' + dir)
                    fs.readdirSync(dir)
                        .filter(file => path.extname(file) === '.json')
                        .forEach(file => {
                            console.log('File -> ' + file)
                            const ct = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'))
                            console.log('Address -> ' + ct?.address)
                            result.push({
                                name: path.parse(file).name,
                                address: ct?.address,
                                abi: ct?.abi
                            })
                        });
                    console.log('\n')
                });

                // Write the result to the output file
                fs.writeFile(outputPath, JSON.stringify(result), err => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log(`Data written to ${outputPath}\n`)
                    }
                });
            } catch (error) {
                console.error('ArtifactOptimizer error.', error)
            }
        })
    }
}

module.exports = ArtifactOptimizer