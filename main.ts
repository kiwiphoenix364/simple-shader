class ShaderPack {
    private colorNames: string[]
    private shaderColorSets: any[]
    constructor(colorNames: string[], shaderColorSets: any[]) {
        this.colorNames = colorNames
        this.shaderColorSets = shaderColorSets
    }
    public unpack () {
        //let buf = Buffer.create(16)
        //for (let i = 0; i < this.shaderColorSets.length; i++) {
        //    buf = buf.concat(this.shaderColorSets[i])
        //}
        let buf = [Buffer.create(0)]
        for (let i = 0; i < this.shaderColorSets.length; i++) {
            buf.push(Buffer.fromArray(this.shaderColorSets[i]))
        }
        return buf
    }
    public getTintIdx (color: string) {
        return this.colorNames.indexOf(color) + 1
    }
    public destroy() {
        this.colorNames = this.shaderColorSets = null
    }
    static get (shader: string) {
        //reference for shader pack format
        //color sets and color set names are in respective orders in their arrays
        //shader arrays go in order of colors on the screen, so the fifth item in the array ([4]) will be color four
        let packNames = ["default"]
        let packs = [
            new ShaderPack(
                ["light", "light2", "dark", "dark2", "yellow", "yellow2", "red", "green", "blue", "purple"],
                [
                    [0, 1, 4, 1, 5, 1, 7, 5, 9, 1, 11, 1, 10, 1, 2, 12],
                    [0, 1, 5, 1, 1, 1, 5, 1, 1, 1, 1, 1, 11, 1, 4, 10],
                    [0, 13, 14, 2, 2, 7, 8, 6, 12, 6, 12, 12, 15, 14, 15, 15],
                    [0, 14, 15, 14, 14, 6, 12, 8, 15, 8, 15, 15, 15, 15, 15, 15],
                    [0, 13, 4, 4, 5, 5, 7, 5, 6, 13, 11, 13, 11, 5, 13, 14],
                    [0, 5, 5, 5, 5, 5, 5, 5, 7, 5, 13, 5, 13, 5, 5, 13],
                    [0, 3, 2, 2, 2, 4, 11, 4, 10, 11, 2, 2, 10, 4, 2, 14],
                    [0, 5, 4, 13, 5, 7, 7, 7, 6, 6, 12, 7, 7, 7, 5, 8],
                    [0, 9, 10, 11, 12, 6, 8, 6, 8, 8, 12, 8, 8, 9, 12, 8],
                    [0, 11, 10, 10, 11, 4, 10, 12, 10, 11, 10, 10, 10, 11, 12, 12]
                ]
            )
        ]
        
        //for generating the "2" varients
        let test = []
        let sample = [0, 1, 4, 1, 5, 1, 7, 5, 9, 1, 11, 1, 10, 1, 2, 12]
        for (let j = 0; j < 16; j++) {
            test.push(sample[sample[j]])
        }
        return packs[packNames.indexOf(shader)]
    }
}
class Shader {
    //Declare initial variables
    //lookup table
    //lkupx16: Buffer
    //Shader pack
    public refreshShaderLayer: boolean
    private currentShader: ShaderPack
    //Decompiled shader pack
    private colbuf: Buffer[]
    //Shader augment image
    public mapLayer: Image
    //Render and shader buffers
    private renderBuf: Buffer
    private shaderBuf: Buffer
    //zValue
    private zValue: number
    //Renderable for shader
    private shader: scene.Renderable
    constructor(currentShader: ShaderPack, refreshShaderLayer: boolean, zValue = 0) {
        /*
        //build lookup table
        this.lkupx16 = Buffer.create(16)
        for (let i = 0; i < 16; i++) {
            this.lkupx16[i] = (i * 16)
        }
        */
        this.refreshShaderLayer = refreshShaderLayer
        this.zValue = zValue
        this.currentShader = currentShader
        //Unpack Shaderpack
        this.colbuf = this.currentShader.unpack()
        //create buffer image
        this.mapLayer = image.create(160, 120)
        this.renderBuf = Buffer.create(120)
        this.shaderBuf = Buffer.create(120)
        this.shader = scene.createRenderable(this.zValue, (screenImg: Image, camera: scene.Camera) => {
            this.shadeImg(screenImg)
        })
        this.updateShaderLayer()
    }
    protected shadeImg(img:Image) {
        for (let x = 0; x < img.width; ++x) {
            img.getRows(x, this.renderBuf)
            this.mapLayer.getRows(x, this.shaderBuf)
            for (let y = 0; y < img.height; ++y) {
                if (this.shaderBuf[y]) {
                    this.renderBuf[y] = this.colbuf[this.shaderBuf[y]][this.renderBuf[y]]
                    //use alternate compilation format
                    //this.renderBuf[y] = (this.colbuf[this.renderBuf[y] + Math.imul(this.shaderBuf[y], 16)])
                    //alt comp format + lookup table
                    //this.renderBuf[y] = (this.colbuf[this.renderBuf[y] + this.lkupx16[this.shaderBuf[y]]])
                }
            }
            img.setRows(x, this.renderBuf)
        }
    }
    protected updateShaderLayer() {
        game.currentScene().eventContext.registerFrameHandler(17, () => {
            if (this.refreshShaderLayer = true) {
                this.mapLayer = image.create(160,120)
            }
        })
        game.currentScene().eventContext.registerFrameHandler(24, () => {
            
        })
    }
    public setNewShader (shader: ShaderPack) {
        this.colbuf = shader.unpack()
    }
    /*
    //alt function
    directSetUnpackedShader(array: Buffer) {
        this.colbuf = shader
    }
    */
    public directSetUnpackedShader (shader: Buffer[]) {
        this.colbuf = shader
    }
    static toScreenX(val: number) {
        return val - scene.cameraProperty(CameraProperty.Left)
    }
    static toScreenY(val: number) {
        return val - scene.cameraProperty(CameraProperty.Top)
    }
    public destroy() {
        this.shader.destroy()
        this.refreshShaderLayer = this.currentShader = this.colbuf = this.mapLayer = this.renderBuf = this.shaderBuf = this.zValue = null
    }
}
class ShaderAttachSprite {
    public sprite: Sprite
    public shader: Shader
    public tint: number
    public radius: number
    private currentRad: number
    public flux: number
    public smoothness: number
    public xOffset = 0
    public yOffset = 0
    protected updater: any
    constructor(sprite: Sprite, shader: Shader, tint = 1, radius = 5, flux = 0, smoothness = 1) {
        this.sprite = sprite
        this.shader = shader
        this.tint = tint
        this.radius = radius
        this.currentRad = this.radius
        this.flux = flux
        this.smoothness = smoothness
        this.updateLightSources()
        this.sprite.onDestroyed(() => {
            this.destroy()
        })
    }
    protected updateLightSources() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(23, () => {
            this.updateFlux()
            this.shader.mapLayer.fillCircle(Shader.toScreenX(this.sprite.x) + this.xOffset, Shader.toScreenY(this.sprite.y) + this.yOffset, Math.round(this.currentRad), this.tint)
            if (!this.shader) {
                this.destroy()
            }
        })
        //game.currentScene().eventContext.unregisterFrameHandler(controller)
    }
    protected updateFlux() {
        this.smoothness = Math.constrain(this.smoothness, Math.abs(this.flux) * -2, Math.abs(this.flux) * 2)
        this.currentRad += Math.randomRange(0 - this.smoothness, this.smoothness)
        //this.currentRad = Math.constrain(this.currentRad, this.radius + this.flux, this.radius - this.flux)
        if (this.currentRad > this.radius + this.flux || this.currentRad < this.radius - this.flux) {
            this.currentRad -= this.currentRad - (this.radius + this.flux)
        }
    }
    public destroy() {
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.sprite = this.shader = this.tint = this.radius = this.currentRad = this.flux = this.smoothness = this.xOffset = this.yOffset = this.updater = null
    }
}
