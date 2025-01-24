class ShaderPack {
    colorArrayNames: string[]
    colorValueArrays: any[]
    constructor(colorArrayNames: string[], colorValueArrays: any[]) {
        this.colorArrayNames = colorArrayNames
        this.colorValueArrays = colorValueArrays
    }
    unpack () {
        let buf = Buffer.create(16)
        for (let i = 0; i < this.colorValueArrays.length; i++) {
            buf = buf.concat(this.colorValueArrays[i])
        }
        return buf
    }
    getTintIdx (color: string) {
        return this.colorArrayNames.indexOf(color) + 1
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