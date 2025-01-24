class ShaderPack {
    private colorNames: string[]
    private shaderColorSets: any[]
    constructor(colorNames: string[], shaderColorSets: any[]) {
        this.colorNames = colorNames
        this.shaderColorSets = shaderColorSets
    }
    unpack () {
        let buf = Buffer.create(16)
        for (let i = 0; i < this.shaderColorSets.length; i++) {
            buf = buf.concat(this.shaderColorSets[i])
        }
        return buf
    }
    getTintIdx (color: string) {
        return this.colorNames.indexOf(color) + 1
    }
    static get (shader: string) {
        let packNames = ["default"]
        let packs = [
            new ShaderPack(
                ["light", "light2", "dark", "dark2", "yellow", "yellow2", "red", "green", "blue", "purple"],
                [
                    [0, 1, 3, 1, 5, 1, 7, 5, 6, 1, 11, 13, 11, 1, 2, 14],
                    [0, 1, 1, 1, 1, 1, 5, 1, 7, 1, 13, 1, 13, 1, 3, 2],
                    [0, 13, 14, 2, 2, 7, 8, 6, 12, 6, 12, 12, 15, 14, 15, 15],
                    [0, 14, 15, 14, 14, 6, 12, 8, 15, 8, 15, 15, 15, 15, 15, 15],
                    [0, 13, 4, 4, 5, 5, 7, 5, 6, 13, 11, 13, 11, 5, 13, 14],
                    [0, 5, 5, 5, 5, 5, 5, 5, 7, 5, 13, 5, 13, 5, 5, 13]
                ]
            )
        ]
        /*
        //for generating the "2" varients
        let test = []
        let sample = [0, 13, 4, 4, 5, 5, 7, 5, 6, 13, 11, 13, 11, 5, 13, 14]
        for (let i = 0; i < 16; i++) {
            test.push(sample[sample[i]])
        }
        console.log(test)
        */
        return packs[packNames.indexOf(shader)]
    }
}
class Shader {
    //Declare initial variables
    /*
    lookup table
    lkupx16: Buffer
    */
    //Shader pack
    public currentShader: ShaderPack
    //Decompiled shader pack
    private colbuf: Buffer
    //Shader augment image
    public mapLayer: Image
    //Render and shader buffers
    private renderBuf: Buffer
    private shaderBuf: Buffer
    //zValue
    private zValue: number
    //Renderable for shader
    private shader: scene.Renderable
    constructor(currentShader: ShaderPack, zValue: number) {
        /*
        this.lkupx16 = Buffer.create(16)
        for (let i = 0; i < 16; i++) {
            this.lkupx16[i] = (i * 16)
        }
        */
        this.zValue = zValue
        this.currentShader = currentShader
        //Unpack Shaderpack
        this.colbuf = this.currentShader.unpack()
        //create buffer image
        this.mapLayer = image.create(160, 120)
        this.renderBuf = Buffer.create(120)
        this.shaderBuf = Buffer.create(120)
        this.shader = scene.createRenderable(this.zValue, (screenImg: Image, camera: scene.Camera) => {
            for (let x = 0; x < 160; ++x) {
                screenImg.getRows(x, this.renderBuf)
                this.mapLayer.getRows(x, this.shaderBuf)
                for (let y = 0; y < 120; ++y) {
                    if (this.mapLayer.getPixel(x, y)) {
                        this.renderBuf[y] = (this.colbuf[this.renderBuf[y] + Math.imul(this.shaderBuf[y], 16)])
                    }
                }
                screenImg.setRows(x, this.renderBuf)
            }
        })
    }
    
}